import React from "react";

import "../styles/PreviewReport.scss";
import converters from "../converters";

export default function PreviewReport({ report = {} }) {
  return (
    <article className="preview-report">
      <p className="description">{report.description || ""}</p>
      <p className="project">{report.project?.name || ""}</p>
      <p className="activity">{report.activity?.name || ""}</p>
      {/*
      <p className="date">
        <i>{converter.date.toView(report.end)}</i>
      </p>
      */}
      <p className="duration">{converters.duration.toView(report.duration)}</p>
    </article>
  );
}
