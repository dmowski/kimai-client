import React, { useContext, useEffect } from "react";

import converters from "../converters";
import { ReportContext } from "../context/ReportContext";

import "../styles/ReportEditor.scss";

export default function ReportEditor() {
  const { selectReport, selectedReport } = useContext(ReportContext);
  const style = {
    display: selectedReport.id ? "block" : "none"
  };
  return (
    <div style={style}>
      <h3>Editor</h3>
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
    </div>
  );
}
