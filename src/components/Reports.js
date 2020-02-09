import React, { useContext, useEffect } from "react";
import { ReportContext } from "../context/ReportContext";

import "../styles/Reports.scss";
// import ReportEditor from "./ReportEditor";
import PreviewReport from "./PreviewReport";

export default function Reports() {
  const { fetchReports, state } = useContext(ReportContext);

  useEffect(() => {
    fetchReports();
  }, []);

  const reports = state.reports || [];
  console.log("reports", reports);

  return (
    <div className="reports">
      <div className="list">
        <h3>Reports</h3>

        <div className="day-block">
          <p className="day-title">
            <b>title</b>
            <span>• 2h</span>
          </p>
          {reports.map(report => {
            return <PreviewReport report={report} key={report.id} />;
          })}
        </div>
      </div>

      <div className="report-editor">
        <h3>Editor</h3>
        {/*
          <ReportEditor key={report.id} />
        */}
      </div>
    </div>
  );
}
