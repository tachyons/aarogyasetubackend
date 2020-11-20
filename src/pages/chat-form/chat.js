import {h} from 'preact';
/** @jsx h */
import {useEffect, useState, useContext, useCallback, useRef} from 'preact/hooks';
import {route} from 'preact-router';
import './chat.css';
import ClientDataContext from '@stencil/client-data-context';
import ConfigFromEnv from '@stencil/config-from-env';
import ServerDataContext from '@stencil/server-data-context';
import getAssessmentData from '../../assets/assessment-json';
import CustomButton from '../../components/chat-widget/custom-buttom/custom-button';
import SelectionButtons from '../../components/chat-widget/selection-button/selection-button';
import HumanInput from '../../components/chat-widget/human-input/human-input';
import BotMessage from '../../components/chat-widget/bot-message/bot-message';
import PopUpScreen from '../../components/chat-screen-popup/chat-screen-popup';
import triggerWebviewRefresh from '../../app-bridge/refresh-webview';

const Chat = () => {
  const [config, setConfig] = useState();
  const [widget, setWidget] = useState([]);
  const [final_result, setResult] = useState({});
  const [showPopup, setPopUp] = useState(true);
  const [popupData, setPopupData] = useState({});
  const onSubmit = useRef(null);
  const {headers} = useContext(ClientDataContext);
  const {flags} = useContext(ServerDataContext);
  const {lang} = flags;
  const {dialogue, ...strings} = config || {};
  const togglePopup = ({value}) => {
    setPopUp(prev => !prev);
    if (Object.keys(popupData).length) {
      collect({type: 'confirm', value, langValue: value});
    }
  };

  useEffect(async () => {
    const obj = await getAssessmentData(lang);
    setConfig(obj);
  }, []);

  useEffect(() => {
    if (config) {
      init('symptoms');
    }
  }, [config]);

  if (!config) {
    return null;
  }

  const collect = ({key, type, value, langValue}) => {
    const result = Array.isArray(value) ? value.join(', ') : value;
    const next = {[type]: result};
    setResult(prev => {
      return {...prev, ...next};
    });
    const message = Array.isArray(langValue) ? langValue.join(', ') : langValue;
    const {possible_values = []} = strings[type];
    const identifier = possible_values.filter(({key: selector}) => selector === 0);
    if (document.getElementById(type)) {
      document.getElementById(type).style.display = 'none';
    }
    setWidget(prev => prev.concat([<HumanInput message={message || identifier[0]?.value} />]));
    switch (type) {
      case 'symptoms': {
        const nextTrigger = !result ? 'past' : 'symptom_past';
        init(nextTrigger);
        break;
      }
      case 'past': {
        init('travel');
        break;
      }
      case 'travel': {
        const nextTrigger = key === 0 ? 'social' : 'quarantine';
        init(nextTrigger);
        break;
      }
      case 'social': {
        const nextTrigger = key === 0 ? 'great' : 'social_when';
        init(nextTrigger);
        break;
      }
      case 'symptom_past': {
        init('symptom_past_travel_social');
        break;
      }
      case 'symptom_past_travel_social': {
        const nextTrigger = !result ? 'unwell' : 'eligible';
        init(nextTrigger);
        break;
      }
      case 'social_when': {
        const nextTrigger =
          key === 1 ? 'eligible_suspect' : key === 2 ? 'eligible_travel' : 'not_eligible';
        init(nextTrigger);
        break;
      }
      case 'confirm':
        onSubmit.current({confirm: value});
        break;
      case 'great': {
        onSubmit.current({status: type});
        break;
      }
      default:
        break;
    }
  };

  const init = type => {
    const {label = '', possible_values = []} = strings[type];
    setWidget(prev => prev.concat([<BotMessage message={label} />]));
    switch (type) {
      case 'symptoms':
      case 'symptom_past':
      case 'past': {
        const config = [];
        const dict = [];
        const newView = [];
        const list = possible_values.map(({key: selector, value, text}) => {
          return (
            <CustomButton
              key={selector}
              selector={selector}
              value={value}
              config={config}
              type={type}
              collect={collect}
              text={text}
              possible_values={possible_values}
              dict={dict}
            />
          );
        });
        newView.push(
          <div id={type} className="symptomWrap">
            {list}
          </div>,
        );
        setWidget(prev => prev.concat(newView));
        break;
      }
      case 'social':
      case 'social_when':
      case 'symptom_past_travel_social':
      case 'travel': {
        const newView = [];
        const list = possible_values.map(({key: selector, value, text}) => (
          <SelectionButtons
            selector={selector}
            value={value}
            collect={collect}
            type={type}
            text={text}
          />
        ));
        newView.push(<div id={type}>{list}</div>);
        setWidget(prev => prev.concat(newView));
        break;
      }
      case 'unwell':
      case 'eligible':
      case 'eligible_suspect':
      case 'quarantine':
      case 'not_eligible':
      case 'eligible_travel': {
        const next = {status: type};
        setResult(prev => {
          return {...prev, ...next};
        });
        init('confirm');
        break;
      }
      case 'great': {
        setWidget(prev =>
          prev.concat(
            <div id={type}>
              <SelectionButtons selector={0} value="Ok" text="Ok" collect={collect} type={type} />
            </div>,
          ),
        );
        break;
      }
      case 'confirm': {
        const list = possible_values.map(({key: selector, value, text}) => text);
        const confirmObj = {
          title: label,
          cta: list[0],
          cta_two: list[1],
        };
        setPopupData(prev => {
          return {...prev, ...confirmObj};
        });
        togglePopup({});
        break;
      }
      default:
        break;
    }
  };

  const onSubmitFn = useCallback(
    st => {
      console.log('data');
      console.log(final_result);
      fetch(`${ConfigFromEnv('__NCV_API__')}/api/v1/user/chat/data`, {
        method: 'POST',
        headers: {
          Authorization: headers.Authorization,
          pt: headers.pt,
          ver: headers.ver,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: st.status,
          confirm: st.confirm,
          ...final_result,
          lat: headers.lat,
          lon: headers.lon,
        }),
      })
        .then(response => {
          console.log('Success:', response);
          route('/ncv19/', true);
          triggerWebviewRefresh();
        })
        .catch(error => {
          console.error('Error:', error);
          route('/ncv19/', true);
          triggerWebviewRefresh();
        });
    },
    [final_result, headers],
  );

  useEffect(() => {
    onSubmit.current = onSubmitFn;
  }, [onSubmitFn]);

  console.info('final_result', final_result);

  const {
    title = '',
    message = '',
    cta = '',
    cta_two = '',
    image = 'https://static1.swaraksha.gov.in/public/assets/accurate-ans.png',
  } = Object.keys(popupData).length ? popupData : dialogue;
  return (
    <div className="chatOuterWrap">
      <BotMessage message={strings.start} />
      {(showPopup && (
        <PopUpScreen
          togglePopup={togglePopup}
          title={title}
          message={message}
          cta={cta}
          image={image}
          cta_two={cta_two}
        />
      )) ||
        null}
      {widget}
    </div>
  );
};

export default Chat;
