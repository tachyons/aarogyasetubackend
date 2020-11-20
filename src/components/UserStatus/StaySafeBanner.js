import {h} from 'preact';
/** @jsx h */

import Image from '../Image';

const StaySafeBanner = ({listText, listItem}) => {
  if (!listText) return null;

  return (
    <div className="staySafeOuterWrap">
      <div className="staySafeInnerWrap">
        <p className="stayHeadText">{listText}</p>
        {listItem.map((item, index) => (
          <a key={`staySafeBanner${index}`} href={item.itemLink} rel="noreferrer">
            <div className="staySafeBannerWrap">
              <Image src={item.banner} />
              <p>{item.itemText}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StaySafeBanner;
