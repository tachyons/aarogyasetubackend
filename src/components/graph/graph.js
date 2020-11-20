import {h, Fragment} from 'preact';
/** @jsx h */
import {useState, useEffect, useContext} from 'preact/hooks';
import LineChart from '../line-chart/line-chart';
import './graph.css';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';

import ConfigFromEnv from '@stencil/config-from-env';


const Graph = ({statesList}) => {
  const [selected, setSelected] = useState('India');
  const [timeseries, setTimeseries] = useState();
  const [category, setCategory] = useState('confirm');
  const [timeseriesData, setTimeseriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [graphType, setGraphType] = useState(1);
  const [selectedCurrentDay, setSelectedCurrentDay] = useState(-1);
  const {language} = useContext(ServerDataContext);
  const {headers} = useContext(ClientDataContext);

  useEffect(() => {
    if (!timeseriesData[selected]) {
      setLoading(true);
      fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/get-stats?v=1&cache=${selected}`, {
        headers: {
          Authorization: headers.Authorization,
          pt: headers.pt,
          ver: headers.ver,
          key: selected,
        },
      })
        .then(response => response.json())
        .then(data => {
          function parseData(item, index, list) {
            const [time, value] = item;
            const [yyyy, mm, dd] = time.split('-');
            const currentValue = parseInt(value);
            const previousItem = list[index - 1] || list[index];
            const previousValue = parseInt(previousItem[1]);

            return [new Date(yyyy, mm - 1, dd), parseInt(value), currentValue - previousValue];
          }
          if (!data) {
         
            return;
          }
       
          const {confirm, cured, death} = data;
          const active=[];
           for(let i=0;i<=confirm.length-1;i++)
           {
             active.push([confirm[i][0],(parseInt(confirm[i][1])-parseInt(cured[i][1])-parseInt(death[i][1]))]);
           }
         
          
          const newData = {
            confirm: confirm.map(parseData).sort((a, b) => a[0] - b[0]),
            cured: cured.map(parseData).sort((a, b) => a[0] - b[0]),
            death: death.map(parseData).sort((a, b) => a[0] - b[0]),
            active: active.map(parseData).sort((a, b) => a[0] - b[0])
          };
          timeseriesData[selected] = newData;
          setTimeseries(newData);
          setTimeseriesData({...timeseriesData, [selected]: newData});
          setLoading(false);
        });
    } else {
      setTimeseries(timeseriesData[selected]);
    }
  }, [selected]);

  let color = {
    bg: 'rgba(240, 99, 114, 0.2)',
    text: 'rgb(240, 99, 114)',
    loaderClass: 'loaderBackConfirm',
  };

  const {
    HConfirmed,
    HActive,
    HCured,
    HDeaths,
    graphTitle = 'Cases Over Time',
    cumulative,
    daily,
  } = language.stats;
  let selectedCategoryLabel = HConfirmed;
  switch (category) {
    case 'active':
      color = {
        bg: 'rgba(240, 99, 114, 0.2)',
    text: 'rgb(240, 99, 114)',
        loaderClass: 'loaderBackRecover',
      };
      selectedCategoryLabel = HActive;
      break;
    case 'cured':
      color = {
        bg: 'rgb(239,248,247)',
        text: 'rgb(36,153,149)',
        loaderClass: 'loaderBackRecover',
      };
      selectedCategoryLabel = HCured;
      break;

    case 'death':
      color = {
        bg: 'rgb(246,246,246)',
        text: 'rgb(74,74,74)',
        loaderClass: 'loaderBackDecease',
      };
      selectedCategoryLabel = HDeaths;
      break;

    default:
  }

  const currentValue = timeseries
    ? timeseries[category].slice(selectedCurrentDay)[0][graphType]
    : 0;
  const dayMinusOne = timeseries
    ? timeseries[category].slice(selectedCurrentDay - 1)[0][graphType]
    : 0;
  const delta = currentValue - dayMinusOne;

  return (
    <div className="graph-outer">
      <div className="graph-title">
        <span>{graphTitle}</span>
      </div>
      <div className="graph-selector">
        <div className="select-wrapper">
          <select className="graph-select" onChange={event => setSelected(event.target.value)}>
            <option value="India">India</option>
            {statesList.map(state => (
              <option value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="chart-outer confirmBack" style={{backgroundColor: color.bg}}>
        <ul className="cahartNav">
          <li className={category === 'active' ? 'active' : ''} onClick={() => setCategory('active')}>
            {HActive}
          </li>
          <li className={category === 'cured' ? 'active' : ''} onClick={() => setCategory('cured')}>
            {HCured}
          </li>
          
        </ul>
        <ul className="cahartNav">
        <li className={category === 'death' ? 'active' : ''} onClick={() => setCategory('death')}>
            {HDeaths}
          </li>
          <li className={category === 'confirm' ? 'active' : ''} onClick={() => setCategory('confirm')}>
            {HConfirmed}
          </li>
        </ul>
        {loading ? (
          <div className="loaderWrap">
            <div className={`linePreloader ${color.loaderClass}`} />
          </div>
        ) : (
          <Fragment>
            <div className="chart-count">
              {timeseries ? (
                <Fragment>
                  <div className="countWrap">
                    <p className="countTextMain confirmedText" style={{color: color.text}}>
                      {currentValue}
                    </p>
                    {delta > 0 ? (
                      <p className="countTextSub confirmedText" style={{color: color.text}}>
                        +
                        {delta}
                        {' '}
                        (
                        {((delta / dayMinusOne) * 100).toFixed(2)}
                        %)
                      </p>
                    ) : null}
                  </div>
                  <div className="countInfoText">
                    {timeseries[category].slice(selectedCurrentDay)[0][0].toDateString()}
                  </div>
                </Fragment>
              ) : null}
            </div>
            <LineChart
              setSelectedCurrentDay={setSelectedCurrentDay}
              data={(timeseries || {})[category] || []}
              category={category}
              area={selected}
              color={color}
              type={graphType}
            />
          </Fragment>
        )}
      </div>
      <div className="graphToggle">
        <p className={graphType === 1 ? 'activeText marginML20' : 'disabledText marginML20'}>
          {cumulative}
        </p>
        <input
          id="normal-toggle"
          type="checkbox"
          className="itoggle"
          onClick={() => setGraphType(graphType === 1 ? 2 : 1)}
        />
        <label htmlFor="normal-toggle" />
        <p className={graphType === 2 ? 'activeText' : 'disabledText'}>{daily}</p>
      </div>
    </div>
  );
};

export default Graph;
