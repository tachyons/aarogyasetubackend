import {h} from 'preact';
import {useState, useEffect, useCallback, useContext, useRef} from 'preact/hooks';
import ClientDataContext from '@stencil/client-data-context';
import ConfigFromEnv from '@stencil/config-from-env';
import ServerDataContext from '@stencil/server-data-context';
import dateFormat from 'dateformat';
import './RadarSync.css';
/** @jsx h */

import closeIcon from '../../assets/closeIcon.png';
import RadarInfo from '../../assets/radarInfo.png';
import RightBlueIcon from '../../assets/blue-right.png';
import getContacts from '../../app-bridge/get-local-contact';
import triggerUpload from '../../app-bridge/trigger-upload';
import Popup from './popup';

function getRandomArbitrary(min = 5, max = 95) {
  return Math.random() * (max - min) + min;
}

const cache = {};



function generatePosition(index, color) {
  if (cache[`${index}-${color}`]) {
    return cache[`${index}-${color}`];
  }
  const option = {left: getRandomArbitrary(), top: getRandomArbitrary()};
  const coordinates = {x: Math.abs(option.left - 50), y: Math.abs(option.top - 50)};
  const distance = Math.sqrt(coordinates.x ** 2 + coordinates.y ** 2);
  if (distance < 50 && distance > 20) {
    cache[`${index}-${color}`] = option;
    return option;
  }
  return generatePosition(index, color);
}

