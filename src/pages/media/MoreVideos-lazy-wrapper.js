import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let MoreVideos;

const MoreVideosLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import( './MoreVideos')
      .then(({default: moreVideos}) => {
        MoreVideos = moreVideos;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <MoreVideos />;
};

export default MoreVideosLazyWrapper;
