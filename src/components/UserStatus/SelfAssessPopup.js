import {h} from 'preact';
import {useState} from 'preact/hooks';
/** @jsx h */

let hideShow = false;
const SelfAssessPopup = ({self_assess_popup, recommendation_dialogue, lang}) => {
  const [show, setShow] = useState(self_assess_popup);
  if (hideShow || !show) return null;

  const proceedCtaHref = `/ncv19/chat/?lang=${lang}`;
  return (
    <div className="healthCheckWrapper df">
      <div className="popoverlay" />
      <div className="popcontentWrap">
        <div className="healthcheckupInnerWrapper">
          <p className="recommendtxtWrap">{recommendation_dialogue.recco || ''}</p>
          <p className="userguideWrap">{recommendation_dialogue.message || ''}</p>
          <a className="proceedCtaWrap" href={proceedCtaHref} rel="noreferrer">
            <div className="proceedCtaInnerWrap">
              <p className="proceedtxt">{recommendation_dialogue.cta1 || ''}</p>
            </div>
          </a>
          <p
            className="skipTxt"
            onClick={() => {
              setShow(false);
              hideShow = true;
            }}
          >
            {recommendation_dialogue.cta2 || ''}
          </p>
          <div className="barWrapper">
            <div className="barInnerWrapper" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessPopup;
