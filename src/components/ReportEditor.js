import React, { useContext, useState } from "react";
import { ReportContext } from "../context/report/ReportContext";
import DatePicker from "react-datepicker";
import "../styles/ReportEditor.scss";
import "react-datepicker/dist/react-datepicker.css";
const cssClass = "report-editor";
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
  report.customerId = srcReport.project.customer.id;
  report.projectId = srcReport.project.id;
  report.activityId = srcReport.activity.id;
  return report;
}

function getProjectsList(projects, customerId) {
  return projects
    .filter(project => {
      return project.customer === parseInt(customerId, 10);
    })
    .map(project => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ));
}

function getActivitiesList(activities, projectId) {
  return activities
    .filter(activity => {
      return !activity.project || activity.project === parseInt(projectId);
    })
    .map(activity => (
      <option key={activity.id} value={activity.id}>
        {activity.name}
      </option>
    ));
}

function getCustomersList(customers) {
  return customers.map(customer => (
    <option key={customer.id} value={customer.id}>
      {customer.name}
    </option>
  ));
}

export default function ReportEditor() {
  const { selectedReport, customers, projects, activities } = useContext(
    ReportContext
  );
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
      <div className={cssClass}>
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
          <div className={`${cssClass}_row`}>
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
                className={`${cssClass}_time`}
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
          <div className={`${cssClass}_row ${cssClass}_row__category`}>
            <label>
              <span>Customer:</span>
              <br />
              <select
                name="customerId"
                onChange={handleInputChange}
                value={editedReport.customerId}
              >
                {getCustomersList(customers)}
              </select>
            </label>

            <label>
              <span>Project:</span>
              <br />
              <select
                name="projectId"
                onChange={handleInputChange}
                value={editedReport.projectId}
              >
                {getProjectsList(projects, editedReport.customerId)}
              </select>
            </label>

            <label>
              <span>Activity:</span>
              <br />
              <select
                name="activityId"
                onChange={handleInputChange}
                value={editedReport.activityId}
              >
                {getActivitiesList(activities, editedReport.projectId)}
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
