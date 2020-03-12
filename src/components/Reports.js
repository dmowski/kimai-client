import React, { useContext, useEffect } from "react";
import { ReportContext } from "../context/report/ReportContext";
import dayjs from "dayjs";
import converter from "../converters";

import "../styles/Reports.scss";
import ReportEditor from "./ReportEditor";
import PreviewReport from "./PreviewReport";
const cssClass = `reports`;
const todayString = dayjs(Date()).format("YYYY-MM-DD");

export default function Reports() {
  const { fetchReports, reports, fetchStatic } = useContext(ReportContext);

  useEffect(() => {
    fetchStatic();
    fetchReports();
    // eslint-disable-next-line
  }, []);

  const days = {};

  reports.forEach(report => {
    const reportDay = converter.date.toView(report.begin);
    days[reportDay] = days[reportDay] || [];
    days[reportDay].push(report);
  });

  const daysBlock = Object.keys(days)
    .sort((a, b) => new Date(b) - new Date(a))
    .map(day => {
      const afterTitle = day === todayString ? " (Today)" : "";
      return {
        reports: days[day],
        title: day + afterTitle
      };
    });

  function getDuration(reports) {
    const globalDuration = reports.reduce((duration, report) => {
      return duration + report.duration;
    }, 0);
    return converter.duration.toView(globalDuration);
  }

  function getReports(reports) {
    return reports.map(report => {
      return <PreviewReport report={report} key={report.id} />;
    });
  }

  function getDays() {
    return daysBlock.map(dayBlock => {
      return (
        <div className={`${cssClass}__day-block`} key={dayBlock.title}>
          <p className={`${cssClass}__title`}>
            <b>{dayBlock.title}</b>
            <span>• {getDuration(dayBlock.reports)}</span>
          </p>
          {getReports(dayBlock.reports)}
        </div>
      );
    });
  }

  return (
    <div className={cssClass}>
      <div className={`${cssClass}__list`}>
        <h3>Reports</h3>
        {getDays()}
      </div>

      <div className={`${cssClass}__editor`}>
        <ReportEditor />
      </div>
    </div>
  );
}
