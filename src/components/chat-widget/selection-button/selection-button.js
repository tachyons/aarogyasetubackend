import {h} from 'preact';
/** @jsx h */
import {useRef} from 'preact/hooks';

const SelectionButtons = ({selector, value, collect, type, text}) => {
  const activeRef = useRef(null);
  const onSelection = () => {
    activeRef.current.classList.add('active');
    collect({type, key: selector, value, langValue: text});
  };
  return (
    <div onClick={onSelection} id={type} className="selectBtnWrap">
      <input type="radio" ref={activeRef} name={type} className="botui-actions-buttons-button" />
      <label>{text}</label>
    </div>
  );
};

export default SelectionButtons;
