
import {h, Fragment} from 'preact';
/** @jsx h */
import {useState, useEffect, useContext} from 'preact/hooks';
import {route} from 'preact-router';
import './icmr.css';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';
import StatePicker from './StatePicker';
import useDisableBodyOverflow from '../../utils/useDisableBodyOverflow';
import {calculateDistance, getLocationLink} from '../../utils/location-utils';
import getIcmrLabs from './getIcmrLabs';

import Image from '../../components/Image';

import arrowBackPng from '../../assets/arrow-back.png';
import GovtSvg from '../../assets/icmr/govt.svg';
import PrivateSvg from '../../assets/icmr/private.svg';
import CollectionSitesSvg from '../../assets/icmr/il_collection_sites.svg';
import GovtLabsSvg from '../../assets/icmr/il_govt_labs.svg';
import PrivateLabsSvg from '../../assets/icmr/il_private_labs.svg';
import bluedropArrowPng from '../../assets/bluedroparrow.png';

const ViewState = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  NO_NEARBY_LABS: 'NO_NEARBY_LABS',
  ERROR: 'ERROR',
};

const FilterOptions = {
  ALL: 'All',
  PRIVATE: 'Private',
  GOVT: 'Government',
};

function filterLabs(labs, filterOption) {
  return labs.filter(lab => {
    if (filterOption === FilterOptions.ALL) {
      return true;
    }
    if (filterOption === FilterOptions.GOVT) {
      return lab.typ === 'Govt';
    }
    if (filterOption === FilterOptions.PRIVATE) {
      return lab.typ === 'Private';
    }
    return true; 
  });
}

function ErrorBlock({onRetry}) {
  return (
    <div className="error-block">
      <span className="error-msg">Something went wrong.</span>
      <span onClick={onRetry} className="error-cta">
        Try Again
      </span>
    </div>
  );
}

function TopBlock() {
  const {language} = useContext(ServerDataContext);
  const {title, subText} = language.icmrPage;
  return (
    <div className="testingLabTopBlock">
      <p className="topBlockHeadText">{title}</p>
      <p className="topBlockSubText">{subText} </p>
    </div>
  );
}

function IcmrHeader(props) {
  const {onClick} = props;
  const {language} = useContext(ServerDataContext);
  const {heading} = language.icmrPage;
  return (
    <div className="icmrContentHeader">
      <Image
        onClick={onClick}
        src={arrowBackPng}
        style={{
          position: 'absolute',
          left: 20,
          top: 12,
          width: 20,
          height: 20,
        }}
      />
      <span
        style={{
          display: 'flex',
          fontSize: 16,
          color: 'rgb(36, 40, 51)',
          fontWeight: 'bold',
        }}
      >
        {heading}
      </span>
    </div>
  );
}

function LabTypeFilters({activeFilter, onFilterClicked}) {
  const {language} = useContext(ServerDataContext);
  const {all, gLabs, pLabs} = language.icmrPage;
  return (
    <div className="categoryOuterWrap">
      <ul>
        <li
          onClick={() => onFilterClicked(FilterOptions.ALL)}
          className={`filter ${activeFilter === FilterOptions.ALL ? 'activeFilter' : ''}`}
        >
          {all}
        </li>
        <li
          onClick={() => onFilterClicked(FilterOptions.GOVT)}
          className={`filter ${activeFilter === FilterOptions.GOVT ? 'activeFilter' : ''}`}
        >
          <Image src={GovtSvg} />
         
          <p dangerouslySetInnerHTML={{__html: gLabs}} />
        </li>
        <li
          onClick={() => onFilterClicked(FilterOptions.PRIVATE)}
          className={`filter ${activeFilter === FilterOptions.PRIVATE ? 'activeFilter' : ''}`}
        >
          <Image src={PrivateSvg} />
        
          <p dangerouslySetInnerHTML={{__html: pLabs}} />
        </li>
       
      </ul>
    </div>
  );
}

function LabPlaceholder() {
  return (
    <div className="lab-placeholder">
      <div className="lab-placeholder-main">
        <span className="lab-placeholder-img shimmerLoad" />
        <div className="lab-placeholder-texts">
          <span className="lab-placeholder-title shimmerLoad" />
          <span className="lab-placeholder-subtitle shimmerLoad" />
        </div>
      </div>
      <div>
        <span className="lab-placeholder-img shimmerLoad" />
      </div>
    </div>
  );
}

function Labs({labs, filter}) {
  const {language} = useContext(ServerDataContext);
  if (!labs) {
    return null;
  }
  const filteredLabs = filterLabs(labs, filter);
  const showNoLabsForFilter = filteredLabs.length === 0 && labs.length > 0;
  if (showNoLabsForFilter) {
    return <div className="no-filters">{`No ${filter} Labs`}</div>;
  }
  const {gTitle, pTitle, cTitle, cta} = language.icmrPage;
  return filteredLabs.map(data => {
    const {typ, loc} = data;
    let iconLink;
    let labType;
    switch (typ) {
      case 'Govt':
        iconLink = GovtLabsSvg;
        labType = gTitle;
        break;
      case 'Private':
        iconLink = PrivateLabsSvg;
        labType = pTitle;
        break;
      case 'Collection':
        iconLink = CollectionSitesSvg;
        labType = cTitle;
        break;
      default:
        iconLink = GovtLabsSvg;
        labType = gTitle;
    }
    return (
      <div className="labInfoOuterWrap">
        <div className="labTypeImgWrap">
          <Image src={iconLink} className="labTypeImg" />
          <div className="labInfoWrap">
            <p className="labNameText">{data.nm}</p>
            <p className="labInfoText">{labType}</p>
           
          </div>
        </div>
        <div className="labAddressOuterWrap">
          <div className="labAddressWrap">{}</div>
          {(loc && loc.lat && loc.lon && (
            <div className="getDirectionWrap">
              <a href={getLocationLink(loc.lat, loc.lon, data.nm)}>{cta}</a>
            </div>
          )) ||
            []}
        </div>
      </div>
    );
  });
}

