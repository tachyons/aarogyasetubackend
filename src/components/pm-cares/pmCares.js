import {h} from 'preact';
/** @jsx h */
import {useContext} from 'preact/hooks';
import './pmCares.css';

import ServerDataContext from '@stencil/server-data-context';

import Image from '../Image';
import pmCarsLogoPng from '../../assets/pmcareslogo1.png';
import helpingHandsPng from '../../assets/helping-hands.png';

function PmCares() {
  const {language, flags} = useContext(ServerDataContext);
  const {isIos, ver} = flags;
  const {donateCta} = language.pmCares;
  return (
    <div className="donateInfoOuterWrapper">
      <div className="pmcareLogoWrap">
        <Image src={pmCarsLogoPng} alt="handa icon" />
      </div>
      <div className="helpingHandsWrap">
        <Image src={helpingHandsPng} alt="handa icon" />
      </div>
      {!isIos || ver >= 22 ? (
        <div className="showDetailsBtnWrap">
          <a
            href="https://www.pmcares.gov.in/en?should_open_safari=true"
            className="showDetailsBtn"
          >
            {donateCta}
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default PmCares;
