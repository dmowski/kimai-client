import React, { useReducer, useEffect, useContext } from "react";
import { ReportContext } from "./ReportContext";
import { AuthContext } from "../auth/AuthContext";
import { reportReducer } from "./reportReducer";
import kimaiApi from "../../kimaiApi";
import * as types from "../types";

export const ReportState = ({ children }) => {
  const { url, headers } = useContext(AuthContext);

  const [state, dispatch] = useReducer(
    reportReducer,
    JSON.parse(localStorage.getItem("state") || "{}")
  );

  useEffect(() => {
    // localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const fetchReports = async () => {
    const reports = await kimaiApi.getAllReports(url, headers);
    if (Array.isArray(reports)) {
      dispatch({
        type: types.FETCH_REPORTS,
        payload: reports
      });
    }
  };

  const fetchStatic = async () => {
    let customers = kimaiApi.getCustomers(url, headers);
    let activities = kimaiApi.getActivities(url, headers);
    let projects = kimaiApi.getProjects(url, headers);
    customers = await customers;
    activities = await activities;
    projects = await projects;

    if (Array.isArray(reports)) {
      dispatch({
        type: types.FETCH_STATIC,
        payload: {
          customers,
          activities,
          projects
        }
      });
    }
  };

  const reports = state?.reports || [];
  function selectReport(id) {
    const report = reports.find(report => report.id === id) || { id };

    dispatch({
      type: types.SELECT_REPORT,
      payload: report
    });
  }
  function checkForError(result, consoleMessage) {
    console.log(consoleMessage, result);
    const isGoodResult = result.code !== 400;
    if (!isGoodResult) {
      alert("Save error: " + result.message);
    }
    return isGoodResult;
  }

  async function saveReport(id, reportObject) {
    if (!id) {
      return;
    }
    const result = await kimaiApi.saveReport(url, headers, id, reportObject);
    checkForError(result, "result of updating");
    fetchReports();
  }

  async function saveNewReport(reportObject) {
    const result = await kimaiApi.createReport(url, headers, reportObject);
    checkForError(result, "result of saving new");
    fetchReports();
  }

  async function deleteReport(id) {
    if (!id) {
      return;
    }

    const result = await kimaiApi.deleteReport(url, headers, id);
    checkForError(result, "result of delete");
    fetchReports();
  }

  const selectedReport = state?.selectedReport || {};
  const customers = state?.static?.customers || [];
  const activities = state?.static?.activities || [];
  const projects = state?.static?.projects || [];

  return (
    <ReportContext.Provider
      value={{
        selectReport,
        fetchStatic,
        customers,
        activities,
        projects,
        reports,
        selectedReport,
        fetchReports,
        saveReport,
        saveNewReport,
        deleteReport
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
