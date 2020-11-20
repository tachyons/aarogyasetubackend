import {h} from 'preact';
/** @jsx h */

import Image from '../Image';

const RecommendBanner = ({recommendationList, recommendText}) => {
  if (!recommendText) return null;

  return (
    <div className="symptomsOuterWrap">
      <div className="symptomsInnerWrap">
        {recommendationList.map((item, index) => {
          const recommendedOuterWrapClassConditional = `recomendOuterWrap ${
            index === 0 ? '' : 'marginT10'
          }`;
          return (
            <div className={recommendedOuterWrapClassConditional}>
              <div className="quarantineInfo">
                <p className="quarantineInfoText">{index + 1}</p>
                <Image src={item.img} />
              </div>
              <div className="steptoFollowWrap">
                <p className="steptoFollowtext">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendBanner;
