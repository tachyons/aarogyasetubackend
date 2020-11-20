import {h} from 'preact';
/** @jsx h */
import {useState, useContext} from 'preact/hooks';
import {route} from 'preact-router';
import './faqHome.css';

import ServerDataContext from '@stencil/server-data-context';

import LongArrowPinkSvg from '../../assets/faq/ic_longarrow_pink.svg';
import LongArrowPurpleSvg from '../../assets/faq/ic_longarrow_purple.svg';

import ic_personal_infoSvg from '../../assets/faq/ic_personal_info.svg';
import ic_anonymizeSvg from '../../assets/faq/ic_anonymize.svg';
import privacySvg from '../../assets/faq/privacy.svg';
import ic_secureSvg from '../../assets/faq/ic_secure.svg';
import ic_locationSvg from '../../assets/faq/ic_location.svg';
import ic_personal_info_timeSvg from '../../assets/faq/ic_personal_info_time.svg';
import ic_serverSvg from '../../assets/faq/ic_server.svg';
import ic_infectedSvg from '../../assets/faq/ic_infected.svg';

import getFaqData from '../../utils/get-faq-data';

import Image from '../Image';

const ITEMS_PER_ROW = 4;
const PRIVACY_KEY = 'privacy';

const privacyFaqIconsMapping = [
  ic_personal_infoSvg,
  ic_anonymizeSvg,
  privacySvg,
  ic_secureSvg,
  ic_locationSvg,
  ic_personal_info_timeSvg,
  ic_serverSvg,
  ic_infectedSvg,
];

function FaqHome() {
  const {language, flags} = useContext(ServerDataContext);
  const [faqData, setFaqData] = useState(null);

  const {lang} = flags;

  if (typeof window !== 'undefined') {
    getFaqData(lang).then(faq => {
      setFaqData(faq);
    });
  }

  if (!faqData) return;

  const privacyFaqs = faqData.privacy.q_a || [];

  // Convert to 2D array for alternating color view
  const rows = privacyFaqs.reduce((acc, e, i) => {
    const row = Math.floor(i / ITEMS_PER_ROW);
    const position = i % ITEMS_PER_ROW;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position][row] = {...e, index: i};
    return acc;
  }, []);

  const {homeHeading} = language.faq;
  return (
    <div className="faqBlockOuterWrapNew">
      <div className="faqHeadTextWrap">
        <p className="faqHeadTextNew">{homeHeading}</p>
      </div>
      <div className="faqTabOuterWrap">
        <div className="faqTabInnerWrap">
          {rows.map((row, rowNumber) => (
            <div>
              {row.map((item, colNumber) => {
                
                const color = (colNumber + rowNumber) % 2 === 0 ? 'purple' : 'pink';
                return (
                  <div
                    onClick={() => {
                      const index = privacyFaqs.findIndex(e => e === item);
                      route(
                        `/ncv19/faq/?selectedQuestion=${JSON.stringify({
                          index,
                          section: PRIVACY_KEY,
                        })}`,
                      );
                    }}
                    className={`faqTabWrap ${color}Back`}
                  >
                    <Image
                     
                      src={privacyFaqIconsMapping[item.index]}
                      className="faqImages"
                      alt="personalInfo"
                    />
                    <p className={`faqText ${color}Text`}>{item.q_short || item.q}</p>
                    <div className="rightLongArrowWrap">
                      <Image src={color === 'pink' ? LongArrowPinkSvg : LongArrowPurpleSvg} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqHome;
