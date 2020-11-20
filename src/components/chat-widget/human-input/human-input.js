import {h} from 'preact';
/** @jsx h */

const HumanInput = ({message}) => (
  <div className="botui-message-content humanView text">
    <span>{message}</span>
  </div>
);

export default HumanInput;
