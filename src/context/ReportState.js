import React, { useReducer, useEffect } from "react";
import { ReportContext } from "./ReportContext";
import converters from "../converters";
import { reportReducer } from "./reportReducer";
import kimaiApi from "../kimaiApi";
import * as types from "./types";

export const ReportState = ({ children }) => {
  const [state, dispatch] = useReducer(
    reportReducer,
    JSON.parse(localStorage.getItem("state") || "{}")
  );

  useEffect(() => {
    let copyOfState = JSON.parse(JSON.stringify(state));
    delete copyOfState?.credentials?.check;
    copyOfState = {
      credentials: copyOfState.credentials
    };
    localStorage.setItem("state", JSON.stringify(copyOfState));
  }, [state]);

  const fetchReports = async () => {
    const reports = await kimaiApi.getAllReports(
      state.credentials.url,
      state.credentials.headers
    );
    if (Array.isArray(reports)) {
      dispatch({
        type: types.FETCH_REPORTS,
        payload: reports
      });
    }
  };

  const fetchStatic = async () => {
    let customers = kimaiApi.getCustomers(
      state.credentials.url,
      state.credentials.headers
    );

    let activities = kimaiApi.getActivities(
      state.credentials.url,
      state.credentials.headers
    );

    let projects = kimaiApi.getProjects(
      state.credentials.url,
      state.credentials.headers
    );
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

  function logout() {
    dispatch({
      type: types.LOGOUT
    });
  }

  async function login(url, login, password) {
    const urlclear = converters.parseKiamaiUrl(url);
    const isCorrectLogin = await kimaiApi.checkLogin(login, password, urlclear);

    if (isCorrectLogin) {
      dispatch({
        type: "LOGIN",
        payload: {
          url: urlclear,
          login,
          password
        }
      });
    }
    return isCorrectLogin;
  }

  if (state?.credentials && !state.credentials?.check) {
    const { url, login: loginStr, password } = state.credentials;
    login(url, loginStr, password);
  }

  const reports = state?.reports || [];
  function selectReport(id) {
    const report = reports.find(report => report.id === id) || { id };

    dispatch({
      type: types.SELECT_REPORT,
      payload: report
    });
  }

  const checkedCredentials = state?.credentials?.check;
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
        checkedCredentials,
        selectedReport,
        state,
        logout,
        login,
        fetchReports
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
