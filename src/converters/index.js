import duration from "./duration.js";
import date from "./date.js";
import reports from "./reports.js";

function parseKiamaiUrl(urlString) {
  try {
    const urlObject = new URL(urlString);
    const APIurl = urlObject.origin + "/api/";
    return APIurl;
  } catch {
    return "";
  }
}

export default {
  reports,
  date,
  duration,
  parseKiamaiUrl,
};
