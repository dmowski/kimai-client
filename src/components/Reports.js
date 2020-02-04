import React, { Component } from "react";

import { connect } from "react-redux";
import "../styles/Reports.css";
import ReportEditor from "./ReportEditor";
import PreviewReport from "./PreviewReport";

class Reports extends Component {
  render() {
    return (
      <div className="reports">
        <div className="list">
          <h3>Reports</h3>

          <div className="day-block">
            <p className="day-title">
              <b>title</b>
              <span>• 2h</span>
            </p>
            <PreviewReport />
          </div>
        </div>

        <div className="report-editor">
          <h3>Editor</h3>
          <ReportEditor />
        </div>
      </div>
    );
  }
}

export default connect(null, {})(Reports);
