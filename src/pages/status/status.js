import {useState, useContext, useEffect} from 'preact/hooks';
import {h} from 'preact';
/** @jsx h */
import './status.css';

import ServerDataContext from '@stencil/server-data-context';
import HotSpot from '../../components/hot-spot/hotSpot';
import HomeTrendingLazyWrapper from '../../components/home-trending/home-trending-lazy-wrapper';
import Quote from '../../components/quote/quote';
import PmCares from '../../components/pm-cares/pmCares';
import Footer from '../../components/footer/footer';
import UsefulResources from '../../components/useful-resources/usefulResources';
import FaqHome from '../../components/faq/faqHome';
import PolicyUpdate from '../policy-update/policyUpdate';
import UserStatus from '../../components/UserStatus/UserStatus';
import UpdateAppPopup from '../../components/UpdateAppPopup/UpdateAppPopup';
import ChatForm from '../chat-form/chat-form';

let userRegistrationFlowGlobalFlag = true;

const Status = () => {
  const {userFormConfig} = useContext(ServerDataContext);
  const [userRegistrationFlow, setUserRegistrationFlow] = useState(!!userFormConfig);

  if (userRegistrationFlow && userRegistrationFlowGlobalFlag) {
    return (
      <ChatForm
        setUserRegistrationFlow={newFlag => {
          setUserRegistrationFlow(newFlag);
          userRegistrationFlowGlobalFlag = newFlag;
        }}
      />
    );
  }
  return (
    <div>
      <UserStatus />
      <HotSpot />
      <HomeTrendingLazyWrapper />
      <UsefulResources />
      <Quote />
      <PmCares />
      <FaqHome />
      <Footer />
      <PolicyUpdate />
      <UpdateAppPopup />
    </div>
  );
};

export default Status;
