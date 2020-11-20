import {h} from 'preact';
/** @jsx h */
import {useContext, useState} from 'preact/hooks';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';
import ConfigFromEnv from '@stencil/config-from-env';
import TestedPositivePop from './tested-positive-pop/testedPositivePop';
import getStatusData from '../../utils/get-status-data';
import UserDetailPop from './user-detail-pop/userDetailPop';

const RedState = ({setRedStatus, setRedStateCta}) => {
  const [show, setPopup] = useState('testedPositive');
  const [type, setType] = useState('testedPositive');
  const {language, flags} = useContext(ServerDataContext);
  const {headers} = useContext(ClientDataContext);
  const {status_code, mob} = flags;
  const {redState} = getStatusData({
    status_code,
    selectedLanguageObj: language,
  });

  const onSubmit = (data, nextPopup = true) => {
    if (nextPopup) {
      setType('popup_next');
      setPopup('popup_next');
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } else {
      setRedStatus(false);
      setRedStateCta(false);
    }
    fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/infected-confirmation`, {
      method: 'POST',
      headers: {
        Authorization: headers.Authorization,
        ver: headers.ver,
        pt: headers.pt,
        lat: headers.lat,
        lon: headers.lon,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data}),
    })
      .then(response => {
        console.info('response', response);
      })
      .catch(error => {
        console.info('err', error);
      });
  };

  const confirmStatus = value => {
    if (value === 'close') {
      setRedStatus(false);
      return;
    }
    console.log(type);
    switch (type) {
      case 'testedPositive': {
        if (value === 'no') setType('pos_person_popup');
        if (value === 'yes') onSubmit({status: 'Confirmed'}, false);
        break;
      }
      case 'pos_person_popup': {
        const data = value === 'no' ? 'popup_next' : 'form_details';
        setType(data);
        if (value === 'yes') setPopup('usedetail');
        if (value === 'no') {
          onSubmit({status: 'Denied'});
        }
        break;
      }
      case 'popup_next': {
        setRedStatus(false);
        setRedStateCta(false);
        break;
      }
      default: {
        setRedStatus(false);
        break;
      }
    }
  };

  const red_state_data = redState[type] || [];
  console.log(red_state_data);
  const showPopup = [];
  switch (show) {
    case 'testedPositive':
      showPopup.push(
        <TestedPositivePop {...red_state_data} confirmStatus={confirmStatus} mob={mob} />,
      );
      break;
    case 'usedetail':
      showPopup.push(
        <UserDetailPop {...red_state_data} confirmStatus={confirmStatus} onSubmit={onSubmit} />,
      );
      break;

    case 'popup_next':
      showPopup.push(
        <TestedPositivePop {...red_state_data} confirmStatus={confirmStatus} mob={mob} />,
      );
      break;
    default:
  }

  return <div>{showPopup}</div>;
};

export default RedState;
