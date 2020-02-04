import React, { Component } from "react";

import { connect } from "react-redux";
import "../styles/ReportEditor.css";

class ReportEditor extends Component {
  render() {
    return (
      <div className="reportEditor">
        <form>
          <label>
            <span>Description:</span>
            <br />
            <textarea name="description" />
          </label>
          <br />
          <div className="row">
            <div className="date-picker">
              <span>Date:</span>
              <br />
              <input className="time" min="0" type="text" name="date" />
            </div>
            <div>
              <span>Time:</span>
              <br />
              <input className="time" min="0" type="number" name="duration" />
              <i>h</i>
              <input className="time" min="0" type="number" name="duration" />
              <i>m</i>
            </div>
          </div>
          <br />
          <div className="row row-category">
            <label>
              <span>Customer:</span>
              <br />
              <select>
                <option value="a">AAA</option>
              </select>
            </label>

            <label>
              <span>Project:</span>
              <br />
              <select>
                <option value="a">AAA</option>
              </select>
            </label>

            <label>
              <span>Activity:</span>
              <br />
              <select>
                <option value="a">AAA</option>
              </select>
            </label>
          </div>

          <br />
          <div className="buttons">
            <button className="button-color button-color-fill">Update</button>
            <button className="button-color">Create new</button>
            <button className="button-color button-color-fail">Delete</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, {})(ReportEditor);
