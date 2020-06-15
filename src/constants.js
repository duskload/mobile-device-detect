const DEVICE_TYPES = {
  MOBILE: "mobile",
  TABLET: "tablet",
  SMART_TV: "smarttv",
  CONSOLE: "console",
  WEARABLE: "wearable",
  BROWSER: undefined
};

const BROWSER_TYPES = {
  CHROME: "Chrome",
  FIREFOX: "Firefox",
  OPERA: "Opera",
  YANDEX: "Yandex",
  SAFARI: "Safari",
  INTERNET_EXPLORER: "Internet Explorer",
  EDGE: "Edge",
  CHROMIUM: "Chromium",
  IE: "IE",
  MOBILE_SAFARI: "Mobile Safari",
  EDGE_CHROMIUM: "Edge Chromium"
};

const OS_TYPES = {
  IOS: "iOS",
  ANDROID: "Android",
  WINDOWS_PHONE: "Windows Phone",
  WINDOWS: "Windows",
  MAC_OS: "Mac OS"
};

const defaultData = {
  isMobile: false,
  isTablet: false,
  isBrowser: false,
  isSmartTV: false,
  isConsole: false,
  isWearable: false
};

module.exports = { BROWSER_TYPES, DEVICE_TYPES, OS_TYPES, defaultData };
