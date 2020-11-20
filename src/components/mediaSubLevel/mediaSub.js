import {h} from 'preact';
/** @jsx h */
import './mediaSub.css';

const embededMarkup = `
  <div style="width: 100%;display: flex; padding-top: 10px;">
      <iframe
        width="100%"
        height="192"
        style="border-radius: 8px"
        src="https://www.youtube.com/embed/v-852f1PXBo"
        frameborder="0"
      ></iframe>
  </div>
`;

const embededMarkupMedium = `
  <div style="width: 100%;display: flex;">
      <iframe
        width="100%"
        height="166"
        style="border-radius: 8px"
        src="https://www.youtube.com/embed/v-852f1PXBo"
        frameborder="0"
      ></iframe>
  </div>
`;

export default function MediaSecond({init}) {
  if (!init) {
    return null;
  }
  const {trendingNow} = window.language.mediaTab;
  return (
    <div className="mediaMainOuterWrap">
      <div className="mediaTrendingWrap">
        <p className="trendingMainHeadText">{trendingNow}</p>
        <div className="trendingInnerWrap">
          <div className="bigVideoWrap">
            <div dangerouslySetInnerHTML={{__html: embededMarkup}} />
            <p className="videoInfoText">#MaskForce | Join the Fight!</p>
          </div>
        </div>

        <div className="trendingInnerWrap">
          <div className="mediumVideoOuterWrap">
            <div className="mediumVideoInnerWrap">
              <div
                className="imgVideoMediumWrap"
                dangerouslySetInnerHTML={{__html: embededMarkupMedium}}
              />
              <p className="smallVideoInfoText">How to self isolate?</p>
            </div>
            <div className="mediumVideoInnerWrap">
              <div
                className="imgVideoMediumWrap"
                dangerouslySetInnerHTML={{__html: embededMarkupMedium}}
              />
              <p className="smallVideoInfoText">What is social distancing?</p>
            </div>
            <div className="mediumVideoInnerWrap">
              <div
                className="imgVideoMediumWrap"
                dangerouslySetInnerHTML={{__html: embededMarkupMedium}}
              />
              <p className="smallVideoInfoText">How to self isolate?</p>
            </div>
            <div className="mediumVideoInnerWrap">
              <div
                className="imgVideoMediumWrap"
                dangerouslySetInnerHTML={{__html: embededMarkupMedium}}
              />
              <p className="smallVideoInfoText">How to self isolate?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
