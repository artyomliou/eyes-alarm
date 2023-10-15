import getDOM from "./html_node_cache";

/**
 * switch status whether sound-related columns is disabled
 * @param {Event} e
 */
export function toggleSoundInputs(e = null) {
  let disabled = false;
  if (e === null) {
    disabled = !getDOM("soundEnabled").checked;
  } else {
    disabled = !e.target.checked;
  }
  getDOM("soundPath").disabled = disabled;
  getDOM("soundVolume").disabled = disabled;
}

/**
 * refresh volume's label
 * @param {Event} e
 */
export function refreshSoundVolumeLabel(e = null) {
  let value = e === null ? getDOM("soundVolume").value : e.target.value;

  getDOM("soundVolumeValue").innerText = `${value * 100}%`;
}
