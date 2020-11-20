import {h} from 'preact';
/** @jsx h */
import {useEffect, useState, useContext, useCallback, useRef} from 'preact/hooks';
import {route} from 'preact-router';
import ConfigFromEnv from '@stencil/config-from-env';
import './chat.css';
import ClientDataContext from '@stencil/client-data-context';
import ServerDataContext from '@stencil/server-data-context';
import SelectionButtons from '../../components/chat-widget/selection-button/selection-button';
import UserInput from '../../components/chat-widget/user-input/user-input';
import HumanInput from '../../components/chat-widget/human-input/human-input';
import BotMessage from '../../components/chat-widget/bot-message/bot-message';
import MultiSelector from '../../components/chat-widget/multi-select/multi-select';


const ChatForm = props => {
  const {setUserRegistrationFlow} = props;
  const {headers} = useContext(ClientDataContext);
  const {userFormConfig} = useContext(ServerDataContext);
  const {fields = [], form_name = '', postOption = []} = userFormConfig;
  const [widget, setWidget] = useState([]);
  const [final_result, setResult] = useState({});
  const [index, setIndex] = useState(0);
  const onSubmit = useRef(null);
  useEffect(() => {
    if (index < fields.length) {
      init(fields[index]);
    }
  }, [index]);

  const onSubmitFn = useCallback(() => {
    fetch(`${ConfigFromEnv('__NCV_API__')}/api/v1/user/form/`, {
      method: 'POST',
      headers: {
        Authorization: headers.Authorization,
        pt: headers.pt,
        ver: headers.ver,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: new URLSearchParams(final_result),
    })
      .then(res => res.json())
      .then(value => {
        onSucess();
        const image = value?.data?.response?.profile_image_url;
      })
      .catch(() => {
        onSucess();
      });
  }, [final_result]);

  useEffect(() => {
    onSubmit.current = onSubmitFn;
  }, [onSubmitFn]);

  const onSucess = () => {
    if (postOption.length) {
      init(postOption[0]);
    } else {
      setUserRegistrationFlow(false);
    }
  };

  const init = item => {
    if (item.label) {
      setWidget(prev => {
        return prev.concat([<BotMessage key={item.key} message={item.label} />]);
      });
    }
    switch (item.type) {
      case 'single_select':
      case 'checkbox':
      case 'radio': {
        const newView = [];
        const options = item.possible_values.map(({key: selector, value}) => (
          <SelectionButtons
            selector={selector}
            text={value}
            value={selector}
            collect={collect}
            type={item.key}
          />
        ));
        newView.push(<div id={item.key}>{options}</div>);
        setWidget(prev => prev.concat(newView));
        break;
      }
      case 'multi_select': {
        setWidget(prev =>
          prev.concat([
            <div id={item.key}>
              <MultiSelector collect={collect} data={item.possible_values} type={item.key} />
            </div>,
          ]),
        );
        break;
      }
      case 'date':
      case 'tel':
      case 'text':
      case 'email':
      case 'password':
      case 'number': {
        setWidget(prev =>
          prev.concat([
            <div id={item.key}>
              <UserInput
                selector={item.key}
                collect={collect}
                type={item.key}
                inputType={item.type}
              />
            </div>,
          ]),
        );
        break;
      }
      default:
        break;
    }
  };

  const collect = ({value, type, langValue}) => {
    const next = {[type]: value};
    setResult(prev => {
      return {...prev, ...next};
    });
    const message = Array.isArray(langValue) ? langValue.join(', ') : langValue;
    document.getElementById(type).style.display = 'none';
    setWidget(prev => prev.concat([<HumanInput message={message} />]));

    if (type === 'submit') {
      if (value === 'Submit') {
        onSubmit.current();
      } else {
        setWidget([]);
        setResult([]);
        setIndex(0);
      }
      return;
    }

    if (type === 'assessment') {
      if (value === 'Yes') {
        route('/ncv19/chat/');
        return;
      } 
     
        setUserRegistrationFlow(false);
      
    }

    if (type === 'well') {
      if (value === 'Yes') {
        init(postOption[1]);
      } else {
        route('/ncv19/chat/');
      }
      return;
    }

  
    setIndex(index + 1);
  
  };

  console.info('final', final_result);

  return (
    <div className="chatOuterWrap">
      <BotMessage message={form_name} />
      <div className="chatFormOuterWrap">{widget}</div>
    </div>
  );
};

export default ChatForm;
