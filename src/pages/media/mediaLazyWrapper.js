import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let Media;

const MediaLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import( '../../pages/media/media')
      .then(({default: media}) => {
        Media = media;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <Media />;
};

export default MediaLazyWrapper;
