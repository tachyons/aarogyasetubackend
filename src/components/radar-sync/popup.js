import {h} from 'preact';
import React from 'react';
/** @jsx h */
import './popup.css';
import InfectedIcon from '../../assets/icInfected.png';

const Popup = ({header, cta, onCta}) => {
  return (
    <>
      <div className="popOverlayWrap"></div>
      <div className="popContent">
        <div className="popBodyWrap">
          <div className="topImgWrap">
            <img src={InfectedIcon} />
          </div>
          <div className="popInfoMainWrap">
            <p className="popInfoHeadText">{header}</p>
          </div>
          <div className="popBtnWrap">
            {(cta && (
              <div className="confirmBtnWrap" onClick={() => onCta('')}>
                <button className="confirmBtnPop">{cta}</button>
              </div>
            )) ||
              null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
