import {h, Fragment} from 'preact';
/** @jsx h */
import {useEffect, useState, useContext} from 'preact/hooks';
import './epass.css';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';
import ConfigFromEnv from '@stencil/config-from-env';

function EpassPlaceholder() {
  return (
    <div className="epass-placeholder">
      <p className="big-placeholder shimmerLoad" />
      <p className="medium-placeholder shimmerLoad" />
      <p className="small-placeholder shimmerLoad" />
    </div>
  );
}

function Faq() {
  const {language} = useContext(ServerDataContext);
  const faqs = language.epass.faqList;
  const {faqHeading} = language.epass;
  return (
    <section className="faqWrap">
      <h3 className="faqHeader">{faqHeading}</h3>
      <div className="tabs">
        {faqs.map(({q, a}, i) => (
          <div className="faqBlock tab">
            <input type="checkbox" id={`"chck${i}"`} />
            <label className="faqQuestionText tab-label" htmlFor={`"chck${i}"`}>
              <span>{q}</span>
            </label>
            <div className="faqAnswerWrap tab-content">{a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function humanizeDate(epoch) {
  const utcDate = new Date(epoch);
  const minutesInt = utcDate.getMinutes();
  let minutes = `${minutesInt}`;
  if (minutesInt < 10) {
    minutes = `0${minutesInt}`;
  }
  return `${utcDate.getDate()} ${months[utcDate.getMonth()]} (${utcDate.getHours() %
    12}:${minutes} ${utcDate.getHours() > 12 ? 'PM' : 'AM'})`;
}

function EPassCards({cards}) {
  const {language} = useContext(ServerDataContext);
  const {issuedEpass, expiredText, validText, cta} = language.epass;
  return (
    <section>
      <h3 className="epassCardHeader">{issuedEpass}</h3>
      {Object.values(cards)
        .flat()
        .map(card => (
          <section className={`epassCard ${card.is_expired ? 'expiredCard' : 'activeCard'}`}>
            <div>
              <p className="boldNameTxt">{card.issuing_authority}</p>
              <p className="nameTxt">{card.issued_to}</p>
            </div>
            <div className="footerTxt">
              {card.is_expired ? (
                <span className="validityTxt">
                  {expiredText} {humanizeDate(card.pass_expiry)}
                </span>
              ) : (
                <span className="validityTxt">
                  {validText} <span className="validityDate">{humanizeDate(card.pass_expiry)}</span>
                </span>
              )}
              {!card.is_expired && (
                <a id={card.refId} href={card.url} className="viewLink">
                  {cta}
                </a>
              )}
            </div>
          </section>
        ))}
    </section>
  );
}

// function ApplyEPass() {
//   const [showStatePicker, setShowStatePicker] = useState();
//   const [selectedState, setSelectedState] = useState(null);
//   return (
//     <div class="epassInfoOuterWrap">
//       <p class="epassStatusHedText">Apply e-Pass / Check Status</p>
//       <p class="epassStatusSubText">
//         e-Pass is being issued for those who are engaged in providing essential services like
//         manufacturing, transport, storage and shops but do not have a Government or Private ID
//       </p>
//       <div class="epassStateSelect">
//         <div
//           onClick={(event) => {
//             event.preventDefault();
//             setShowStatePicker(true);
//           }}
//         >
//           {selectedState && <span>{selectedState}</span>}
//           {!selectedState && <span>Select State</span>}
//         </div>
//       </div>
//       {showStatePicker && (
//         <StatePicker
//           onSelect={(value) => {
//             setSelectedState(value);
//             setShowStatePicker(false);
//           }}
//           activeState={selectedState}
//           onClose={() => {
//             setShowStatePicker(false);
//           }}
//         />
//       )}
//       <div class="epassInfoCard">
//         <p class="cardHeadText">ServicePlus - SARAL Haryana</p>
//         <p class="cardSubText">saralharyana.gov.in › directApply</p>
//         <div class="wbsiteLinkWrap">
//           <a href="javascript:void(0);">VISIT WEBSITE</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// const states = [
//   'Andra Pradesh',
//   'Uttarakhand',
//   'Karnataka',
//   'Uttar Pradesh',
//   'Goa',
//   'Gujrat',
//   'Himachal Pradesh',
//   'Delhi',
//   'Punjab',
//   'Assam',
//   'Orissa',
//   'Kerala',
// ];

// function StatePicker({ activeState, onSelect, onClose }) {
//   const [selectedState, setSelectedState] = useState(activeState);
//   return (
//     <React.Fragment>
//       <div className="selectOverlay" />
//       <div className="citySelectLayover">
//         <div className="selectHeaderWrap">
//           <div className="closeIconWrap" onClick={onClose}>
//             <img src="https://static1.swaraksha.gov.in/public/assets/closeIcon.png" />
//           </div>
//           <div className="headerTextWrap">
//             <p className="headerText">Choose a State/UT</p>
//           </div>
//         </div>
//         <div className="selectSearchWrap">
//           <input type="text" placeholder="Search" />
//         </div>
//         <div className="selectOptionWrap">
//           <ul>
//             {states.map((value) => {
//               return (
//                 <li
//                   className={value === selectedState ? 'active' : ''}
//                   onClick={() => {
//                     setSelectedState(value);
//                   }}
//                 >
//                   {value}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//         <div className="selectFooter">
//           <p
//             className="doneBtn"
//             onClick={() => {
//               onSelect(selectedState);
//             }}
//           >
//             Done
//           </p>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

const ViewStates = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
};
export default function Epass() {
  const [viewState, setViewState] = useState(ViewStates.PENDING);
  const [ePassList, setEPassList] = useState(null);
  const {language} = useContext(ServerDataContext);
  const {headers} = useContext(ClientDataContext);
  useEffect(() => {
    setViewState(ViewStates.LOADING);
    fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/epass/`, {
      headers: {
        Authorization: headers.Authorization,
        pt: headers.pt,
        ver: headers.ver,
      },
    })
      .then(res => res.json())
      .then(value => {
        setViewState(ViewStates.LOADED);
        setEPassList(value);
      })
      .catch(() => {
        setViewState(ViewStates.FAILED);
      });
  }, []);
  if (viewState === ViewStates.PENDING) {
    return null;
  }
  const {noEpassTitle, noEpassMessage} = language.epass;
  return (
    <div className="covidupdateOuterWrapper">
      {viewState === ViewStates.LOADING && <EpassPlaceholder />}
      {viewState === ViewStates.LOADED && (
        <Fragment>
          {ePassList.success && <EPassCards cards={ePassList.data} />}
          {!ePassList.success && (
            <section className="epassNotAvailableWrap">
              <p className="header">{noEpassTitle}</p>
              <p className="content">{noEpassMessage}</p>
            </section>
          )}
          {/* <ApplyEPass/> */}
          <Faq lang={ePassList.lang} />
        </Fragment>
      )}
    </div>
  );
}
