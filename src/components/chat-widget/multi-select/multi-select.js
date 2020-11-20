import {h} from 'preact';
/** @jsx h */
import {useRef, useState} from 'preact/hooks';

const MultiSelector = ({data, collect, type}) => {
  const activeRef = useRef(null);
  const [config, setConfig] = useState([]);
  const onSelection = value => {
    setConfig(prev => prev.concat([value]));
    activeRef.current.classList.remove('dn');
  };
  const text = config.length ? config.join(', ') : 'None';
  return (
    <div>
      <div className="botui-actions-text-div dn" ref={activeRef}>
        {text}
      </div>
      <div className="countrySelectWrap">
        <select onChange={e => onSelection(e.target.value)}>
          {data.map(({value}) => (
            <option value={value}>{value}</option>
          ))}
        </select>
        <button
          onClick={() => collect({type, value: text, langValue: text})}
          className="botui-actions-text-submit"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default MultiSelector;
