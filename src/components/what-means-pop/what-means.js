import {h} from 'preact';
/** @jsx h */
import {useContext} from 'preact/hooks';
import ServerDataContext from '@stencil/server-data-context';
import './what-means.css';

import Image from '../Image';

import closeIconPng from '../../assets/closeIcon.png';

function WhatMeans({close}) {
  const {language} = useContext(ServerDataContext);
  const {heading, list} = language.nearbyPopup;
  return (
    <div>
      <div className="overlayBlock" onClick={close} />
      <div className="whatMeansOuterBlock" onClick={() => {}}>
        <div className="popHeaderWrap">
          <a className="closeWrap" onClick={close}>
            <Image src={closeIconPng} alt="close" />
          </a>
          <p className="headerText">{heading}</p>
        </div>
        <div className="whatPopContentWrap">
          {list.map(item => (
            <div className="whatPopContentInnerWrap">
              <p className="whatInfoHeadText">{item.h.split('&apos;').join("'")}</p>
              <p
                className="whatInfoSubText"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: item.p.split('&apos;').join("'"),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhatMeans;
