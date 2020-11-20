import Status from '../pages/status/status';
import MediaLazyWrapper from '../pages/media/mediaLazyWrapper';
import Stats from '../pages/stats/stats';
import EpassLazyWrapper from '../pages/epass/epass-lazy-wrapper';
import IcmrLazyWrapper from '../pages/icmr/icmr-lazy-wrapper';
import FaqDetail from '../pages/faq-detail/faqDetail';
import MoreVideosLazyWrapper from '../pages/media/MoreVideos-lazy-wrapper';
import VideoIFrame from '../pages/media/VideoIFrame';
import ChatForm from '../pages/chat-form/chat-form';
import Chat from '../pages/chat-form/chat';
import AccountDelete from '../pages/account-delete/AccountDelete';
import HospitalLazyWrapper from '../pages/hospital/hospital-lazy-wrapper';

const SetuRoutes = [
  {
    path: '/ncv19/media/see-all/',
    component: MoreVideosLazyWrapper,
    key: 'more-videos',
  },
  {
    path: '/ncv19/media/play/',
    component: VideoIFrame,
    key: 'play-video',
  },
  {
    path: '/ncv19/media/',
    component: MediaLazyWrapper,
    key: 'mediapage',
  },
  {
    path: '/ncv19/stats/',
    component: Stats,
    key: 'stats',
  },
  {
    path: '/ncv19/epass/',
    component: EpassLazyWrapper,
    key: 'epass',
  },
  {
    path: '/ncv19/icmr/',
    component: IcmrLazyWrapper,
    key: 'icmr',
  },
  {
    path: '/ncv19/faq/',
    component: FaqDetail,
    key: 'faq-detail',
  },
  {
    path: '/ncv19/',
    component: Status,
    key: 'status',
    showHeader: true,
  },
  {
    path: '/ncv19/chat-form/',
    component: ChatForm,
    key: 'chat',
  },
  {
    path: '/ncv19/chat/',
    component: Chat,
    key: 'chat',
  },
  {
    path: '/ncv19/account-delete/',
    component: AccountDelete,
    key: 'account-delete',
  },
  {
    path: '/ncv19/hospital/',
    component: HospitalLazyWrapper,
    key: 'hospital',
  },
];

export default SetuRoutes;
