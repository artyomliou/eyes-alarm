import browser from "webextension-polyfill";
import { loadNumber, STORAGE_KEY_IDLE_DETECT_INTERVAL } from "@/storage";
import { muteSound, unmuteSound } from "./sound";
import { stopTicker, registerTicker } from "./ticker";
import { clearNotification } from "./notification";

function freezeClock() {
  muteSound();
  stopTicker();
  clearNotification();
}

function warmClock() {
  unmuteSound();
  registerTicker();
}

loadNumber(STORAGE_KEY_IDLE_DETECT_INTERVAL)
  .then((val) => {
    console.debug("start idle detection");
    browser.idle.setDetectionInterval(val);
    browser.idle.onStateChanged.addListener((state) => {
      switch (state) {
        case "locked":
          freezeClock();
          break;
        case "active":
          warmClock();
          break;
      }
    });
  })
  .catch((err) => {
    console.error(`load idle detect interval error: ${err}`);
  });
