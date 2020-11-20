import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let HomeTrending;

const HomeTrendingLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import('./home-trending')
      .then(({default: homeTrending}) => {
        HomeTrending = homeTrending;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <HomeTrending />;
};

export default HomeTrendingLazyWrapper;
