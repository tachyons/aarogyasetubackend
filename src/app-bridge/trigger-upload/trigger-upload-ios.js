export default async function triggerIOSUpload() {
  window.webkit.messageHandlers.askForUpload.postMessage(null);
}
