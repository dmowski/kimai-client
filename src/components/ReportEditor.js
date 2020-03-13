import React, { useContext, useState } from "react";
import { ReportContext } from "../context/report/ReportContext";
import converter from "../converters";
import DatePicker from "react-datepicker";
import "../styles/report-editor.scss";
import "react-datepicker/dist/react-datepicker.css";
const cssClass = "report-editor";

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
  const {
    selectedReport,
    staticData,
    saveReport,
    saveNewReport,
    deleteReport
  } = useContext(ReportContext);
  const initialTemplate = converter.reports.getInitialTemplate();
  const [editedReport, setReport] = useState(initialTemplate);

  if (selectedReport.id !== editedReport.id) {
    const report = converter.reports.toFlat(selectedReport);
    setReport(report);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setReport({
      ...editedReport,
      [name]: value
    });
  }

  async function saveThisReportClickHandler(e) {
    e.preventDefault();
    const reportForSend = converter.reports.toSrcFormat(editedReport);
    const error = await saveReport(editedReport.id, reportForSend);
    if (error) {
      alert(`Error on update: ${error}`);
    }
  }

  async function saveAsNewClickHandler(e) {
    e.preventDefault();
    const reportForSend = converter.reports.toSrcFormat(editedReport);
    const error = await saveNewReport(reportForSend);
    if (error) {
      alert(`Error on create: ${error}`);
    }
  }
  async function deleteReportClickHandler(e) {
    e.preventDefault();
    if (!window.confirm("Delete report?")) {
      return;
    }

    const error = await deleteReport(editedReport.id);
    if (error) {
      alert(`Error on save: ${error}`);
    }
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
                onChange={date =>
                  handleInputChange({
                    target: {
                      name: "beginDate",
                      value: date
                    }
                  })
                }
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
                className={`${cssClass}_time`}
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
                {getCustomersList(staticData.customers)}
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
                {getProjectsList(staticData.projects, editedReport.customerId)}
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
                {getActivitiesList(
                  staticData.activities,
                  editedReport.projectId
                )}
              </select>
            </label>
          </div>

          <br />
          <div className="buttons">
            <button
              onClick={saveThisReportClickHandler}
              className="button-color button-color-fill"
            >
              Update
            </button>
            <button onClick={saveAsNewClickHandler} className="button-color">
              Create new
            </button>
            <button
              onClick={deleteReportClickHandler}
              className="button-color button-color-fail"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
