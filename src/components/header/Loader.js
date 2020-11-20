import {h} from 'preact';
/** @jsx h */
import './Loader.css';
import {useContext} from 'preact/hooks';
import ServerDataContext from '@stencil/server-data-context';

const Loader = () => {
  const {show_form} = useContext(ServerDataContext);

  if (show_form) return null;

  return (
    <div>
      <div className="trendingLoaderWrap">
        <div className="headTextLoader shimmerLoad" />
        <div className="bigVideoLoader shimmerLoad" />
        <div className="bigVideoTextLoader shimmerLoad" />
        <div className="smallVideoHomeOuterWrap">
          <div className="smallHomeVideoInnerWrap">
            <div className="smallVideoLoader shimmerLoad" />
            <div className="smallVideoTextLoader shimmerLoad" />
          </div>
          <div className="smallHomeVideoInnerWrap">
            <div className="smallVideoLoader shimmerLoad" />
            <div className="smallVideoTextLoader shimmerLoad" />
          </div>
        </div>
      </div>
      <div className="quote-outerLoader">
        <div className="quoteLineLoader shimmerLoad" />
        <div className="quoteLineLoader shimmerLoad" />
        <div className="quoteLineLoader shimmerLoad" />
        <div className="quoteLastLineLoader shimmerLoad" />
        <div className="quoteInfoLoader">
          <div className="imgLoader shimmerLoad" />
          <div className="infoLoaderWrap">
            <div className="infoNameLoader shimmerLoad" />
            <div className="infoDesginationLoader shimmerLoad" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
