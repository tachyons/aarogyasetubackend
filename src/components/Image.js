import {h} from 'preact';
/** @jsx h */
import {useState, useRef, useEffect} from 'preact/hooks';
import {getIntersectionObserverInstance} from '@stencil/intersection-observer';

const Image = props => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    src,
    alt = '',
    fallback = '',
    className,
    style = {},
    onClick = () => {},
    width,
    height,
  } = props;
  const sourceRef = useRef();
  const [error, setOnError] = useState(false);

  const imagePlaceholder =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  let observer = '';
  const IntersectionObserver = getIntersectionObserverInstance();

  useEffect(() => {
    if (IntersectionObserver) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
         if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(entry.target);
          }
        });
      }, options);
    }

    if (observer) observer.observe(sourceRef.current);

    return () => {
      if (observer && observer.current) observer.current.disconnect();
    };
  }, []);

  if (error) return <img ref={sourceRef} {...props} src={fallback} alt={alt} />;

  return (
    <img
      width={width}
      height={height}
      ref={sourceRef}
      src={IntersectionObserver ? (isVisible ? src : imagePlaceholder) : src}
      alt={alt}
      className={className}
    
      onError={() => {
        setOnError(true);
      }}
      data-testid={props['data-testid'] || ''}
      style={{...style}}
      onClick={onClick}
    />
  );
};

export default Image;
