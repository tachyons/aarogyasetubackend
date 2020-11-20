import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let Icmr;

const HospitalLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import( './index')
      .then(({default: icmr}) => {
        Icmr = icmr;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <Icmr />;
};

export default HospitalLazyWrapper;
