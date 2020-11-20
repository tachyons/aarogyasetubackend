import {h} from 'preact';
/** @jsx h */
import {useRef} from 'preact/hooks';

const UserInput = ({selector, collect, type, inputType}) => {
  const inputRef = useRef(null);
  const onSelection = e => {
    if (!inputRef?.current?.value) return;
    if (e.key === 'Enter') {
      collect({
        key: selector,
        value: inputRef?.current?.value,
        type,
        langValue: inputRef?.current?.value,
      });
    }
  };
  return (
    <div className="botui-actions-text" id={type}>
      <input
        type={inputType}
        ref={inputRef}
        className="botui-actions-text-input"
        required
        value=""
        autoFocus
        onKeyDown={e => onSelection(e)}
      />
      <button
        onClick={onSelection}
        className="botui-actions-text-submit"
        onClick={() => {
          if (!inputRef?.current?.value) return;
          collect({
            key: selector,
            value: inputRef.current.value,
            type,
            langValue: inputRef?.current?.value,
          });
        }}
      >
        Go
      </button>
    </div>
  );
};

export default UserInput;
