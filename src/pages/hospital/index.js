/* eslint-disable react/no-danger */
import { h, Fragment } from 'preact';
/** @jsx h */
import { useState, useEffect, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import './icmr.css';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';

import useDisableBodyOverflow from '../../utils/useDisableBodyOverflow';
import { calculateDistance, getLocationLink } from '../../utils/location-utils';
import getHospitalLabs from './getHospitalLabs';

import Image from '../../components/Image';

import arrowBackPng from '../../assets/arrow-back.png';
import GovtSvg from '../../assets/hospital/govt.svg';
import PrivateSvg from '../../assets/hospital/pvt.svg';
import quarantineteSvg from '../../assets/hospital/quarantine.svg';
import CollectionSitesSvg from '../../assets/hospital/quarantine_i.svg';
import GovtLabsSvg from '../../assets/hospital/hospitalgovt.svg';
import PrivateLabsSvg from '../../assets/hospital/hospitalpvt.svg';

const ViewState = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  NO_NEARBY_LABS: 'NO_NEARBY_LABS',
  ERROR: 'ERROR',
};

const FilterOptions = {
  ALL: 'All',
  PRIVATE: 'Private Hospitals',
  GOVT: 'Government',
  Quarantine: 'Quarantine',
};

function filterLabs(labs, filterOption) {
  return labs.filter(lab => {
    if (filterOption === FilterOptions.ALL) {
     
      return true;
    }
    if (filterOption === FilterOptions.GOVT) {
      return lab.typ === 'Govt Hospitals'|| lab.typ === 'Govt Hospitals' || lab.typ === 'Hospital' || 
      lab.typ === 'Govt Medical College' || lab.typ === 'Central Ministry Hospital' || lab.typ ==='State Govt. Medical College';
    }
    
    if (filterOption === FilterOptions.PRIVATE) {
      return lab.typ === 'Private Hospitals' || lab.typ === 'Private Medical College';
    }
    if (filterOption === FilterOptions.Quarantine) {
      return lab.typ === 'Other than Hospital';
    }
   
    return true; // ??
  });
}

function ErrorBlock({ onRetry }) {
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
  const { language } = useContext(ServerDataContext);
  const { title, subText } = language.hospitalPage;
  return (
    <div className="testingLabTopBlock">
      <p className="topBlockHeadText">{title}</p>
      <p className="topBlockSubText">{subText} </p>
    </div>
  );
}

function IcmrHeader(props) {
  const { onClick } = props;
  const { language } = useContext(ServerDataContext);
  const { heading } = language.hospitalPage;
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

function LabTypeFilters({ activeFilter, onFilterClicked }) {
  const { language } = useContext(ServerDataContext);
  const { all, gLabs, pLabs,qLabs } = language.hospitalPage;
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
         
          <p dangerouslySetInnerHTML={{ __html: gLabs }} />
        </li>
        <li
          onClick={() => onFilterClicked(FilterOptions.PRIVATE)}
          className={`filter ${activeFilter === FilterOptions.PRIVATE ? 'activeFilter' : ''}`}
        >
          <Image src={PrivateSvg} />
          
          <p dangerouslySetInnerHTML={{ __html: pLabs }} />
        </li>
        <li
          onClick={() => onFilterClicked(FilterOptions.Quarantine)}
          className={`filter ${activeFilter === FilterOptions.Quarantine ? 'activeFilter' : ''}`}
        >
          <Image src={quarantineteSvg} />
        
          <p dangerouslySetInnerHTML={{ __html: qLabs }} />
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

function Labs({ labs, filter }) {
  const { language } = useContext(ServerDataContext);
  if (!labs) {
    return null;
  }
  const filteredLabs = filterLabs(labs, filter);
  const showNoLabsForFilter = filteredLabs.length === 0 && labs.length > 0;
  if (showNoLabsForFilter) {
    return <div className="no-filters">{`No ${filter} Labs`}</div>;
  }
  const { gTitle, pTitle, qTitle, cta } = language.hospitalPage;
  return filteredLabs.map(data => {
    const { typ, loc } = data;
    let iconLink;
    let labType;
    switch (typ) {
      case 'Governemt Hospitals':
        iconLink = GovtLabsSvg;
        labType = gTitle;
        
        break;
      case 'Private Hospitals':
        iconLink = PrivateLabsSvg;
        labType = pTitle;
        
        break;
        case 'Private Medical College':
          iconLink = PrivateLabsSvg;
          labType = pTitle;
          
          break;
      case 'Quarantine':
        iconLink = CollectionSitesSvg;
        labType = qTitle;
        
        break;
        case 'Other than Hospital':
          iconLink = CollectionSitesSvg;
          labType = qTitle;
          
          break;
          
          case 'Central Ministry Hospital':
          iconLink = GovtLabsSvg;
          labType = gTitle;
          break;

          case 'Govt Medical College':
          iconLink = GovtLabsSvg;
          labType = gTitle;
          break;
          case 'Hospital':
          iconLink = GovtLabsSvg;
          labType = gTitle;
          break;
          case 'State Govt. Medical College':
            iconLink = GovtLabsSvg;
            labType = gTitle;
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


export default function IcmrPage() {
  const [viewState, setViewState] = useState(ViewState.LOADING);
  const [labsData, setLabsData] = useState(null);
  const [activeFilter, setActiveFilters] = useState(FilterOptions.ALL);
  const [distance, setDistance] = useState('10km'); 
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
    let { headers } = useContext(ClientDataContext);
    const { lat, lon } = headers;
    headers = {...headers,distance:distance};

    setViewState(ViewState.LOADING);
       getHospitalLabs(headers)
      .then(data => {
        if (!lat || !lon) {
          setViewState(ViewState.NO_NEARBY_LABS);
          return;
        }
       
        const sortedData = data;
        
        let allLabs = Object.values(sortedData).reduce((acc, e) => acc.concat(e), []);
      
        setViewState(ViewState.LOADED);

        setLabsData({
          
          labs: allLabs,
        });
       
      })
      .catch(() => {

      
        setViewState(ViewState.ERROR);
      });
  }

  useEffect(() => {
    fetchResults();
 
  }, 
  [distance] 
  );

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


        {viewState === ViewState.LOADED && (
          <Fragment>

<div className="kmSelectOuterWrap">
        <ul>
          
          <li className={distance === '10km' ? 'active' : ''} onClick={() => setDistance('10km')}>
            10 Km
              </li>
          <li className={distance === '20km' ? 'active' : ''} onClick={() => setDistance('20km')}>
            20 Km
              </li>
          <li className={distance === '50km' ? 'active' : ''} onClick={() => setDistance('50km')}>
            50 Km
              </li>
          
        </ul>
      </div>
      <LabTypeFilters activeFilter={activeFilter} onFilterClicked={setActiveFilters} />
            <Labs labs={labsData.labs} filter={activeFilter} />
          </Fragment>
        )}


      </div>
    </div>
  );
}
