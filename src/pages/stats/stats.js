import {h} from 'preact';
/** @jsx h */
import {useState, useEffect, useContext} from 'preact/hooks';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';
import ConfigFromEnv from '@stencil/config-from-env';
import './stats.css';

import GreenArrowPng from '../../assets/greenarrow.png';
import RedArrowPng from '../../assets/redarrow.png';
import BlackArrowPng from '../../assets/blackarrow.png';
import BluedropArrowPng from '../../assets/bluedroparrow.png';
import Image from '../../components/Image';

let Graph;

export default function() {
  const [graphLoading, setGraphLoading] = useState(true);
  const [stats, setStats] = useState();
  const [didState, setDidState] = useState({});
  const [sortKey, setSortKey] = useState('confirmed');
  const {language} = useContext(ServerDataContext);
  const {headers} = useContext(ClientDataContext);
  useEffect(() => {
    import('../../components/graph/graph').then(
      ({default: graph}) => {
        Graph = graph;
        setGraphLoading(false);
      },
    );
    fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/stats?v=1`, {
      headers: {
        Authorization: headers.Authorization,
        pt: headers.pt,
        ver: headers.ver,
      },
    })
      .then(response => response.json())
      .then(setStats);

    fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/did-state?v=1`, {
      headers: {
        Authorization: headers.Authorization,
        pt: headers.pt,
        ver: headers.ver,
      },
    })
      .then(response => response.json())
      .then(setDidState);
  }, []);

  if (!stats || graphLoading) {
    return (
      <div className="covidupdateOuterWrapper">
        <div className="blueBackLoading" />
        <div className="statInfoMainWrap">
          <div className="statInfoInnerWrap">
            <div className="statInfoTopWrap">
              <div className="statInfoSmallLoader shimmerLoad" />
              <div className="statInfoBigLoader shimmerLoad" />
            </div>
            <div className="statInfoBottomWrap">
              <div className="statInfoSmallLoader shimmerLoad" />
              <div className="statInfoBigLoader shimmerLoad" />
            </div>
          </div>
        </div>
        <div className="graphOuterWrap">
          <div className="graphHeadTextloader shimmerLoad" />
          <div className="graphMainLoader shimmerLoad" />
        </div>
        <div className="cityStatOuterWrap">
          <div className="cityHeadTextLoader shimmerLoad" />
          <div className="cityStatInnerwrap">
            <div className="cityTextLoader shimmerLoad" />
            <div className="cityCountLoader shimmerLoad" />
          </div>
          <div className="cityStatInnerwrap">
            <div className="cityTextLoader shimmerLoad" />
            <div className="cityCountLoader shimmerLoad" />
          </div>
          <div className="cityStatInnerwrap">
            <div className="cityTextLoader shimmerLoad" />
            <div className="cityCountLoader shimmerLoad" />
          </div>
        </div>
      </div>
    );
  }
  const {
    statsTitle,
    statsAcrossIndia,
    statsAllStatesStats,
    HConfirmed,
    HActive,
    HCured,
    HDeaths,
    LLocation,
    LConfirm,
    LActive,
    LCured,
    LDeaths,
  } = language.stats;
  const {india, states, updated_date} = stats;
  const updateDate = updated_date;
  const {geo_state = ''} = didState;
  const personalState = states[geo_state];
  const statesList = Object.keys(states);
  if(sortKey!='active'){
  statesList.sort((a, b) => states[b][sortKey][0]-states[a][sortKey][0]);
  }
  else{
    statesList.sort((a, b) => states[b]['confirmed'][0]-states[b]['death'][0]-states[b]['cured'][0]-states[a]['confirmed'][0]+states[a]['death'][0]+states[a]['cured'][0]);
  }

  return (
    <div className="covidupdateOuterWrapper" id="stats-section">
      <div className="impactedAreaInfoWrap" />
      <div className="impactedAreaOuterWrapper">
        <p className="impactedAreaheader">{statsTitle}</p>
        {updateDate ? <p className="impactupdateTiming">{updateDate}</p> : null}
      </div>
      <div className="impactedAreaInfoDetail">
        {personalState ? (
          <div className="stateInfo">
            <p className="stateNametxt">{geo_state}</p>
            <div className="NumberofCaseswrapper">
              <div className="totalcasesWrap flex1">
                <p className="totalcasestxt">{HActive}</p>
                <p className="totalcasesNo redclr">{personalState.confirmed[0]-personalState.cured[0]-personalState.death[0]}</p>
                <div className={personalState.confirmed[1] > 0 ? 'newCasesWrap' : 'newCasesWrap vh'}>
                 
                </div>
              </div>
              <div className="totalcasesWrap flex1">
                <p className="totalcasestxt">{HCured}</p>
                <p className="totalcasesNo lightgreenClr">{personalState.cured[0]}</p>
                <div className={personalState.cured[1] > 0 ? 'newCasesWrap' : 'newCasesWrap vh'}>
                  <Image src={GreenArrowPng} width={13} height={13} />
                  <p className="ico12 lightgreenClr padT2">{personalState.cured[1]}</p>
                </div>
              </div>
              </div>  
              <div className="NumberofCaseswrapper">
              <div className="totalcasesWrap flex1">
                <p className="totalcasestxt">{HDeaths}</p>
                <p className="totalcasesNo">{personalState.death[0]}</p>
                <div className={personalState.death[1] > 0 ? 'newCasesWrap' : ' newCasesWrap vh'}>
                  <Image src={BlackArrowPng} width={13} height={13} />
                  <p className="ico12 padT2">{personalState.death[1]}</p>
                </div>
              </div>
              <div className="totalcasesWrap flex1">
                <p className="totalcasestxt">{HConfirmed}</p>
                <p className="totalcasesNo redclr">{personalState.confirmed[0]}</p>
                <div className={personalState.confirmed[1] > 0 ? 'newCasesWrap' : 'newCasesWrap vh'}>
                  <Image src={RedArrowPng} width={13} height={13} />
                  <p className="ico12 redclr padT2">{personalState.confirmed[1]}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="countryImpactWrapper">
          <p className="stateNametxt">{statsAcrossIndia}</p>
          <div className="NumberofCaseswrapper">
            <div className="totalcasesWrap flex1">
              <p className="totalcasestxt">{HActive}</p>
              <p className="totalcasesNo redclr">{india.confirmed[0]-india.cured[0]-india.death[0]}</p>
              <div className={india.confirmed[1] > 0 ? 'newCasesWrap' : 'newCasesWrap vh'}>
               
              </div>
            </div>
            <div className="totalcasesWrap flex1">
              <p className="totalcasestxt">{HCured}</p>
              <p className="totalcasesNo lightgreenClr">{india.cured[0]}</p>
              <div className={india.cured[1] > 0 ? 'newCasesWrap' : 'newCasesWrap vh'}>
                <Image src={GreenArrowPng} width={13} height={13} />
                <p className="ico12 lightgreenClr padT2">{india.cured[1]}</p>
              </div>
            </div>
            </div>
            <div className="NumberofCaseswrapper">
            <div className="totalcasesWrap flex1">
              <p className="totalcasestxt">{HDeaths}</p>
              <p className="totalcasesNo">{india.death[0]}</p>
              <div className={india.death[1] > 0 ? 'newCasesWrap' : 'newCasesWrap vh'}>
                <Image src={BlackArrowPng} width={13} height={13} />
                <p className="ico12 padT2">{india.death[1]}</p>
              </div>
            </div>
            <div className="totalcasesWrap flex1">
              <p className="totalcasestxt">{HConfirmed}</p>
              <p className="totalcasesNo redclr">{india.confirmed[0]}</p>
              <div className={india.confirmed[1] > 0 ? 'newCasesWrap' : 'newCasesWrap vh'}>
                <Image src={RedArrowPng} width={13} height={13} />
                <p className="ico12 redclr padT2">{india.confirmed[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Graph statesList={statesList} />

      <div className="statewiseCalculaterWrap">
        <p className="statecovidHeader">{statsAllStatesStats}</p>

        <div className="covidstateFilterWrapper">
         
          <div className="statColumn" onClick={() =>{setSortKey('active');}} >
            <p className="ico12 fb redclr">{LActive}</p>
          </div>
          <div className="statColumn" onClick={() => setSortKey('cured') }>
            <p className="ico12 fb lightgreenClr">{LCured}</p>
          </div>
          <div className="statColumn" onClick={() => setSortKey('death')}>
            <p className="ico12 fb blackClr">{LDeaths}</p>
          </div>
          <div className="statColumn" onClick={() => setSortKey('confirmed')}>
            <p className="ico12 fb redclr">{LConfirm}</p>
          </div>
        </div>

        {statesList.map(state => {
          const stateData = states[state];
          const {districts = {}} = stateData;
          const districtsList = Object.keys(districts);
          districtsList.sort((a, b) => districts[b].confirmed[0] - districts[a].confirmed[0]);
          return (
            <div className="covidpopulationWrapper">
              <div className="ratedetectionouterWrapper">
                <div className="stateaffectWrapper1">
                  <div className="locationFilter">
                    <p className="ico12 fb blackClr" style='padding-left:15px;'>{state}</p>
                    <div className="ratedetectionWrapper vh">
                      <p className="ico12 fb lightBlueClr padR10">
                        {`${districtsList.length} Districts`}
                      </p>
                      <Image src={BluedropArrowPng} width={20} height={20} className="flipimage" />
                    </div>
                  </div>
                  </div>
                  <div className="stateaffectWrapper">
                  <div className="statColumn">
                    <p className="ico12 fb redclr ">{stateData.confirmed[0]-stateData.cured[0]-stateData.death[0]}</p>
                    <div
                      className={
                        stateData.confirmed[1] > 0
                          ? 'ratedetectionWrapper'
                          : 'ratedetectionWrapper vh'
                      }
                    >
                    
                    </div>
                  </div>

                  <div className="statColumn">
                    <p className="ico12 fb lightgreenClr">{stateData.cured[0]}</p>
                    <div
                      className={
                        stateData.cured[1] > 0 ? 'ratedetectionWrapper' : 'ratedetectionWrapper vh'
                      }
                    >
                      <Image src={GreenArrowPng} width={15} height={15} />
                      <p className="ico12 lightgreenClr padR10">{stateData.cured[1]}</p>
                    </div>
                  </div>

                  <div className="statColumn">
                    <p className="ico12 fb blackClr">{stateData.death[0]}</p>
                    <div
                      className={
                        stateData.death[1] > 0 ? 'ratedetectionWrapper' : 'ratedetectionWrapper vh'
                      }
                    >
                      <Image src={BlackArrowPng} width={15} height={15} />
                      <p className="ico12 blackClr padR10">{stateData.death[1]}</p>
                    </div>
                  </div>
                  <div className="statColumn">
                    <p className="ico12 fb redclr ">{stateData.confirmed[0]}</p>
                    <div
                      className={
                        stateData.confirmed[1] > 0
                          ? 'ratedetectionWrapper'
                          : 'ratedetectionWrapper vh'
                      }
                    >
                      <Image src={RedArrowPng} width={15} height={15} />
                      <p className="ico12 redclr padR10">{stateData.confirmed[1]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
