import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let UsefulResources;

const UsefulResourcesLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import( './usefulResources')
      .then(({default: usefulResources}) => {
        UsefulResources = usefulResources;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <UsefulResources />;
};

export default UsefulResourcesLazyWrapper;
