import {
  loadNumber,
  saveSetting,
  STORAGE_KEY_PASSED_MINUTES,
  STORAGE_KEY_IS_READING,
} from "@/storage";

/**
 * @param {number} newState
 */
export async function setClock(newState) {
  console.debug(`set clock = ${newState}`);
  await saveSetting(STORAGE_KEY_PASSED_MINUTES, newState);
}

export async function incrementClock() {
  console.debug("increment clock");
  let passedMinutes = await loadNumber(STORAGE_KEY_PASSED_MINUTES);
  await saveSetting(STORAGE_KEY_PASSED_MINUTES, ++passedMinutes);
}

/**
 * @param {boolean} newState
 */
export async function setIndicator(newState) {
  console.debug(`set indicator = ${newState}`);
  await saveSetting(STORAGE_KEY_IS_READING, newState);
}
