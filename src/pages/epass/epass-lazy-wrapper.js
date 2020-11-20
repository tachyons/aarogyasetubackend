import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let Epass;

const EpassLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import('./epass')
      .then(({default: epass}) => {
        Epass = epass;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <Epass />;
};

export default EpassLazyWrapper;
