import browser from "webextension-polyfill";
import {
  loadBoolean,
  loadNumber,
  STORAGE_KEY_IS_READING,
  STORAGE_KEY_PASSED_MINUTES,
  STORAGE_KEY_READING_TIME,
  STORAGE_KEY_BREAK_TIME,
} from "@/storage";

const ALARM_KEY = "eyes-alarm-counter";

export async function registerTicker() {
  console.debug("register ticker");
  const alarm = await browser.alarms.get(ALARM_KEY);
  if (alarm) {
    console.warn("alarm was created, skip registration");
    return;
  }
  browser.alarms.create(ALARM_KEY, {
    periodInMinutes: 1,
  });
}

export async function stopTicker() {
  console.debug("stop ticker");
  await browser.alarms.clear(ALARM_KEY);
}

export async function restartTicker() {
  console.debug("restart ticker");
  await browser.alarms.clear(ALARM_KEY);
  browser.alarms.create(ALARM_KEY, {
    periodInMinutes: 1,
  });
}

export async function shouldRead() {
  const isReading = await loadBoolean(STORAGE_KEY_IS_READING);
  const passedMinutes = await loadNumber(STORAGE_KEY_PASSED_MINUTES);
  const breakTime = await loadNumber(STORAGE_KEY_BREAK_TIME);
  return !isReading && passedMinutes >= breakTime;
}

export async function shouldBreak() {
  const isReading = await loadBoolean(STORAGE_KEY_IS_READING);
  const passedMinutes = await loadNumber(STORAGE_KEY_PASSED_MINUTES);
  const readingTime = await loadNumber(STORAGE_KEY_READING_TIME);
  return isReading && passedMinutes >= readingTime;
}
