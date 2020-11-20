import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let PmCares;

const PmCaresLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import('./pmCares')
      .then(({default: pmCares}) => {
        PmCares = pmCares;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <PmCares />;
};

export default PmCaresLazyWrapper;
