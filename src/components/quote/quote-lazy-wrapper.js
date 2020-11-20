import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let Quote;

const QuoteLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import('./quote')
      .then(({default: quote}) => {
        Quote = quote;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <Quote />;
};

export default QuoteLazyWrapper;
