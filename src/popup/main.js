import browser from "webextension-polyfill";
import { formatTime } from "@/utility";
import {
  loadNumber,
  loadBoolean,
  STORAGE_KEY_IS_READING,
  STORAGE_KEY_PASSED_MINUTES,
  STORAGE_KEY_BREAK_TIME,
  STORAGE_KEY_READING_TIME,
} from "@/storage";
import { MSG_TYPE_RESET_CLOCK, MSG_TYPE_TICK } from "@/message";

refreshPopupClock();

browser.runtime.onMessage.addListener((msg) => {
  switch (msg.type) {
    case MSG_TYPE_TICK:
      console.debug("recv tick");
      refreshPopupClock();
      break;
  }
});

document
  .querySelector("#refresh_button")
  .addEventListener("click", async () => {
    await sendResetClockRequest();
    await refreshPopupClock();
  });

document.querySelector("#options_button").addEventListener("click", (e) => {
  e.preventDefault();
  browser.runtime.openOptionsPage();
});

async function refreshPopupClock() {
  const isReading = await loadBoolean(STORAGE_KEY_IS_READING);
  const passedMinutes = await loadNumber(STORAGE_KEY_PASSED_MINUTES);
  const limit = isReading
    ? await loadNumber(STORAGE_KEY_READING_TIME)
    : await loadNumber(STORAGE_KEY_BREAK_TIME);
  const remain = limit - passedMinutes;

  const node = document.querySelector("#popup_clock");
  node.innerText = formatTime(remain);
  node.classList.toggle("warning", !isReading);
}

async function sendResetClockRequest() {
  try {
    console.debug(`send reset clock request`);
    await browser.runtime.sendMessage({ type: MSG_TYPE_RESET_CLOCK });
  } catch (error) {
    console.error(err);
  }
}
