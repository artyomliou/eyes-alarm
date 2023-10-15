import browser from "webextension-polyfill";
import { loadSetting } from "@/storage";
import getDOM from "./html_node_cache";
import { refreshSoundVolumeLabel, toggleSoundInputs } from "./input_interact";

export const labels = {
  // [dom key]: [locale string key]
  readingTime_label: "optionsWorkTimeLabel",
  breakTime_label: "optionsBreakTimeLabel",
  title_label: "optionsNotificationTitleLabel",
  message_label: "optionsNotificationMessageLabel",
  soundEnabled_label: "optionsSoundEnabledLabel",
  soundVolume_label: "optionsSoundVolumeLabel",
  soundPath_label: "optionsSoundPathLabel",
  apply: "optionsApplyButton",
  reset: "optionsResetButton",
};

export const inputs = [
  "readingTimeAmount",
  "breakTimeAmount",
  "title",
  "message",
  "soundEnabled",
  "soundVolume",
  "soundPath",
];

/**
 * Retrieve all data from local storage,
 * and render them into columns with special process depending on its type.
 * When there's no such value by specified key in storage,
 * use default values instead.
 */
export function renderLabels() {
  console.debug("render labels");
  for (const [domKey, i18nKey] of Object.entries(labels)) {
    getDOM(domKey).innerText = browser.i18n.getMessage(i18nKey);
  }
}

/**
 * Retrieve all data from local storage,
 * and render them into columns with special process depending on its type.
 * When there's no such value by specified key in storage,
 * use default values instead.
 */
export async function renderInputValues() {
  console.debug("render input values");
  for await (const id of inputs) {
    const storageValue = await loadSetting(id);
    const node = getDOM(id);
    if (!node) {
      console.error(`cannot get node #${id}`);
      return;
    }
    switch (node.type) {
      case "checkbox":
        node.checked = storageValue;
        break;
      default:
        node.value = storageValue;
        break;
    }
  }

  toggleSoundInputs();
  refreshSoundVolumeLabel();
}
