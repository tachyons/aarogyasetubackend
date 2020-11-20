import {h, Fragment} from 'preact';
import {useContext} from 'preact/hooks';
import ServerDataContext from '@stencil/server-data-context';
import './update-app-popup.css';
/** @jsx h */

export default function UpdateAppPopup() {
  const {flags} = useContext(ServerDataContext);
  const {showAppUpdatePop} = flags;

  if (!showAppUpdatePop) {
    return null;
  }
  return (
    <Fragment>
      <div class="popOverlayNew"></div>
      <div class="popContentWrap">
        <div class="popContentInnerWrap">
          <div class="headeTextWrap">
            <p>Update Aarogya Setu?</p>
          </div>
          <div class="popInfoTextWrap">
            <p>Aarogya setu recommends that you update to the latest version.</p>
          </div>
          <div class="popBtnWrapper">
            <a
              href="https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en"
              class="btnUpdate"
            >
              Update
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
