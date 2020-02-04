import dayjs from "dayjs";

export default {
  parseKiamaiUrl(urlString) {
    const urlObject = new URL(urlString);
    const APIurl = urlObject.origin + "/api/";

    return APIurl;
  },
  date: {
    toView(originDateString) {
      originDateString = originDateString || '';
      const day = dayjs(originDateString || Date());

      return day.format('YYYY-MM-DD');
    },
    toSrc(userViewString) {
      const date = new Date(userViewString);
      return date.toISOString();
    }
  },
  duration: {
    getMinutes(originDateString) {
      const time = parseInt(originDateString, 10);
      const hours = Math.floor(time / 60 / 60);
      return (time - hours * 60 * 60) / 60;
    },
    getHours(originDateString) {
      const time = parseInt(originDateString, 10);
      return Math.floor(time / 60 / 60);
    },
    toView(originDateString) {
      const hours = this.getHours(originDateString);
      const minutes = this.getMinutes(originDateString);
      const minutesTemplate = minutes ? minutes + "m" : "";
      const hoursTemplate = hours ? hours + "h" : "";
      const separator = hours && minutes ? " " : "";

      let lastPart = "";

      return `${hoursTemplate}${separator}${minutesTemplate}${lastPart}`;
    },
    toSrc(hours, minutes) {
      hours = hours || 0;
      minutes = minutes || 0;
      const hoursTime = parseInt(hours, 10) * 60 * 60;
      const minutesTime = parseInt(minutes, 10) * 60;
      return hoursTime + minutesTime;
    }
  }
};
