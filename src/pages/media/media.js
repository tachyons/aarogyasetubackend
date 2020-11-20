import {h, Fragment} from 'preact';
/** @jsx h */
import {useContext} from 'preact/hooks';
import {route} from 'preact-router';
import ServerDataContext from '@stencil/server-data-context';
import './media.css';
import mediaConfig from './mediaConfig';

import VideoComponent from './VideoComponent';

import Image from '../../components/Image';

import blueRightPng from '../../assets/blue-right.png';

const homePageStyles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  videoWrapper: {},
};

const mediaPageStyles = {
  container: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    maxWidth: `100%`,
    overflowX: 'scroll',
    scrollSnapType: 'x mandatory',
  },
  videoWrapper: {
    justifySelf: 'stretch',
    scrollSnapAlign: 'center',
  },
};

function SectionRow({items, maxColumns, maxItemsToShow, sourcePage}) {
  const {flags} = useContext(ServerDataContext);
  let displayItems;
  let styles;
  if (sourcePage === 'home') {
    styles = homePageStyles;
    displayItems = items.filter((e, i) => i < maxItemsToShow);
  } else {
    styles = mediaPageStyles;
    displayItems = items;
  }

  return (
    <div style={styles.container}>
      {displayItems.map((mediaItem, index) => {
        if (Array.isArray(mediaItem)) {
          return (
            <SectionRow maxColumns={maxColumns} items={mediaItem} maxItemsToShow={maxItemsToShow} />
          );
        }
        const width = (mediaItem.colspan / maxColumns) * 100;
        const hasPrev = typeof displayItems[index - 1] === 'object';
        const hasNext = typeof displayItems[index + 1] === 'object';
        const paddingLeft = hasPrev ? 4 : 0;
        const paddingRight = hasNext ? 4 : 0;
        let cardWidth;
        if (width === 100 && sourcePage === 'media' && displayItems.length > 1) {
          cardWidth = `calc(${width}% - 40px)`;
        } else {
          cardWidth = `${width}%`;
        }
        return (
          <div
            style={{
              maxWidth: cardWidth,
              minWidth: cardWidth,
              width: cardWidth,
              paddingRight,
              paddingLeft,
              paddingTop: 20,
              ...styles.videoWrapper,
            }}
          >
            <VideoComponent data={mediaItem} flags={flags} />
          </div>
        );
      })}
    </div>
  );
}

export function SectionComponent({
  section,
  sectionIndex,
  maxColumns,
  showBorder = true,
  noPadding = false,
  sourcePage = 'media',
}) {
  const {language} = useContext(ServerDataContext);
  const {id, items_in_master_list: maxItemsToShow, display_title: header, data} = section;
  let hasMore;
  if (id !== 'trending' && maxItemsToShow) {
    hasMore = maxItemsToShow < data.length;
  } else {
    hasMore = false;
  }

  const viewMore = () => {
    if (!hasMore) {
      return;
    }

    route(`/ncv19/media/see-all/?sourcePage=${sourcePage}&sectionIndex=${sectionIndex}`);
  };
  const {seeAll} = language.mediaTab;
  return (
    <div
      className="trendingInnerWrap"
      style={{
        ...(showBorder ? {} : {borderBottom: 'none'}),
        ...(noPadding ? {padding: 0} : {}),
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="trendingHeadText">{header}</span>
      </div>
      <SectionRow
        items={data}
        maxColumns={maxColumns}
        maxItemsToShow={maxItemsToShow}
        sourcePage={sourcePage}
      />
      {typeof window !== 'undefined' && hasMore && (
        <div className="seeAllWrap" onClick={viewMore}>
          <p>{seeAll}</p>
          <Image src={blueRightPng} alt="right arrow" />
        </div>
      )}
    </div>
  );
}

const Media = () => {
  const {language} = useContext(ServerDataContext);

  return (
    <Fragment>
      <div className="mediaMainOuterWrap">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100vw',
            height: 'calc(100vh - 86px)', // 86px is header height
            overflowY: 'scroll',
          }}
        >
          {mediaConfig(language).sections.map((section, index) => (
            <SectionComponent
              sectionIndex={index}
              section={section}
              maxColumns={mediaConfig(language).maxColumns}
              sourcePage="media"
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Media;
