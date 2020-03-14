import React, { useContext } from "react";

import "../styles/preview-report.scss";
import converters from "../converters";
import { ReportContext } from "../context/report/ReportContext";
const cssClass = "preview-report";

export default function PreviewReport({ report = {} }) {
  const { selectReport, selectedReport, staticData } = useContext(
    ReportContext
  );

  const classList = [cssClass];
  if (selectedReport.id === report.id) {
    classList.push(`${cssClass}__selected`);
  }

  const project = staticData.projects.find(
    project => project.id === report.project.id
  );

  const activity = staticData.activities.find(
    activity => activity.id === report.activity.id
  );

  return (
    <article
      className={classList.join(" ")}
      onClick={() => {
        selectReport(report.id);
      }}
    >
      <p className={`${cssClass}__description`}>{report.description}</p>
      <p className={`${cssClass}__project`}>{project?.name}</p>
      <p className={`${cssClass}__activity`}>{activity?.name}</p>
      <p className={`${cssClass}__duration`}>
        {converters.duration.toView(report.duration)}
      </p>
    </article>
  );
}
