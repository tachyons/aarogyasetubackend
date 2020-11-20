import {h} from 'preact';
/** @jsx h */
import {useRef} from 'preact/hooks';

const CustomButton = ({selector, value, collect, config, type, possible_values, text, dict}) => {
  const activeRef = useRef(null);
  const onSelection = trigger => {
    if (trigger === 0) {
      collect({type, key: selector, value: config, langValue: dict});
      return;
    }
    if (activeRef.current.classList.contains('active')) {
      dict.splice(config.indexOf(text), 1);
      config.splice(config.indexOf(value), 1);
      activeRef.current.classList.remove('active');
    } else {
      dict.push(text);
      config.push(value);
      activeRef.current.classList.add('active');
    }
    if (config.length) {
      document.getElementById(`0_${type}`).innerText = 'Next';
      document.getElementById(`0_${type}`).classList.add('nextBtn');
    } else if (possible_values) {
        const list = possible_values.filter(({key: selector}) => selector === 0);
        document.getElementById(`0_${type}`).innerText = list?.[0].value;
        document.getElementById(`0_${type}`).classList.remove('nextBtn');
      }
  };
  return (
    <div className="botui-actions-buttons" onClick={() => onSelection(selector)}>
      <button className="botui-actions-buttons-button" ref={activeRef} id={`${selector}_${type}`}>
        {text}
      </button>
    </div>
  );
};

export default CustomButton;
