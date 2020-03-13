import dayjs from "dayjs";
export default {
  toView(originDateString) {
    originDateString = originDateString || "";
    const day = dayjs(originDateString || Date());

    return day.format("YYYY-MM-DD");
  },
  toSrc(userViewString) {
    const date = new Date(userViewString);
    return date.toISOString();
  }
};
