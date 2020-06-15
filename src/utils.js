const { DEVICE_TYPES, defaultData } = require("./constants");

const checkType = type => {
    switch (type) {
        case DEVICE_TYPES.MOBILE:
            return { isMobile: true };
        case DEVICE_TYPES.TABLET:
            return { isTablet: true };
        case DEVICE_TYPES.SMART_TV:
            return { isSmartTV: true };
        case DEVICE_TYPES.CONSOLE:
            return { isConsole: true };
        case DEVICE_TYPES.WEARABLE:
            return { isWearable: true };
        case DEVICE_TYPES.BROWSER:
            return { isBrowser: true };
        default:
            return defaultData;
    }
};

const broPayload = (isBrowser, browser, engine, os, ua) => {
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

const mobilePayload = (type, device, os, ua) => {
    return {
        ...type,
        vendor: device.vendor,
        model: device.model,
        os: os.name,
        osVersion: os.version,
        ua: ua
    };
};

const stvPayload = (isSmartTV, engine, os, ua) => {
    return {
        isSmartTV,
        engineName: engine.name,
        engineVersion: engine.version,
        osName: os.name,
        osVersion: os.version,
        userAgent: ua
    };
};

const consolePayload = (isConsole, engine, os, ua) => {
    return {
        isConsole,
        engineName: engine.name,
        engineVersion: engine.version,
        osName: os.name,
        osVersion: os.version,
        userAgent: ua
    };
};

const wearPayload = (isWearable, engine, os, ua) => {
    return {
        isWearable,
        engineName: engine.name,
        engineVersion: engine.version,
        osName: os.name,
        osVersion: os.version,
        userAgent: ua
    };
};


export const getNavigatorInstance = () => {
    if (typeof window !== 'undefined') {
        if (window.navigator || navigator) {
            return window.navigator || navigator;
        }
    }

    return false;
};

export const isIOS13Check = type => {
    const nav = getNavigatorInstance();
    return (
      nav && nav.platform && (nav.platform.indexOf(type) !== -1 || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1 && !window.MSStream))
    );
};

module.exports = {
    checkType,
    broPayload,
    mobilePayload,
    stvPayload,
    consolePayload,
    wearPayload,
    getNavigatorInstance,
    isIOS13Check,
}
