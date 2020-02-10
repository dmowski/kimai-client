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
    const copyOfState = JSON.parse(JSON.stringify(state));
    if (copyOfState?.credentials) {
      delete copyOfState.credentials.check;
    }
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

  function selectReport(id) {
    dispatch({
      type: types.SELECT_REPORT,
      payload: { id }
    });
  }

  const checkedCredentials = state?.credentials?.check;
  const selectedReport = state?.selectedReport || {};
  return (
    <ReportContext.Provider
      value={{
        selectReport,
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
