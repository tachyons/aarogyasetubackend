import {h} from 'preact';
import {useRef} from 'preact/hooks';
/** @jsx h */

import Image from '../../components/Image';

import CloseIconPng from '../../assets/closeIcon.png';

const VideoIFrame = () => {
  let src = '';
  if (
    typeof window !== 'undefined' &&
    window.location.search &&
    window.location.search.length > 0
  ) {
    const searchParams = new URLSearchParams(window.location.search);
    src = searchParams.get('src');
  }

  const closeModal = () => {
    history.back();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <div className="mediaOverlay" onClick={closeModal} />
      <div className="mediaPopUp">
        <div className="popCloseWrap">
          <div className="closeIconWrap" onClick={closeModal}>
            <Image src={CloseIconPng} alt="close" />
          </div>
        </div>
        <div className="popVideoWrap">
          <div style={{width: '100%', display: 'flex'}}>
            <iframe
              width="100%"
              height="400px"
              src={src}
              frameBorder="0"
              allowFullScreen
              title="info video"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoIFrame;
