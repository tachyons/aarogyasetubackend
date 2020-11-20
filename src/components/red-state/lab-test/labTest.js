import {h} from 'preact';
/** @jsx h */
import './labTest.css';

import LabImg from '../../../assets/labTest.png';
import RightArrow from '../../../assets/blue-right.png';

const LabTest = () => {
  return (
    <div className="labTestOuterWrap">
      <div className="labTestInnerWrap">
        <div className="labTestImgWrap">
          <img src={LabImg} />
        </div>
        <div className="labTestInfoWrap">
          <p className="labTestHeadTest">Get re-tested for COVID-19?</p>

          <a className="labTestLink" href="#">
            ICMR Approved Labs <img src={RightArrow} />
          </a>
          <a className="labTestLink" href="#">
            Hospitals with testing facility <img src={RightArrow} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LabTest;
