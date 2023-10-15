import browser from "webextension-polyfill";
import {
  registerTicker,
  restartTicker,
  shouldBreak,
  shouldRead,
} from "./ticker";
import { setClock, incrementClock, setIndicator } from "./clock";
import { clearNotification, createNotification } from "./notification";
import "./idle_detection";
import {
  STORAGE_KEY_BREAK_TIME,
  STORAGE_KEY_READING_TIME,
  STORAGE_KEY_SOUND_ENABLED,
  STORAGE_KEY_SOUND_PATH,
  STORAGE_KEY_SOUND_VOLUME,
  loadString,
} from "@/storage";
import { loadFromPath, muteSound, unmuteSound, applyVolume } from "./sound";
import { MSG_TYPE_RESET_CLOCK, MSG_TYPE_TICK } from "@/message";

const defaultSoundPath = browser.runtime.getURL(
  "./sound/178646__zabuhailo__bronzebell1.wav"
);

browser.alarms.onAlarm.addListener(async () => {
  await incrementClock();
  if (await shouldBreak()) {
    console.debug("should break");
    resetClockCommands(false);
    createNotification();
  } else if (await shouldRead()) {
    console.debug("should read");
    resetClockCommands(true);
    clearNotification();
  }
  try {
    console.debug("send tick");
    await browser.runtime.sendMessage({ type: MSG_TYPE_TICK });
  } catch (error) {
    console.error(error);
  }
});

browser.runtime.onMessage.addListener((msg) => {
  switch (msg.type) {
    case MSG_TYPE_RESET_CLOCK:
      console.debug("recv reset clock");
      resetClockCommands(true);
      return Promise.resolve();
  }
});

browser.storage.local.onChanged.addListener((changes) => {
  function changed(key) {
    return changes[key] && changes[key].newValue != changes[key].oldValue;
  }
  if (changed(STORAGE_KEY_READING_TIME) || changed(STORAGE_KEY_BREAK_TIME)) {
    console.debug("reading or break time was changed, reset the clock");
    resetClockCommands(true);
  }
  if (changed(STORAGE_KEY_SOUND_ENABLED)) {
    if (changes[STORAGE_KEY_SOUND_ENABLED].newValue) {
      unmuteSound();
    } else {
      muteSound();
    }
  }
  if (changed(STORAGE_KEY_SOUND_VOLUME)) {
    applyVolume(changes[STORAGE_KEY_SOUND_VOLUME].newValue);
  }
  if (changed(STORAGE_KEY_SOUND_PATH)) {
    loadFromPath(changes[STORAGE_KEY_SOUND_PATH].newValue || defaultSoundPath);
  }
});

function resetClockCommands(indicatorIsGreen = true) {
  restartTicker();
  setClock(0);
  setIndicator(indicatorIsGreen);
}

(async function main() {
  await registerTicker();

  const soundPath = await loadString(STORAGE_KEY_SOUND_PATH);

  await loadFromPath(soundPath || defaultSoundPath);
})();
