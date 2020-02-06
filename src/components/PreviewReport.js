import React, { Component } from "react";

import { connect } from "react-redux";
import "../styles/PreviewReport.scss";

class PreviewReport extends Component {
  render() {
    return (
      <article className="preview-report">
        <p className="description">description</p>
        <p className="project">project</p>
        <p className="activity">activity</p>
        <p className="duration">2h</p>
      </article>
    );
  }
}

export default connect(null, {})(PreviewReport);
