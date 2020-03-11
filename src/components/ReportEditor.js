import React, { useContext, useState } from "react";
import { ReportContext } from "../context/report/ReportContext";
import converter from "../converters";
import DatePicker from "react-datepicker";
import "../styles/ReportEditor.scss";
import "react-datepicker/dist/react-datepicker.css";

const getInitialTemplate = () => ({
  id: null,
  description: "",
  duration_h: 0,
  duration_m: 0
});

function convertToEditor(srcReport = {}) {
  const report = getInitialTemplate();
  report.id = srcReport.id || report.id;
  report.description = srcReport.description || report.description;
  report.beginDate = new Date(srcReport.begin);
  return report;
}

export default function ReportEditor() {
  const { selectedReport } = useContext(ReportContext);
  const initialTemplate = getInitialTemplate();
  const [editedReport, setReport] = useState(initialTemplate);

  if (selectedReport.id && selectedReport.id !== editedReport.id) {
    const report = convertToEditor(selectedReport);
    setReport(report);
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setReport({
      ...editedReport,
      [name]: value
    });
  }

  function handleDate(date) {
    setReport({
      ...editedReport,
      beginDate: date
    });
  }

  return (
    <div className={!editedReport.id ? "hidden" : ""}>
      <h3>Editor</h3>
      <div className="reportEditor">
        <form>
          <label>
            <span>Description:</span>
            <br />
            <textarea
              name="description"
              onChange={handleInputChange}
              value={editedReport.description}
            />
          </label>
          <br />
          <div className="row">
            <div className="date-picker">
              <span>Date:</span>
              <br />
              <DatePicker
                selected={editedReport.beginDate}
                onChange={date => handleDate(date)}
                locale="en-GB"
                placeholderText="Weeks start on Monday"
              />
            </div>
            <div>
              <span>Time:</span>
              <br />
              <input
                className="time"
                min="0"
                type="text"
                name="duration_h"
                onChange={handleInputChange}
                value={editedReport.duration_h}
              />
              <i>h</i>
              <input
                className="time"
                min="0"
                type="number"
                name="duration_m"
                onChange={handleInputChange}
                value={editedReport.duration_m}
              />
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
