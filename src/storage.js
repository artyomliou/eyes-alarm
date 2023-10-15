import browser from "webextension-polyfill";

/**
 * @param {string} key
 * @returns {Promise<string>}
 */
export async function loadString(key) {
  return await loadSetting(key);
}

/**
 * @param {string} key
 * @returns {Promise<number>}
 */
export async function loadNumber(key) {
  const val = await loadSetting(key);
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    if (("" + val).includes(".")) {
      return Number.parseFloat(val);
    } else {
      return Number.parseInt(val, 10);
    }
  }
  return val;
}

/**
 * @param {string} key
 * @returns {Promise<boolean>}
 */
export async function loadBoolean(key) {
  const val = await loadSetting(key);
  if (typeof val === "boolean") {
    return val;
  }
  if (typeof val === "string") {
    return val === "true";
  }
  return !!val;
}

/**
 * @param {string} key
 */
export async function loadSetting(key) {
  const results = await browser.storage.local.get(key);
  if (key in results) {
    return results[key];
  } else {
    return defaultValues[key];
  }
}

/**
 * @param {string} key
 * @param {any} value
 */
export async function saveSetting(key, value) {
  await browser.storage.local.set({
    [key]: value,
  });
}

export const saveManySettings = browser.storage.local.set;

export async function resetSettings() {
  await browser.storage.local.set(defaultValues);
}

export const STORAGE_KEY_IS_READING = "isReading";
export const STORAGE_KEY_PASSED_MINUTES = "passedMinutes";
export const STORAGE_KEY_BREAK_TIME = "breakTimeAmount";
export const STORAGE_KEY_READING_TIME = "readingTimeAmount";
export const STORAGE_KEY_IDLE_DETECT_INTERVAL = "idleDetectionInterval";
export const STORAGE_KEY_SOUND_ENABLED = "soundEnabled";
export const STORAGE_KEY_SOUND_PATH = "soundPath";
export const STORAGE_KEY_SOUND_VOLUME = "soundVolume";
export const STORAGE_KEY_NOTIFICATION_TITLE = "title";
export const STORAGE_KEY_NOTIFICATION_MESSAGE = "message";

export const allStorageKeys = [
  STORAGE_KEY_IS_READING,
  STORAGE_KEY_PASSED_MINUTES,
  STORAGE_KEY_BREAK_TIME,
  STORAGE_KEY_READING_TIME,
  STORAGE_KEY_IDLE_DETECT_INTERVAL,
  STORAGE_KEY_SOUND_ENABLED,
  STORAGE_KEY_SOUND_PATH,
  STORAGE_KEY_SOUND_VOLUME,
  STORAGE_KEY_NOTIFICATION_TITLE,
  STORAGE_KEY_NOTIFICATION_MESSAGE,
];

export const defaultValues = {
  [STORAGE_KEY_IS_READING]: true,
  [STORAGE_KEY_PASSED_MINUTES]: 0,
  [STORAGE_KEY_BREAK_TIME]: 10,
  [STORAGE_KEY_READING_TIME]: 50,
  [STORAGE_KEY_IDLE_DETECT_INTERVAL]: 1200,
  [STORAGE_KEY_SOUND_ENABLED]: true,
  [STORAGE_KEY_SOUND_PATH]: "",
  [STORAGE_KEY_SOUND_VOLUME]: 0.5,
  [STORAGE_KEY_NOTIFICATION_TITLE]:
    browser.i18n.getMessage("notificationTitle"),
  [STORAGE_KEY_NOTIFICATION_MESSAGE]: browser.i18n.getMessage(
    "notificationMessage"
  ),
};
