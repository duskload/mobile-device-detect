const UAParser = require("../node_modules/ua-parser-js/dist/ua-parser.min");
const {
  BROWSER_TYPES,
  OS_TYPES,
  DEVICE_TYPES,
  defaultData
} = require("./constants");

const UA = new UAParser();

const browser = UA.getBrowser();
const cpu = UA.getCPU();
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
const { ANDROID, WINDOWS_PHONE, IOS } = OS_TYPES;

export const checkType = type => {
  switch (type) {
    case MOBILE:
      return { isMobile: true };
    case TABLET:
      return { isTablet: true };
    case SMART_TV:
      return { isSmartTV: true };
    case CONSOLE:
      return { isConsole: true };
    case WEARABLE:
      return { isWearable: true };
    case BROWSER:
      return { isBrowser: true };
    default:
      return defaultData;
  }
};

export const getCurrentBrowser = name => {
  switch (name) {
    case CHROME:
    case FIREFOX:
    case OPERA:
    case YANDEX:
    case SAFARI:
    case IE:
    case EDGE:
    case CHROMIUM:
      return true;
    default:
      return false;
  }
};

export const broPayload = (isBrowser, browser, engine, os, ua) => {
  return {
    isBrowser,
    browserMajorVersion: browser.major,
    browserFullVersion: browser.version,
    browserName: browser.name,
    engineName: engine.name || false,
    engineVersion: engine.version,
    osName: os.name,
    osVersion: os.version,
    userAgent: ua
  };
};

export const mobilePayload = (type, device, os, ua) => {
  return {
    ...type,
    vendor: device.vendor,
    model: device.model,
    os: os.name,
    osVersion: os.version,
    ua: ua
  };
};

export const stvPayload = (isSmartTV, engine, os, ua) => {
  return {
    isSmartTV,
    engineName: engine.name,
    engineVersion: engine.version,
    osName: os.name,
    osVersion: os.version,
    userAgent: ua
  };
};

export const consolePayload = (isConsole, engine, os, ua) => {
  return {
    isConsole,
    engineName: engine.name,
    engineVersion: engine.version,
    osName: os.name,
    osVersion: os.version,
    userAgent: ua
  };
};

export const wearPayload = (isWearable, engine, os, ua) => {
  return {
    isWearable,
    engineName: engine.name,
    engineVersion: engine.version,
    osName: os.name,
    osVersion: os.version,
    userAgent: ua
  };
};

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

const isSmartTVType = () => device.type === SMART_TV;
const isBrowserType = () => device.type === BROWSER;
const isWearableType = () => device.type === WEARABLE;
const isConsoleType = () => device.type === CONSOLE;
const isAndroidType = () => os.name === ANDROID;
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

const isSmartTV = isSmartTVType();
const isConsole = isConsoleType();
const isWearable = isWearableType();
const isMobileSafari = isMobileSafariType();
const isChromium = isChromiumType();
const isMobile = isMobileAndTabletType();
const isMobileOnly = isMobileType();
const isTablet = isTabletType();
const isBrowser = isBrowserType();
const isAndroid = isAndroidType();
const isWinPhone = isWinPhoneType();
const isIOS = isIOSType();
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
const isEdge = isEdgeType();
const isYandex = isYandexType();

const type = checkType(device.type);

export default () => {
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
  isYandex
};
