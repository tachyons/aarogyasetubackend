import getAndroidContacts from './get-android-contact';
import getIOSContacts from './get-ios-contact';

export default async function getContacts() {
  if (window.JSMobileCrm && window.JSMobileCrm.getUniqueBluetoothContacts) {
    return await getAndroidContacts();
  }

  if (window.webkit && window.webkit.messageHandlers.getContact) {
    return await getIOSContacts();
  }

  return 0;
}
