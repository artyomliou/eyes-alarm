import browser from "webextension-polyfill";
import {
  loadString,
  loadBoolean,
  STORAGE_KEY_NOTIFICATION_TITLE,
  STORAGE_KEY_NOTIFICATION_MESSAGE,
  STORAGE_KEY_SOUND_ENABLED,
} from "@/storage";
import { playSound } from "./sound";

const notificationID = "eyes-alarm-notification";

export async function createNotification() {
  console.debug("create notification");
  await browser.notifications.create(notificationID, {
    type: "basic",
    iconUrl: browser.runtime.getURL("image/icon-pad@128.png"),
    title: await loadString(STORAGE_KEY_NOTIFICATION_TITLE),
    message: await loadString(STORAGE_KEY_NOTIFICATION_MESSAGE),
  });

  if (await loadBoolean(STORAGE_KEY_SOUND_ENABLED)) {
    playSound();
  } else {
    console.debug("not playing sound because not enabled");
  }
}

export async function clearNotification() {
  console.debug("clear notification");
  await browser.notifications.clear(notificationID);
}
