import {h} from 'preact';
/** @jsx h */

import Image from '../Image';

const Guideline = ({guideLineHeading, guideLines}) => {
  if (!guideLineHeading) return null;

  return (
    <div className="selfQuarantineWrap">
      <p className="selfQuarantineHeadText">{guideLineHeading}</p>
      <div className="selfQuarantineInnerWrap">
        {guideLines.map((item, index) =>
          index % 2 == 0 ? (
            <div className="selfInnerInfoWrap">
              <div className="selfInfoWrapRight">
                <p className="selfInfoText">{index + 1}</p>
                <p className="selfInfoTextRight">{item.label}</p>
              </div>
              <div className="selfImgWrapRight">
                <Image src={item.illustration} />
              </div>
            </div>
          ) : (
            <div className="selfInnerInfoWrap">
              <div className="selfImgWrapLeft">
                <Image src={item.illustration} />
              </div>
              <div className="selfInfoWrapLeft">
                <p className="selfInfoText">{index + 1}</p>
                <p className="selfInfoText">{item.label}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Guideline;
