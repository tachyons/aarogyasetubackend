import {h} from 'preact';
/** @jsx h */
import './media.css';
import {route} from 'preact-router';

import PlayButtonSvg from '../../assets/play_button.svg';

import Image from '../../components/Image';

const VideoComponent = ({data, flags}) => {
  const {lang: langCode} = flags;
  const {type, lang = {}} = data;
  let {url, display_title} = data;
  if (langCode && lang[langCode]) {
    url = lang[langCode].url;
    display_title = lang[langCode].display_title || display_title;
  }
  return (
    <div
      onClick={() => {
        if (type === 'link') {
          window.location.href = url;
          return;
        }
        route(`/ncv19/media/play/?src=${encodeURIComponent(url)}`);
       
      }}
      style={{display: 'flex', flexDirection: 'column', position: 'relative'}}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={data.thumbnail}
          style={{
            height: 'auto',
            borderRadius: 8,
            border: '1px solid #e7e7e7',
          }}
          alt={display_title}
        />
        {type === 'link' ? null : (
          <Image
            alt="play"
            src={PlayButtonSvg}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
            }}
          />
        )}
      </div>
      <p className="smallVideoInfoText">{display_title}</p>
    </div>
  );
};

export default VideoComponent;
