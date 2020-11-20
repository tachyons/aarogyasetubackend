export default async function triggerWebviewRefresh() {
  if (window.JSMobileCrm && window.JSMobileCrm.refreshWebView) {
    window.JSMobileCrm.refreshWebView();
  }

  if (window.webkit && window.webkit.messageHandlers.refreshWebView) {
    window.webkit.messageHandlers.refreshWebView.postMessage(null);
  }
}