const RadarSync = ({setRadar, profileImage}) => {
  const [popupMsg, setPopupMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const {headers = ''} = useContext(ClientDataContext);
  const updateData = useRef(null);
  const {language} = useContext(ServerDataContext);
  const {radar} = language;
  const {
    scanning,
    noContact,
    main,
    status,
    interactionMainText,
    interactionSubText,
    minDuration,
    uploadText,
    uploadInfo,
    uploadCta,
  } = radar;
  const updateDataFn = useCallback(
    newData => {
      setData({...data, ...newData});
    },
    [data],
  );

  useEffect(() => {
    updateData.current = updateDataFn;
  }, [updateDataFn]);

  async function getContactsStatus() {
    try {
      if (headers.Authorization) {
        const response = await fetch(
          `${ConfigFromEnv('__FP_API__')}/api/v1/stats/users/interactions/`,
          {
            method: 'GET',
            headers: {
              Authorization: headers.Authorization,
              pt: headers.pt,
              ver: headers.ver,
              'content-type': 'application/x-www-form-urlencoded',
            },
          },
        );
        const responseJson = await response.json();
        return responseJson.data;
      }
      return {};
    } catch (Err) {
      console.error(Err);
      return {};
    }
  }

  async function updateContacts() {
    const localContactsPromise = getContacts();
    const serverContactsPromise = getContactsStatus();
    const [local, serverData] = await Promise.all([localContactsPromise, serverContactsPromise]);
    console.log(serverData);
   
    const {status_dict = {}, interactions = []} = serverData;
    setTimeout(() => {
      updateData.current({local, interactions, ...status_dict});
      setLoading(false);
    }, 2000);
  }

  useEffect(updateContacts, []);

  const {local = 0, green = 0, orange = 0, red = 0, yellow = 0, grey = 0, interactions = []} = data;
  const fromServer = green + orange + yellow + red + grey;
  const unsynced = Math.max(local - fromServer, 0);
  const totalContact = Math.max(local, fromServer);
  console.log(data);
  return (
    <div className="radarPopOverlay">
      <div className="radarPopContentWrap">
        <div className="radarPopHeader">
          <a href="javascript:void(0);" onClick={() => setRadar(false)}>
            <img src={closeIcon} />
          </a>
        </div>
        <div className="radarPopBody">
          {(popupMsg && (
            <Popup
              header={popupMsg}
              cta="Continue"
              onCta={() => {
                setPopupMsg('');
                triggerUpload();
              }}
            />
          )) ||
            null}
          <div className="radarOuterWrap" style={loading ? {} : {display: 'none'}}>
            <ul className="radar" style={{display: 'flex'}}>
              <span className="userImg">
                <img src={profileImage} />
              </span>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li className="notInfected"></li>
              <li className="infectedDot"></li>
            </ul>
            <p className="statusCheckText">{scanning}</p>
          </div>
          <div className="radarResultWrap" style={!loading ? {} : {display: 'none'}}>
            <ul className="radarResult animateTop">
              <span className="userImgResult">
                <img src={profileImage} />
              
              </span>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              {[...Array(green)].map((a, index) => {
                const pos = generatePosition(index, 'green');
                return (
                  <li
                    className="notInfected"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      backgroundColor: 'rgb(58,168,76)',
                    }}
                  ></li>
                );
              })}
              {[...Array(red)].map((a, index) => {
                const pos = generatePosition(index, 'red');
                return (
                  <li
                    className="notInfected"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      backgroundColor: 'rgb(200,77,77)',
                    }}
                  ></li>
                );
              })}
              {[...Array(orange)].map((a, index) => {
                const pos = generatePosition(index, 'orange');
                return (
                  <li
                    className="notInfected"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      backgroundColor: 'rgb(219,114,44)',
                    }}
                  ></li>
                );
              })}
              {[...Array(yellow)].map((a, index) => {
                const pos = generatePosition(index, 'yellow');
                return (
                  <li
                    className="notInfected"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      backgroundColor: 'rgb(232,192,49)',
                    }}
                  ></li>
                );
              })}
              {[...Array(unsynced + grey)].map((a, index) => {
                const pos = generatePosition(index, 'grey');
                return (
                  <li
                    className="notInfected"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      backgroundColor: 'rgb(118,118,129)',
                    }}
                  ></li>
                );
              })}
            </ul>
            <div className="radarResultTextWrap">
              {totalContact <= 0 ? (
                <p className="radarTotalText">{noContact}</p>
              ) : (
                <p className="radarTotalText">{main.replace('{%totalContact%}', totalContact)}</p>
              )}
              {red > 0 ? (
                <p className="radarInfectedText" style={{color: 'rgb(200,77,77)'}}>
                  {(red > 1 ? status[1] : status[0]).replace('{%infectedCount%}', red)}
                </p>
              ) : null}
              {orange > 0 ? (
                <p className="radarInfectedText" style={{color: 'rgb(219,114,44)'}}>
                  {(orange > 1 ? status[3] : status[2]).replace('{%highRiskCount%}', orange)}
                </p>
              ) : null}
              {yellow > 0 ? (
                <p className="radarInfectedText" style={{color: 'rgb(232,192,49)'}}>
                  {(yellow > 1 ? status[5] : status[4]).replace('{%moderateRiskCount%}', yellow)}
                </p>
              ) : null}
              {green > 0 ? (
                <p className="radarInfectedText" style={{color: 'rgb(58,168,76)'}}>
                  {(green > 1 ? status[7] : status[6]).replace('{%healthyCount%}', green)}
                </p>
              ) : null}
              {unsynced + grey > 0 ? (
                <p className="radarInfectedText" style={{color: 'rgb(118,118,129)'}}>
                  {(unsynced + grey > 1 ? status[9] : status[8]).replace(
                    '{%notKnownCount%}',
                    unsynced + grey,
                  )}
                </p>
              ) : null}
            </div>
            {interactions.length ? (
              <div className="radarInfectedIngoWrap">
                <p className="contactTitle" style={{color: '#242833', fontSize: '16px'}}>
                  {interactionMainText}
                </p>
                <p className="contactTitle">{interactionSubText}</p>
                <div className="infectedList">
                  {interactions.map(item => (
                    <div className="interactionItem">
                      <div>
                     
                        <span className="interactiondate">
                          {dateFormat(item.date, "dd mmm'yy")}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: '14px',
                            color: 'rgb(118, 118, 129)',
                            fontWeight: 'bold',
                          }}
                        >
                          {item.time} • {item.duration} {minDuration}
                        </span>
                      </div>
                      <div>
                        <span className="contactTitle">{item.area}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {unsynced > 0 ? (
            <div className="radarMoreInfoWrap" style={!loading ? {} : {display: 'none'}}>
              <div className="moreInfoImgWrap">
                <img src={RadarInfo} />
              </div>
              <div className="moreInfoTextWrap">
                <p className="moreInfoText">{uploadText.replace('{unsynced}', unsynced)}</p>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    setPopupMsg(uploadInfo);
                  }}
                >
                  {uploadCta} <img src={RightBlueIcon} />
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RadarSync;
