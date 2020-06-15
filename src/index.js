const UAParser = require("../node_modules/ua-parser-js/dist/ua-parser.min");
const { BROWSER_TYPES, OS_TYPES, DEVICE_TYPES } = require("./constants");
const {
  checkType,
  broPayload,
  mobilePayload,
  wearPayload,
  consolePayload,
  stvPayload,
  getNavigatorInstance,
  isIOS13Check
} = require("./utils")

const UA = new UAParser();

const browser = UA.getBrowser();
const device = UA.getDevice();
const engine = UA.getEngine();
const os = UA.getOS();
const ua = UA.getUA();

const {
  CHROME,
  CHROMIUM,
  IE,
  INTERNET_EXPLORER,
  OPERA,
  FIREFOX,
  SAFARI,
  EDGE,
  YANDEX,
  MOBILE_SAFARI
} = BROWSER_TYPES;
const { MOBILE, TABLET, SMART_TV, BROWSER, WEARABLE, CONSOLE } = DEVICE_TYPES;
const { ANDROID, WINDOWS_PHONE, IOS, WINDOWS, MAC_OS } = OS_TYPES;

const isMobileType = () => device.type === MOBILE;
const isTabletType = () => device.type === TABLET;

const isMobileAndTabletType = () => {
  switch (device.type) {
    case MOBILE:
    case TABLET:
      return true;
    default:
      return false;
  }
};

const isEdgeChromiumType = () => {
  if (os.name === OS_TYPES.WINDOWS && os.version === '10') {
    return typeof ua === 'string' && ua.indexOf('Edg/') !== -1;
  }

  return false;
};

const isSmartTVType = () => device.type === SMART_TV;
const isBrowserType = () => device.type === BROWSER;
const isWearableType = () => device.type === WEARABLE;
const isConsoleType = () => device.type === CONSOLE;
const isAndroidType = () => os.name === ANDROID;
const isWindowsType = () => os.name === WINDOWS;
const isMacOsType = () => os.name === MAC_OS;
const isWinPhoneType = () => os.name === WINDOWS_PHONE;
const isIOSType = () => os.name === IOS;
const isChromeType = () => browser.name === CHROME;
const isFirefoxType = () => browser.name === FIREFOX;
const isChromiumType = () => browser.name === CHROMIUM;
const isEdgeType = () => browser.name === EDGE;
const isYandexType = () => browser.name === YANDEX;
const isSafariType = () =>
  browser.name === SAFARI || browser.name === MOBILE_SAFARI;

const isMobileSafariType = () => browser.name === MOBILE_SAFARI;
const isOperaType = () => browser.name === OPERA;
const isIEType = () =>
  browser.name === INTERNET_EXPLORER || browser.name === IE;

const isElectronType = () => {
  const nav = getNavigatorInstance();
  const ua = nav && nav.userAgent.toLowerCase();

  return typeof ua === 'string' ? /electron/.test(ua) : false;
};

const getIOS13 = () => {
  const nav = getNavigatorInstance();
  return (
    nav &&
    (/iPad|iPhone|iPod/.test(nav.platform) || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1)) &&
    !window.MSStream
  );
};

const getIPad13 = () => isIOS13Check('iPad');
const getIphone13 = () => isIOS13Check('iPhone');
const getIPod13 = () => isIOS13Check('iPod');

const getBrowserFullVersion = () => browser.major;
const getBrowserVersion = () => browser.version;
const getOsVersion = () => (os.version ? os.version : "none");
const getOsName = () => (os.name ? os.name : "none");
const getBrowserName = () => browser.name;
const getMobileVendor = () => (device.vendor ? device.vendor : "none");
const getMobileModel = () => (device.model ? device.model : "none");
const getEngineName = () => engine.name;
const getEngineVersion = () => engine.version;
const getUseragent = () => ua;
const getDeviceType = () => device.type;

const isSmartTV = isSmartTVType();
const isConsole = isConsoleType();
const isWearable = isWearableType();
const isMobileSafari = isMobileSafariType() || getIPad13();
const isChromium = isChromiumType();
const isMobile = isMobileAndTabletType() || getIPad13();
const isMobileOnly = isMobileType();
const isTablet = isTabletType() || getIPad13();
const isBrowser = isBrowserType();
const isAndroid = isAndroidType();
const isWinPhone = isWinPhoneType();
const isIOS = isIOSType() || getIPad13();
const isChrome = isChromeType();
const isFirefox = isFirefoxType();
const isSafari = isSafariType();
const isOpera = isOperaType();
const isIE = isIEType();
const osVersion = getOsVersion();
const osName = getOsName();
const fullBrowserVersion = getBrowserFullVersion();
const browserVersion = getBrowserVersion();
const browserName = getBrowserName();
const mobileVendor = getMobileVendor();
const mobileModel = getMobileModel();
const engineName = getEngineName();
const engineVersion = getEngineVersion();
const getUA = getUseragent();
const isEdge = isEdgeType() || isEdgeChromiumType();
const isYandex = isYandexType();
const deviceType = getDeviceType();
const isIOS13 = getIOS13();
const isIPad13 = getIPad13();
const isIPhone13 = getIphone13();
const isIPod13 = getIPod13();
const isElectron = isElectronType();
const isEdgeChromium = isEdgeChromiumType();
const isLegacyEdge = isEdgeType();
const isWindows = isWindowsType();
const isMacOs = isMacOsType();

const type = checkType(device.type);

function deviceDetect () {
  const {
    isBrowser,
    isMobile,
    isTablet,
    isSmartTV,
    isConsole,
    isWearable
  } = type;
  if (isBrowser) {
    return broPayload(isBrowser, browser, engine, os, ua);
  }

  if (isSmartTV) {
    return stvPayload(isSmartTV, engine, os, ua);
  }

  if (isConsole) {
    return consolePayload(isConsole, engine, os, ua);
  }

  if (isMobile) {
    return mobilePayload(type, device, os, ua);
  }

  if (isTablet) {
    return mobilePayload(type, device, os, ua);
  }

  if (isWearable) {
    return wearPayload(isWearable, engine, os, ua);
  }
};

module.exports = {
  deviceDetect,
  isSmartTV,
  isConsole,
  isWearable,
  isMobileSafari,
  isChromium,
  isMobile,
  isMobileOnly,
  isTablet,
  isBrowser,
  isAndroid,
  isWinPhone,
  isIOS,
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  osVersion,
  osName,
  fullBrowserVersion,
  browserVersion,
  browserName,
  mobileVendor,
  mobileModel,
  engineName,
  engineVersion,
  getUA,
  isEdge,
  isYandex,
  deviceType,
  isIOS13,
  isIPad13,
  isIPhone13,
  isIPod13,
  isElectron,
  isEdgeChromium,
  isLegacyEdge,
  isWindows,
  isMacOs
};
