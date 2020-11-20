import {h} from 'preact';
import './UserStatus.css';
/** @jsx h */
import {useContext, useState, useCallback} from 'preact/hooks';
import ServerDataContext from '@stencil/server-data-context';
import {route} from 'preact-router';

import getStatusData from '../../utils/get-status-data';
import rightArrowPng from '../../assets/rightarrow.png';

import StaySafeBanner from './StaySafeBanner';
import Guideline from './Guideline';
import RecommendBanner from './RecommendBanner';
import SecondaryCta from './SecondaryCta';
import PrimaryCta from './PrimaryCta';
import SelfAssessPopup from './SelfAssessPopup';
import RightIconBlue from '../../assets/blue-right.png';
import LabIcon from '../../assets/labIcon.png';
import Image from '../Image';
import RedState from '../red-state/red-state';
import Radar from '../radar-sync/RadarSync';

let globalRedCTAState = true;
let autoRedStatePopup = true;

const UserStatus = () => {
  const {language, flags} = useContext(ServerDataContext);
  const {
    profile_image_url,
    status_code,
    proximity,
    lang,
    self_assess_popup,
    redStateConfirmation,
    mob = '',
  } = flags;
  const [showRedStateCta, setRedStateCta] = useState(globalRedCTAState && redStateConfirmation);
  const [showExtendedRecommendation, setShowExtendedRecommendation] = useState(false);
  const [showRedStatus, setRedStatus] = useState(autoRedStatePopup && redStateConfirmation);
  const [showRadar, setRadar] = useState(false);

  const toggleShowExtendedRecommendation = () => {
    setShowExtendedRecommendation(!showExtendedRecommendation);
  };

  const {
    mainText,
    subText,
    recommendationList,
    recommendText,
    cta,
    img,
    brandColor,
    guideLineHeading,
    guideLines,
    listText,
    listItem,
    quickRecommendationList = [],
  } = getStatusData({
    status_code: parseInt(status_code, 10),
    selectedLanguageObj: language,
  });

  const {
    recommendation_dialogue,
    caution,
    redState,
    recommendText: recommList,
    other,
    icmrPage,
    radar,
  } = language;
  const {cta1, cta2} = radar;
  const {testedPositive} = redState;
  const {note, confirm, subheader} = testedPositive;
  const {cta: cautionCta, desc, title} = caution;
  const [second = {}, main = {}] = cta;
  const {label: secondCta = '', link: secondCtaLink = '', icon: secondCtaIcon = ''} = second;
  const {label: mainCta = '', link: mainCtaLink = '', icon: mainCtaIcon = ''} = main;

  const homeTopBackWrapStyle = `background-color: ${brandColor};`;

  let quickAction = () => {};
  switch (parseInt(status_code, 10)) {
    case 200:
      quickAction = () => {
        route(`/ncv19/chat/?lang=${lang}`);
      };
      break;

    case 301:
    case 302:
    case 400:
    default: {
      quickAction = toggleShowExtendedRecommendation;
      break;
    }
  }

  return (
    <div id="statuscontent">
      <div className="homeTopWrapNew" id="short-status">
        <div className="homeTopBackWrap" style={homeTopBackWrapStyle} />
        <div className="homeTopinnerWrap">
          <div className="userInfoWrapNew">
            {profile_image_url || img ? (
              <div className="userImgWrapNew">
                <Image src={profile_image_url || img} />
              </div>
            ) : null}
            <div className="userStatusWrapNew">
              <p className="userStatusHeadText">{mainText}</p>
              {subText && proximity && parseInt(status_code, 10) !== 700 ? (
                <p className="userStatusSubText">{subText}</p>
              ) : null}
              {(parseInt(status_code, 10) !== 700 &&
                __CLIENT__ &&
                window.JSMobileCrm &&
                window.JSMobileCrm.getUniqueBluetoothContacts) ||
              (parseInt(status_code, 10) !== 700 &&
                __CLIENT__ &&
                window.webkit &&
                window.webkit.messageHandlers.getContact) ? (
                <p className="cautionInfoText" onClick={() => setRadar(true)}>
                  <span className="cautionSpan">{proximity ? cta2 : cta1}</span>
                </p>
              ) : null}
              {(parseInt(status_code, 10) === 700 && (
                <div>
                  <p className="positiveInfoText">
                    <span className="noteText">{note}</span>
                    {subheader.replace('%phone', mob)}
                  </p>
                  {showRedStateCta ? (
                    <button className="confirmBtn" onClick={() => setRedStatus(true)}>
                      {confirm}
                    </button>
                  ) : null}
                </div>
              )) ||
                null}
            </div>
          </div>

          {[501, 502, 600].indexOf(status_code) !== -1 ? (
            <div
              className="getTestedOuterWrap"
              onClick={() => {
                route('/ncv19/icmr/');
              }}
            >
              <div className="getTestedInnerWrap">
                <div className="getTestedImgWrap">
                  <img src={LabIcon} alt="lab" />
                </div>
                <div className="getTestedInfoWrap">
                  <p className="getTestedText">{recommList[3]}</p>
                  <a href="javascript:void(0);" className="testingLinkText">
                    {other.icmrCta} <img src={RightIconBlue} alr="right" />
                  </a>
                  <a href="javascript:void(0);" className="testingLinkText">
                    {icmrPage.title} <img src={RightIconBlue} alr="right" />
                  </a>
                </div>
              </div>
            </div>
          ) : null}

          {recommendationList.length && false ? (
            <div className="weRecommendOuterWrap">
              <div className="weRecommendInnerWrap">
                <p className="weRecommendHeadText">{recommendText}</p>
                {recommendationList.map(recommendation => (
                  <div className="recommendInfoWrap">
                    <div className="recommendImgWrap">
                      <Image src={recommendation.img} />
                    </div>
                    <div className="recommendTextWrap">
                      <p className="recommendedText">{recommendation.label}</p>
                    </div>
                  </div>
                ))}
                <div className="allRecommendationLinkText" onClick={quickAction}>
                  {`${recommList[2]} `}
                  <img
                    src={RightIconBlue}
                    alt="right"
                    className={showExtendedRecommendation ? 'arrowImgDown' : 'arrowImgRight'}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {recommendationList.length ? (
            <div className="lowRiskStatusWrap" onClick={quickAction}>
              <div className="lowRiskImgWrap">
                {recommendationList.map(recommendation => (
                  <Image src={recommendation.img} />
                ))}
              </div>
              <div className="lowRiskInfoWrap">
                <p className="threeThingText">{recommendText}</p>
                <img
                  src={rightArrowPng}
                  alt="right arrow"
                  className={showExtendedRecommendation ? 'arrowImgDown' : 'arrowImgRight'}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* this is extended status */}
      {(showExtendedRecommendation && (
        <div id="long-status" style="margin-bottom:10px">
          <div className="homeTopWrapper">
            <RecommendBanner
              recommendationList={recommendationList}
              recommendText={recommendText}
            />
          </div>
          <Guideline guideLineHeading={guideLineHeading} guideLines={guideLines} />
          <StaySafeBanner listText={listText} listItem={listItem} />
        </div>
      )) ||
        null}

      <div className="ctaOuterWrap">
        <PrimaryCta
          mainCtaIcon={mainCtaIcon}
          mainCta={mainCta}
          mainCtaLink={mainCtaLink}
          lang={lang}
        />
        <SecondaryCta
          secondCta={secondCta}
          secondCtaLink={secondCtaLink}
          secondCtaIcon={secondCtaIcon}
          lang={lang}
        />
      </div>

      <SelfAssessPopup
        self_assess_popup={self_assess_popup}
        recommendation_dialogue={recommendation_dialogue}
        lang={lang}
      />
      {(showRedStatus && (
        <RedState
          setRedStatus={state => {
            autoRedStatePopup = state;
            setRedStatus(state);
          }}
          setRedStateCta={state => {
            autoRedStatePopup = state;
            globalRedCTAState = state;
            setRedStateCta(state);
          }}
        />
      )) ||
        []}
      {(showRadar && <Radar setRadar={setRadar} profileImage={profile_image_url || img} />) || []}
    </div>
  );
};

export default UserStatus;
