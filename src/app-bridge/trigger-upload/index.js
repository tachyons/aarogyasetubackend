import triggerAndroidUpload from './trigger-upload-android';
import triggerIOSUpload from './trigger-upload-ios';

export default async function triggerUpload() {
  if (window.JSMobileCrm && window.JSMobileCrm.triggerUpload) {
    return await triggerAndroidUpload();
  }

  if (window.webkit && window.webkit.messageHandlers.askForUpload) {
    return await triggerIOSUpload();
  }
}
