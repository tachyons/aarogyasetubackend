import {h} from 'preact';
/** @jsx h */

const BotMessage = ({message}) => {
  return (
    <div className="botui-message-content text">
      <span dangerouslySetInnerHTML={{__html: message}} />
    </div>
  );
};

export default BotMessage;
