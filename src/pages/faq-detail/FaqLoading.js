import {h} from 'preact';
/** @jsx h */
import './faqDetail.css';

const FaqLoading = () => {
  return (
    <div>
      {['first', 'second', 'third'].map(size => (
        <div className={`faq-placeholder-block faq-placeholder-block-${size}  shimmerLoad`} />
      ))}
    </div>
  );
};

export default FaqLoading;
