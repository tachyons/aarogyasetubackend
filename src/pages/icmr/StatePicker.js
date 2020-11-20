import {h, Fragment} from 'preact';
/** @jsx h */
import {useState, useEffect} from 'preact/hooks';
import getIcmrLabs from './getIcmrLabs';

import Image from '../../components/Image';

import CloseIconPng from '../../assets/closeIcon.png';

export default function StatePicker({onClose, onSelect, selectedState, icmrPage}) {
  const [statesData, setStatesData] = useState([]);
  const [filteredStatesData, setFilteredStatesData] = useState([]);
  const [activeState, setActiveState] = useState(selectedState);
  useEffect(() => {
    getIcmrLabs()
      .then(data => {
        if (selectedState) {
          const selectedStateIdx = data.findIndex(s => s.name === selectedState);
          const selectedStateData = data.splice(selectedStateIdx, 1)[0];
          data.splice(0, 0, selectedStateData);
        }
        setStatesData(data);
        setFilteredStatesData(data);
      })
      .catch(() => {});
    document.getElementById('icmr_main_block').style.overflowY = 'hidden';
    return () => {
      document.getElementById('icmr_main_block').style.overflowY = 'scroll';
    };
  }, []);

  const onStateClicked = state => {
    setActiveState(state);
    // Should automatically call onSelect and close this??
  };

  const _onSelect = () => {
    const activeStateData = statesData.find(stateData => stateData.name === activeState);
    const labsOfState = Object.values(activeStateData.districts).reduce(
      (acc, e) => acc.concat(e),
      [],
    );
    onSelect(activeState, labsOfState);
  };

  const onSearchTextChange = text => {
    setFilteredStatesData(() =>
      statesData.filter(({name}) => name.toLowerCase().startsWith(text.toLowerCase())),
    );
  };

  const {placeholder, done} = icmrPage;
  return (
    <Fragment>
      <div className="selectOverlay" onClick={onClose} />
      <div className="citySelectLayover">
        <div className="selectHeaderWrap">
          <div className="closeIconWrap" onClick={onClose}>
            <Image src={CloseIconPng} />
          </div>
          <div className="headerTextWrap">
            <p className="headerText">{placeholder}</p>
          </div>
        </div>
        <div className="selectSearchWrap">
          <input
            type="text"
            placeholder="Search"
            onChange={e => onSearchTextChange(e.currentTarget.value)}
          />
        </div>
        <div className="icmrSelectOptionWrap">
          <ul>
            {filteredStatesData.map(statesData => (
              <li
                className={activeState === statesData.name ? 'active' : ''}
                onClick={() => onStateClicked(statesData.name)}
              >
                {`${statesData.name} (${statesData.count})`}
              </li>
            ))}
          </ul>
        </div>
        <div className="selectFooter">
          <p className="doneBtn" onClick={_onSelect}>
            {done}
          </p>
        </div>
      </div>
    </Fragment>
  );
}
