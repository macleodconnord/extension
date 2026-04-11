export function $helperbird_i18n(params, replace = null) {
  return typeof browser !== 'undefined'
    ? browser.i18n.getMessage(params, replace)
    : chrome.i18n.getMessage(params, replace);
}

export function getBrowser() {
  if (isFirefox()) return 'firefox';
  if (isEdge()) return 'edge';
  if (isChrome()) return 'chrome';
  if (isSafari()) return 'safari';
  return 'chrome';
}

export function isFirefox(agent) {
  const userAgent = agent || navigator.userAgent;
  return /firefox/i.test(userAgent);
}

export function isEdge(agent) {
  const userAgent = agent || navigator.userAgent;
  return /Edg/i.test(userAgent);
}

export function isSafari(agent) {
  const userAgent = agent || navigator.userAgent;
  return /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
}

export function isChrome(agent, vendor) {
  const userAgent = agent || navigator.userAgent;
  const vendorAgent = vendor || navigator.vendor;
  return /Chrome/.test(userAgent) && /Google Inc/.test(vendorAgent);
}

export function isEmpty(value) {
  return value == null || value === '';
}
