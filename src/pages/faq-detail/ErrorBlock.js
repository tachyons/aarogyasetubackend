import {h} from 'preact';
/** @jsx h */

const ErrorBlock = ({onRetry, other}) => {
  const {errorMsg, tryAgain} = other;
  return (
    <div className="faq-error-block">
      <span className="faq-error-msg">{errorMsg}</span>
      <span onClick={onRetry} className="faq-error-cta">
        {tryAgain}
      </span>
    </div>
  );
};

export default ErrorBlock;
