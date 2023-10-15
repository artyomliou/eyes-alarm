import { renderLabels, renderInputValues } from "./input_render";
import getDOM from "./html_node_cache";
import { refreshSoundVolumeLabel, toggleSoundInputs } from "./input_interact";
import { resetOptions, saveOptions } from "./options";

document.addEventListener("DOMContentLoaded", () => {
  getDOM("apply").addEventListener("click", saveOptions);
  getDOM("reset").addEventListener("click", resetOptions);
  getDOM("soundEnabled").addEventListener("click", toggleSoundInputs);
  getDOM("soundVolume").addEventListener("change", refreshSoundVolumeLabel);
  renderLabels();
  renderInputValues();
});
