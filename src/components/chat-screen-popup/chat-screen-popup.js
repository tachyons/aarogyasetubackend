import {h} from 'preact';
/** @jsx h */

import Image from '../Image';

const PopUpScreen = ({togglePopup, title, cta, message, image, cta_two}) => (
  <div className="healthCheckWrapper df">
    <div className="popoverlay" />
    <div id="messageHook" className="popcontentWrap">
      <div className="healthcheckupInnerWrapper">
        {(image && <Image src={image} className="selfAssesIntroImg" />) || null}
        <p className="answerTxt" dangerouslySetInnerHTML={{__html: title}} />
        {(message && <p className="responsibleCitizenWrap">{message}</p>) || []}
        <div className="proceedCtaWrap">
          <div className="proceedCtaInnerWrap" onClick={() => togglePopup({message: cta, value: 'Ok'})}>
            <p className="proceedtxt">{cta}</p>
          </div>
          {(cta_two && (
            <div
              className="laterCtaInnerWrap"
              onClick={() => togglePopup({message: cta_two, value: 'Later'})}
            >
              <p className="skipTxt">{cta_two}</p>
            </div>
          )) ||
            []}
        </div>
        <div className="barWrapper">
          <div className="barInnerWrapper" />
        </div>
      </div>
    </div>
  </div>
);

export default PopUpScreen;
