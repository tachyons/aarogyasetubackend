import {h} from 'preact';
import {useContext} from 'preact/hooks';
/** @jsx h */
import './media.css';

import ServerDataContext from '@stencil/server-data-context';
import mediaConfig from './mediaConfig';
import mediaConfigHome from './mediaConfigHome';

import VideoComponent from './VideoComponent';

import ArrowBackPng from '../../assets/arrow-back.png';

import Image from '../../components/Image';

const MoreVideos = () => {
  const {flags, language} = useContext(ServerDataContext);

  let sectionIndex = null;
  let sourcePage = 'media';
  if (
    typeof window !== 'undefined' &&
    window.location.search &&
    window.location.search.length > 0
  ) {
    const searchParams = new URLSearchParams(window.location.search);
    sectionIndex = searchParams.get('sectionIndex');
    sourcePage = searchParams.get('sourcePage');
  }

  let section = null;
  if (sourcePage === 'home') {
    section = mediaConfigHome(language);
  } else {
    section = mediaConfig(language).sections[sectionIndex];
  }

  const {data, display_title: title} = section;

  return (
    <div className="mediaContentContainer">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflowY: 'scroll',
          height: '100vh',
        }}
      >
        <div className="mediaContentHeader">
          <Image
            onClick={() => {
              
              history.back();
            }}
            src={ArrowBackPng}
            style={{
              position: 'absolute',
              left: 20,
              top: 12,
              width: 20,
              height: 20,
            }}
          />
          <span
            style={{
              display: 'flex',
              fontSize: 16,
              color: 'rgb(36, 40, 51)',
              fontWeight: 'bold',
            }}
          >
            {title}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            marginTop: 64,
            width: '100%',
          }}
        >
          {data.map((media, index) => {
            const width = 100;
            return (
              <div
                key={`videComponentWrapper${index}`}
                style={{maxWidth: `${width}%`, width: `${width}%`, padding: 8}}
              >
                <VideoComponent data={media} flags={flags} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoreVideos;
