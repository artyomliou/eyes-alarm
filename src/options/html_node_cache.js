let nodePool = {};

/**
 * return specified dom
 * if it doesnt exist in pool, get it and cache it in pool
 * @param {string} key
 * @returns {HTMLElement}
 */
export default function getDOM(key) {
  if (nodePool.hasOwnProperty(key)) {
    return nodePool[key];
  } else {
    return (nodePool[key] = document.querySelector("#" + key));
  }
}
