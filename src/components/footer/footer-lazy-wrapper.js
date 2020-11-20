import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
/** @jsx h */

let Footer;

const FooterLazyWrapper = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import('./footer')
      .then(({default: footer}) => {
        Footer = footer;
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return;

  return <Footer />;
};

export default FooterLazyWrapper;
