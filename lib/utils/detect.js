import * as UAHelper from '../parse';
import {
  checkDeviceType,
  mobilePayload,
  browserPayload,
  smartTvPayload,
  wearablePayload,
  embeddedPayload,
  consolePayload
} from './utils';

export function deviceDetect(userAgent) {
  const { device, browser, engine, os, ua } = userAgent
    ? UAHelper.parseUserAgent(userAgent)
    : UAHelper;

  const type = checkDeviceType(device.type);
  const { isBrowser, isMobile, isTablet, isSmartTV, isConsole, isWearable, isEmbedded } = type;

  if (isBrowser) {
    return browserPayload(isBrowser, browser, engine, os, ua);
  }

  if (isSmartTV) {
    return smartTvPayload(isSmartTV, engine, os, ua);
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
    return wearablePayload(isWearable, engine, os, ua);
  }

  if (isEmbedded) {
    return embeddedPayload(isEmbedded, device, engine, os, ua);
  }
}
