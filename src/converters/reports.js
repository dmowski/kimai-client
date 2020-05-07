import date from "./date.js";
import duration from "./duration.js";
export default {
  getInitialTemplate() {
    return {
      id: undefined,
      description: "",
      duration_h: 0,
      duration_m: 0,
    };
  },
  toFlat(srcReport = {}) {
    const initTemplate = this.getInitialTemplate();
    const report = {};

    for (let [key, initValue] of Object.entries(initTemplate)) {
      report[key] = srcReport[key] || initValue;
    }
    report.beginDate = new Date(srcReport.begin);
    report.customerId = srcReport.project.customer.id;
    report.projectId = srcReport.project.id;
    report.activityId = srcReport.activity.id;
    report.duration_h = duration.getHours(srcReport.duration);
    report.duration_m = duration.getMinutes(srcReport.duration);

    return report;
  },
  toSrcFormat(flatReport) {
    const startDateStr = date.toSrc(flatReport.beginDate);
    const startDate = new Date(startDateStr);
    const durationSrc = duration.toSrc(
      flatReport.duration_h,
      flatReport.duration_m
    );
    const endData = new Date(startDate.getTime() + durationSrc * 1000);
    const endDateStr = date.toSrc(endData.toString());
    return Object.assign(
      {},
      {
        begin: startDateStr,
        end: endDateStr,
        project: flatReport.projectId,
        activity: flatReport.activityId,
        description: flatReport.description,
        tags: "",
      }
    );
  },
  fromSrcToView(id, srcReport, additionalInformation = {}) {
    const report = {};
    report.id = id;
    report.description = srcReport.description;
    report.activity = {
      id: parseInt(srcReport.activity),
    };
    report.project = {
      id: parseInt(srcReport.project),
    };
    if (additionalInformation.customerId) {
      report.project.customer = {
        id: additionalInformation.customerId,
      };
    }

    report.duration =
      date.toSeconds(srcReport.end) - date.toSeconds(srcReport.begin);

    report.begin = srcReport.begin;
    report.end = srcReport.end;
    return report;
  },
};
