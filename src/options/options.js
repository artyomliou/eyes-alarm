import browser from "webextension-polyfill";
import { resetSettings, saveManySettings } from "@/storage";
import getDOM from "./html_node_cache";
import { inputs } from "./input_render";
import { getDateHisFormat } from "@/utility";

/**
 * gather inputs and save into storage
 * @param {Event} e
 */
export async function saveOptions(e) {
  e.preventDefault();
  console.debug("save options");

  if (checkAnyInputError()) {
    console.warn("some input have error");
    renderSaveResult("", false);
    return;
  }

  try {
    startLoadingAnimation();
    let data = getInputValues();
    console.debug(data);
    await saveManySettings(data);
    renderSaveResult(successMsg(), true);
  } catch (error) {
    renderSaveResult(errorMsg(error), false);
  } finally {
    stopLoadingAnimation();
  }
}

function getInputValues() {
  let set = {};
  inputs.forEach((key) => {
    let node = getDOM(key);
    let attrs = node.attributes;

    if (attrs.type) {
      switch (attrs.type.value) {
        case "number":
        case "range":
          set[key] = node.valueAsNumber;
          break;
        case "checkbox":
          set[key] = node.checked;
          break;
        default:
          set[key] = node.value;
          break;
      }
    } else {
      set[key] = node.value;
    }
  });
  return set;
}

/**
 * @param {Event} e
 */
export async function resetOptions(e) {
  console.debug("reset options");
  e.preventDefault();
  try {
    await resetSettings();
    renderSaveResult(successMsg(), true);
  } catch (error) {
    renderSaveResult(errorMsg(error), false);
  } finally {
    stopLoadingAnimation();
  }
}

function checkAnyInputError() {
  return inputs
    .map((storageKey) => getDOM(storageKey))
    .map((el) => {
      if (el.attributes.type && el.attributes.type.value === "number") {
        return el.validity.rangeOverflow || el.validity.rangeUnderflow;
      } else {
        return false;
      }
    })
    .filter((el) => el).length;
}

const optionsApplySuccessMessage = browser.i18n.getMessage(
  "optionsApplySuccessMessage"
);
function successMsg() {
  return `[${getDateHisFormat()}] ${optionsApplySuccessMessage}`;
}

/**
 * @param {Error} err
 */
function errorMsg(err) {
  return `[${getDateHisFormat()}] ${err.message}`;
}

function renderSaveResult(text = "", isSuccess = true) {
  let n = getDOM("msg");
  n.innerText = text;
  n.classList.toggle("success", isSuccess);
  n.classList.toggle("warning", !isSuccess);
}

function startLoadingAnimation() {
  getDOM("apply").classList.toggle("is-loading", true);
}

function stopLoadingAnimation() {
  getDOM("apply").classList.toggle("is-loading", false);
}
