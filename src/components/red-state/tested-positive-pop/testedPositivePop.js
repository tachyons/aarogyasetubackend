import {h} from 'preact';
import React from 'react';
/** @jsx h */
import './testedPositivePop.css';
import closeIcon from '../../../assets/closeIcon.png';
import InfectedIcon from '../../../assets/icInfected.png';

const TestedPositivePop = ({header, subheader, yes, no, cta, confirmStatus, mob}) => {
  return (
    <>
      <div className="popOverlayWrap"></div>
      <div className="popContent">
        <div className="popHeader" onClick={() => confirmStatus('close')}>
          <a href="javascript:void(0);">
            <img src={closeIcon} />
          </a>
        </div>
        <div className="popBodyWrap">
          <div className="topImgWrap">
            <img src={InfectedIcon} />
          </div>
          <div className="popInfoMainWrap">
            <p className="popInfoHeadText">{header}</p>
            {(subheader && <p className="popInfoSubText">{subheader.replace('%phone', mob)}</p>) ||
              null}
          </div>
          <div className="popBtnWrap">
            {(yes && (
              <div className="confirmBtnWrap" onClick={() => confirmStatus('yes')}>
                <button className="confirmBtnPop">{yes}</button>
              </div>
            )) ||
              null}
            {(cta && (
              <div className="confirmBtnWrap" onClick={() => confirmStatus('cta')}>
                <button className="understandBtnPop">{cta}</button>
              </div>
            )) ||
              null}
            {(no && (
              <div className="rejectBtnWrap" onClick={() => confirmStatus('no')}>
                <button className="rejectBtnPop">{no}</button>
              </div>
            )) ||
              null}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestedPositivePop;
