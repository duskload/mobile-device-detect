import { DeviceTypes, InitialDeviceTypes, BrowserTypes } from '../constants';
import { setUa } from '../parse';

export const checkDeviceType = (type) => {
    switch (type) {
        case DeviceTypes.Mobile:
            return { isMobile: true };
        case DeviceTypes.Tablet:
            return { isTablet: true };
        case DeviceTypes.SmartTv:
            return { isSmartTV: true };
        case DeviceTypes.Console:
            return { isConsole: true };
        case DeviceTypes.Wearable:
            return { isWearable: true };
        case DeviceTypes.Browser:
            return { isBrowser: true };
        case DeviceTypes.Embedded:
            return { isEmbedded: true }
        default:
            return InitialDeviceTypes;
    }
};

export const getCurrentBrowser = (name) => {
    switch (name) {
        case BrowserTypes.Chrome:
        case BrowserTypes.Opera:
        case BrowserTypes.Firefox:
        case BrowserTypes.Yandex:
        case BrowserTypes.Safari:
        case BrowserTypes.Ie:
        case BrowserTypes.Edge:
        case BrowserTypes.Chromium:
            return true;
        default:
            return false;
    }
};

export const setUserAgent = (userAgent) => setUa(userAgent)

export const mockUserAgent = (userAgent) => {
    window.navigator.__defineGetter__('userAgent', () => userAgent);
};

export const setDefaults = (p, d = 'none') => (p ? p : d);

export const getNavigatorInstance = () => {
    if (typeof window !== 'undefined') {
        if (window.navigator || navigator) {
            return window.navigator || navigator;
        }
    }

    return false;
};

export const isIOS13Check = (type) => {
    const nav = getNavigatorInstance();
    return (
      nav &&
      nav.platform &&
      (nav.platform.indexOf(type) !== -1 ||
        (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1 && !window.MSStream))
    );
};


export const browserPayload = (isBrowser, browser, engine, os, ua) => ({
    isBrowser,
    browserMajorVersion: setDefaults(browser.major),
    browserFullVersion: setDefaults(browser.version),
    browserName: setDefaults(browser.name),
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua),
});

export const mobilePayload = (type, device, os, ua) => ({
    ...type,
    vendor: setDefaults(device.vendor),
    model: setDefaults(device.model),
    os: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    ua: setDefaults(ua),
});

export const smartTvPayload = (isSmartTV, engine, os, ua) => ({
    isSmartTV,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua),
});

export const consolePayload = (isConsole, engine, os, ua) => ({
    isConsole,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua),
});

export const wearablePayload = (isWearable, engine, os, ua) => ({
    isWearable,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua),
});

export const embeddedPayload = (isEmbedded, device, engine, os, ua) => ({
    isEmbedded,
    vendor: setDefaults(device.vendor),
    model: setDefaults(device.model),
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua),
})
