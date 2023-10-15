import { loadNumber, STORAGE_KEY_SOUND_VOLUME } from "@/storage";

let sound = new Audio();
sound.preload = true;
sound.loop = false;

(async function applySoundSettings() {
  sound.volume = await loadNumber(STORAGE_KEY_SOUND_VOLUME);
})();

/**
 * @param {string} path
 */
export async function loadFromPath(path) {
  if (sound.src === path) {
    console.warn(`already using sound from ${path}`);
    return;
  }
  console.debug(`load sound from ${path}`);
  sound.src = path;
}

export function playSound() {
  console.debug("play sound");
  sound.play();
}

export function muteSound() {
  console.debug("mute sound");
  sound.muted = true;
}

export function unmuteSound() {
  console.debug("unmute sound");
  sound.muted = false;
}

/**
 * @param {number} volume
 */
export async function applyVolume(volume) {
  console.debug(`update volume = ${volume}`);
  sound.volume = volume;
}
