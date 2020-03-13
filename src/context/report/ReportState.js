import React, { useReducer, useEffect, useContext } from "react";
import { ReportContext } from "./ReportContext";
import { AuthContext } from "../auth/AuthContext";
import { reportReducer } from "./reportReducer";
import kimaiApi from "../../kimaiApi";
import * as types from "../types";

const initState = {
  staticData: {
    customers: [],
    activities: [],
    projects: []
  }
};

export const ReportState = ({ children }) => {
  const { url, headers } = useContext(AuthContext);

  let localStorageState = localStorage.getItem("state");
  if (localStorageState) {
    localStorageState = Object.assign(
      {},
      initState,
      JSON.parse(localStorageState)
    );
  }

  const [state, dispatch] = useReducer(
    reportReducer,
    localStorageState || initState
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
  function checkForError(result) {
    if (result.code !== 400) {
      return;
    }
    return result.message || JSON.stringify(result);
  }

  async function saveReport(id, reportObject) {
    if (!id) {
      return;
    }
    const result = await kimaiApi.saveReport(url, headers, id, reportObject);
    fetchReports();
    return checkForError(result);
  }

  async function saveNewReport(reportObject) {
    const result = await kimaiApi.createReport(url, headers, reportObject);
    fetchReports();
    return checkForError(result);
  }

  async function deleteReport(id) {
    if (!id) {
      return;
    }

    const result = await kimaiApi.deleteReport(url, headers, id);
    fetchReports();
    return checkForError(result);
  }

  const selectedReport = state?.selectedReport || {};
  return (
    <ReportContext.Provider
      value={{
        selectReport,
        fetchStatic,
        staticData: state.staticData,
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
