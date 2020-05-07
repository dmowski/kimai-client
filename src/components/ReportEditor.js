import React, { useContext, useState } from "react";
import { ReportContext } from "../context/report/ReportContext";
import converter from "../converters";
import DatePicker, { registerLocale } from "react-datepicker";
import "../styles/report-editor.scss";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

const cssClass = "report-editor";

function getProjectsList(projects, customerId) {
  return projects
    .filter((project) => {
      return project.customer === parseInt(customerId, 10);
    })
    .map((project) => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ));
}

function getActivitiesList(activities, projectId) {
  return activities
    .filter((activity) => {
      return !activity.project || activity.project === parseInt(projectId);
    })
    .map((activity) => (
      <option key={activity.id} value={activity.id}>
        {activity.name}
      </option>
    ));
}

function getCustomersList(customers) {
  return customers.map((customer) => (
    <option key={customer.id} value={customer.id}>
      {customer.name}
    </option>
  ));
}

export default function ReportEditor() {
  const {
    selectedReportId,
    reports,
    staticData,
    saveReport,
    saveNewReport,
    deleteReport,
  } = useContext(ReportContext);
  const initialTemplate = converter.reports.getInitialTemplate();
  const [editedReport, setReport] = useState(initialTemplate);

  if (selectedReportId !== editedReport.id) {
    const reportFromList = reports.find(
      (report) => report.id === selectedReportId
    );
    const report = converter.reports.toFlat(reportFromList);
    setReport(report);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setReport({
      ...editedReport,
      [name]: value,
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
    const error = await saveNewReport(editedReport);
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
          <label className={`${cssClass}__main-text`}>
            <span>Description:</span>
            <textarea
              name="description"
              onChange={handleInputChange}
              value={editedReport.description}
            />
          </label>

          <div className="date-picker">
            <span>Date:</span>
            <DatePicker
              className="date-picker__input"
              selected={editedReport.beginDate}
              onChange={(date) =>
                handleInputChange({
                  target: {
                    name: "beginDate",
                    value: date,
                  },
                })
              }
              locale="ru"
              placeholderText="Weeks start on Monday"
            />
          </div>

          <div className={`${cssClass}_time-container`}>
            <span>Time:</span>
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

          <label>
            <span>Customer:</span>
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
            <select
              name="activityId"
              onChange={handleInputChange}
              value={editedReport.activityId}
            >
              {getActivitiesList(staticData.activities, editedReport.projectId)}
            </select>
          </label>

          <div className={`${cssClass}_buttons`}>
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
