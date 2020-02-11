import React, { useContext } from "react";

import "../styles/PreviewReport.scss";
import converters from "../converters";
import { ReportContext } from "../context/ReportContext";

export default function PreviewReport({ report = {} }) {
  const { selectReport, selectedReport } = useContext(ReportContext);

  const select = () => {
    selectReport(report.id);
  };

  const classList = ["preview-report"];
  if (selectedReport.id === report.id) {
    classList.push("article_selected");
  }

  return (
    <article className={classList.join(" ")} onClick={select}>
      <p className="description">{report.description}</p>
      <p className="project">{report.project?.name}</p>
      <p className="activity">{report.activity?.name}</p>
      <p className="duration">{converters.duration.toView(report.duration)}</p>
    </article>
  );
}
