import React from "react";

import converter from "../converters";

import "../styles/reports.scss";
import PreviewReport from "./PreviewReport";
const cssClass = `reports`;

export default function BlockReports({ reports = [], title = "" }) {
  function getReports(reports) {
    return reports.map((report) => {
      return <PreviewReport report={report} key={report.id} />;
    });
  }

  function getDuration(reports) {
    const globalDuration = reports.reduce((duration, report) => {
      return duration + report.duration;
    }, 0);
    return converter.duration.toView(globalDuration);
  }

  return (
    <div className={`${cssClass}__day-block`} key={title}>
      <p className={`${cssClass}__title`}>
        <b>{title}</b>
        <span>• {getDuration(reports)}</span>
      </p>
      {getReports(reports)}
    </div>
  );
}
