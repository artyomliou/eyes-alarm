export function getDateHisFormat() {
  let dt = new Date();
  return [
    padTime(dt.getHours()),
    padTime(dt.getMinutes()),
    padTime(dt.getSeconds()),
  ].join(":");
}

/**
 * format time to [12:00] style
 * @param {Number} minutes
 */
export function formatTime(minutes) {
  if (!Number.isInteger(minutes)) {
    console.error(`input time [${minutes}] is not integer`);
    return "ERROR";
  }
  let formatted = [];
  let hour = 0;
  if (minutes >= 60) {
    do {
      minutes -= 60;
      hour += 1;
    } while (minutes >= 60);
  }
  formatted.push(hour, minutes);
  return formatted.map((el) => padTime(el)).join(":");
}

/**
 * accept a number
 * if it's less than 10, pad it with zero
 * @param {Number} val
 */
function padTime(val) {
  return val < 10 ? `0${val}` : val;
}
