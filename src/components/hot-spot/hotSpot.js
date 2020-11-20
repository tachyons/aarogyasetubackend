import {h, Fragment} from 'preact';
import {useEffect, useState, useContext} from 'preact/hooks';
import './hotSpot.css';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';
import ConfigFromEnv from '@stencil/config-from-env';
import WhatMeans from '../what-means-pop/what-means';
/** @jsx h */

import smallLocationPng from '../../assets/hotSpot/smallLocation.png';
import questionMarkPng from '../../assets/questionMark.png';

import Image from '../Image';

function HotSpot() {
  const [data, setData] = useState();
  const [distance, setDistance] = useState('1km');
  const [loading, setLoading] = useState(true);
  const [showPopup, setPopup] = useState(false);
  const {language, flags} = useContext(ServerDataContext);
  const {headers = ''} = useContext(ClientDataContext);
  const {isIos, ver} = flags;
  useEffect(() => {
    setLoading(true);
    if (headers.Authorization) {
      try {
        fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/nearby-stats/?dist=${distance}`, {
          method: 'GET',
          headers: {
            Authorization: headers.Authorization,
            pt: headers.pt,
            ver: headers.ver,
            lat: headers.lat,
            lon: headers.lon,
            distance,
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            setData(responseJson);
            setLoading(false);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }, [distance]);

  useEffect(() => {
    if (showPopup) {
      window.document.querySelector('body').style.overflow = 'hidden';
    } else {
      window.document.querySelector('body').style.overflow = 'auto';
    }
  }, [showPopup]);

  const {
    positive,
    noPositive,
    bluetooth,
    selfassess,
    fetching,
    inArea,
    unwellText,
    selfassesss = selfassess,
    positives = positive,
    bluetooths = bluetooth,
    unwellTexts = unwellText,
    totalUsersText,
    totalUsersTexts = totalUsersText,
  } = language.proximityStats;

  if (!isIos && parseInt(ver, 10) < 1045) {
    return null;
  }

  if (!data) {
    // loading state
    return (
      <Fragment>
        <div className="hotSpotOuterWrap">
          <div className="sliderOuterWrap">
            <div className="animated-area">
              <ul className="box-area">
                <li />
                <li />
                <li />
                <li />
              </ul>
            </div>
            <div className="dotLoader">
              <p className="fetchingText">{fetching}</p>
              <div className="waleDotSpot">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  const {infected, unwell, success, selfAsses, bluetoothPositive, usersNearBy} = data;
 
  if (!success) {
    return null;
  }

  const count =
    (infected === null ? 0 : 1) +
    (unwell ? 1 : 0) +
    (bluetoothPositive ? 1 : 0) +
    (selfAsses ? 1 : 0) +
    (usersNearBy ? 1 : 0);

  let animationType = 'singleText';
  switch (count) {
    case 2:
      animationType = 'twoText';
      break;
    case 3:
      animationType = 'threeText';
      break;
    case 4:
      animationType = 'fourText';
      break;
    case 5:
      animationType = 'fiveText';
      break;
    default:
      animationType = 'singleText';
  }

  if (!count) {
    return null;
  }
  return (
    <div>
      <div className="hotSpotOuterWrap">
        <div className="noHotSpotInnerWrap noHotSpot">
          <div className="areaInfoText">
            <div className="areaInfoInnerWrap">
              <Image src={smallLocationPng} alt="location" className="areaInfoLocationImg" />
              <p>{inArea}</p>
            </div>
            <Image
              onClick={() => setPopup(true)}
              src={questionMarkPng}
              alt="info"
              className="questionImg"
            />
          </div>
          <div className="kmSelectOuterWrap">
            <ul>
              <li
                className={distance === '0.5km' ? 'active' : ''}
                onClick={() => setDistance('0.5km')}
              >
                500m
              </li>
              <li className={distance === '1km' ? 'active' : ''} onClick={() => setDistance('1km')}>
                1Km
              </li>
              <li className={distance === '2km' ? 'active' : ''} onClick={() => setDistance('2km')}>
                2Km
              </li>
              <li className={distance === '5km' ? 'active' : ''} onClick={() => setDistance('5km')}>
                5Km
              </li>
              <li
                className={distance === '10km' ? 'active' : ''}
                onClick={() => setDistance('10km')}
              >
                10Km
              </li>
            </ul>
          </div>
          {loading ? (
            <div className="dotContainer">
              <div className="dotLoaderr">
                <p className="fetchingText">{fetching}</p>
                <div className="waleDotSpot">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>
          ) : (
            <div className="noHotSpotInfoTextWrap noHotSpot">
              <div className={animationType}>
                {usersNearBy ? (
                  <p className="noHotSpotInfoText text1">
                    {`${usersNearBy.toLocaleString('en-IN')} ${
                      usersNearBy > 1 ? totalUsersTexts : totalUsersText
                    }`}
                  </p>
                ) : null}
                {selfAsses ? (
                  <p className="noHotSpotInfoText text1">
                    {`${selfAsses.toLocaleString('en-IN')} ${
                      selfAsses > 1 ? selfassesss : selfassess
                    }`}
                  </p>
                ) : null}

                {unwell ? (
                  <p className="noHotSpotInfoText text1">
                    {`${unwell.toLocaleString('en-IN')} ${unwell > 1 ? unwellTexts : unwellText}`
                      .split('&apos;')
                      .join("'")}
                  </p>
                ) : null}

                {infected !== null ? (
                  <p className={infected ? 'hotSpotInfoText text1' : 'noHotSpotInfoText text1'}>
                    {infected
                      ? `${infected.toLocaleString('en-IN')} ${infected > 1 ? positives : positive}`
                      : noPositive}
                  </p>
                ) : null}

                {bluetoothPositive ? (
                  <p className="noHotSpotInfoText text1">
                    {`${bluetoothPositive.toLocaleString('en-IN')} ${
                      bluetoothPositive > 1 ? bluetooths : bluetooth
                    }`
                      .split('&apos;')
                      .join("'")}
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      {(showPopup && <WhatMeans close={() => setPopup(false)} />) || null}
    </div>
  );
}

export default HotSpot;
