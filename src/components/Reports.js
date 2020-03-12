import React, { useContext, useEffect } from "react";
import { ReportContext } from "../context/report/ReportContext";
import dayjs from "dayjs";
import converter from "../converters";

import "../styles/Reports.scss";
import ReportEditor from "./ReportEditor";
import PreviewReport from "./PreviewReport";
const cssClass = `reports`;
export default function Reports() {
  const { fetchReports, reports, fetchStatic } = useContext(ReportContext);

  useEffect(() => {
    fetchStatic();
    fetchReports();
    // eslint-disable-next-line
  }, []);

  const todayString = dayjs(Date()).format("YYYY-MM-DD");
  const listOfDays = [
    ...new Set(
      reports.map(report => {
        return converter.date.toView(report.begin);
      })
    )
  ].sort((a, b) => new Date(b) - new Date(a));

  const daysBlock = listOfDays.map(day => {
    const listOfReports = reports.filter(report => {
      const reportDay = converter.date.toView(report.begin);
      return reportDay === day;
    });

    const afterTitle = day === todayString ? " (Today)" : "";

    return {
      title: day + afterTitle,
      reports: listOfReports
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
