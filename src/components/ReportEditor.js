import React, { useContext, useState } from "react";
import { ReportContext } from "../context/report/ReportContext";
import converter from "../converters";
import DatePicker from "react-datepicker";
import "../styles/ReportEditor.scss";
import "react-datepicker/dist/react-datepicker.css";
const cssClass = "report-editor";
const getInitialTemplate = () => ({
  id: undefined,
  description: "",
  duration_h: 0,
  duration_m: 0
});

function convertToEditor(srcReport = {}) {
  const initTemplate = getInitialTemplate();
  const report = {};

  for (let [key, initValue] of Object.entries(initTemplate)) {
    report[key] = srcReport[key] || initValue;
  }
  report.beginDate = new Date(srcReport.begin);
  report.customerId = srcReport.project.customer.id;
  report.projectId = srcReport.project.id;
  report.activityId = srcReport.activity.id;
  report.duration_h = converter.duration.getHours(srcReport.duration);
  report.duration_m = converter.duration.getMinutes(srcReport.duration);
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
  const {
    selectedReport,
    customers,
    projects,
    activities,
    saveReport,
    saveNewReport,
    deleteReport
  } = useContext(ReportContext);
  const initialTemplate = getInitialTemplate();
  const [editedReport, setReport] = useState(initialTemplate);

  if (selectedReport.id !== editedReport.id) {
    const report = convertToEditor(selectedReport);
    setReport(report);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

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

  const convertReportToSendFormat = reportObject => {
    const startDateStr = converter.date.toSrc(reportObject.beginDate);
    const startDate = new Date(startDateStr);
    const duration = converter.duration.toSrc(
      reportObject.duration_h,
      reportObject.duration_m
    );
    const endData = new Date(startDate.getTime() + duration * 1000);
    const endDateStr = converter.date.toSrc(endData.toString());
    return Object.assign(
      {},
      {
        begin: startDateStr,
        end: endDateStr,
        project: reportObject.projectId,
        activity: reportObject.activityId,
        description: reportObject.description,
        tags: ""
      }
    );
  };

  async function saveThisReportClickHandler(e) {
    e.preventDefault();
    const reportForSend = convertReportToSendFormat(editedReport);
    await saveReport(editedReport.id, reportForSend);
  }

  async function saveAsNewClickHandler(e) {
    e.preventDefault();
    const reportForSend = convertReportToSendFormat(editedReport);
    await saveNewReport(reportForSend);
  }
  async function deleteReportClickHandler(e) {
    e.preventDefault();
    const needDelete = window.confirm("Delete report?");
    if (!needDelete) {
      return;
    }

    await deleteReport(editedReport.id);
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
