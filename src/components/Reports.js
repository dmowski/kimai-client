import React, { useContext, useEffect } from "react";
import { ReportContext } from "../context/ReportContext";
import dayjs from "dayjs";
import converter from "../converters";

import "../styles/Reports.scss";
import ReportEditor from "./ReportEditor";
import PreviewReport from "./PreviewReport";

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
  ].sort((dayA, dayB) => {
    var a = new Date(dayA).getTime();
    var b = new Date(dayB).getTime();
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  });

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
        <div className="day-block" key={dayBlock.title}>
          <p className="day-title">
            <b>{dayBlock.title}</b>
            <span>• {getDuration(dayBlock.reports)}</span>
          </p>
          {getReports(dayBlock.reports)}
        </div>
      );
    });
  }

  return (
    <div className="reports">
      <div className="list">
        <h3>Reports</h3>
        {getDays()}
      </div>

      <div className="report-editor">
        <ReportEditor />
      </div>
    </div>
  );
}