function sortAllLabsResults(data, currLocation) {
  return data
    .map(state => {
      let minDistanceInState = Number.MAX_SAFE_INTEGER;
      const districtsData = Object.keys(state.districts).reduce((acc, name) => {
        let minDistanceInDistrict = Number.MAX_SAFE_INTEGER;
        let districtLabs = state.districts[name];
        districtLabs = districtLabs
          .filter(({loc}) => loc && loc.lat && loc.lon)
          .map(lab => {
            const {loc: labLocation} = lab;
            const distanceFromCurr = calculateDistance(
              parseFloat(currLocation.lat),
              parseFloat(currLocation.lon),
              parseFloat(labLocation.lat),
              parseFloat(labLocation.lon),
            );
            minDistanceInState = Math.min(minDistanceInState, distanceFromCurr);
            minDistanceInDistrict = Math.min(minDistanceInDistrict, distanceFromCurr);
            return {
              ...lab,
              distance: distanceFromCurr,
            };
          })
          .sort((a, b) => a.distance - b.distance);
        return {
          ...acc,
          [name]: districtLabs,
        };
      }, {});
      return {
        ...state,
        districts: districtsData,
        distance: minDistanceInState,
      };
    })
    .sort((a, b) => a.distance - b.distance);
}

export default function IcmrPage() {
  const [viewState, setViewState] = useState(ViewState.LOADING);
  const [labsData, setLabsData] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [activeFilter, setActiveFilters] = useState(FilterOptions.ALL);
  const {language} = useContext(ServerDataContext);
  useEffect(() => {
    const element = document.querySelector('.appUserInfo');
    if (element) {
      element.style.display = 'none';
    }
    return () => {
      if (element) {
        element.style.display = 'flex';
      }
    };
  }, []);
  useDisableBodyOverflow();

  function fetchResults() {
    const {headers} = useContext(ClientDataContext);
    const {lat, lon} = headers;
    setViewState(ViewState.LOADING);
    getIcmrLabs(headers)
      .then(data => {
        if (!lat || !lon) {
          setViewState(ViewState.NO_NEARBY_LABS);
          return;
        }
        const currLocation = {lat, lon};
        const sortedData = sortAllLabsResults(data, currLocation);
        let allLabs = Object.values(sortedData[0].districts).reduce((acc, e) => acc.concat(e), []);
        allLabs = [...allLabs].sort((a, b) => a.distance - b.distance);
        setViewState(ViewState.LOADED);
        setLabsData({
          state: sortedData[0].name,
          labs: allLabs,
        });
      })
      .catch(() => {
        setViewState(ViewState.ERROR);
      });
  }

  useEffect(() => {
    fetchResults();
  }, []);

  const {selectState, select, pickedText} = language.icmrPage;
  return (
    <div className="icmrPage">
      <IcmrHeader
        onClick={() => {
          route('/ncv19/');
        }}
      />
      <div className="icmrContentMainBlock" id="icmr_main_block">
        {viewState !== ViewState.ERROR && <TopBlock />}

        {viewState === ViewState.ERROR && <ErrorBlock onRetry={fetchResults} />}
        {viewState === ViewState.LOADING && (
          <Fragment>
            <LabPlaceholder />
            <LabPlaceholder />
            <LabPlaceholder />
          </Fragment>
        )}

        {viewState === ViewState.NO_NEARBY_LABS && (
          <Fragment>
            <div className="listingSelectBlock">
              <p
                className="listingSelectText"
                dangerouslySetInnerHTML={{
                  __html: selectState,
                }}
              />
              <span
                className="locationText"
                onClick={() => {
                  setShowLocationPicker(true);
                }}
              >
                {select}
                <Image src={bluedropArrowPng} className="arrowImg" />
              </span>
            </div>
          </Fragment>
        )}
        {viewState === ViewState.LOADED && (
          <Fragment>
            <div className="listingSelectBlock">
              <p
                className="listingSelectText"
                dangerouslySetInnerHTML={{
                  __html: pickedText,
                }}
              />
              <span
                className="locationText"
                onClick={() => {
                  setShowLocationPicker(true);
                }}
              >
                {labsData && labsData.state}
              </span>
              <Image src={bluedropArrowPng} className="arrowImg" />
            </div>
            <LabTypeFilters activeFilter={activeFilter} onFilterClicked={setActiveFilters} />
            <Labs labs={labsData.labs} filter={activeFilter} />
          </Fragment>
        )}

        {showLocationPicker && (
          <StatePicker
            onSelect={(stateName, labs) => {
              setShowLocationPicker(false);
              setViewState(ViewState.LOADED);
              setLabsData({state: stateName, labs});
            }}
            icmrPage={language.icmrPage || {}}
            selectedState={labsData && labsData.state}
            onClose={() => setShowLocationPicker(false)}
          />
        )}
      </div>
    </div>
  );
}
