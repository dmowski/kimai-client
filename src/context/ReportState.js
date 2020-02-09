import React, { useReducer, useEffect } from "react";
import { ReportContext } from "./ReportContext";
import converters from "../converters";
import { reportReducer } from "./reportReducer";
import kimaiApi from "../kimaiApi";
import { FETCH_REPORTS, LOGOUT } from "./types";

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
        type: FETCH_REPORTS,
        payload: reports
      });
    }
  };

  function logout() {
    dispatch({
      type: LOGOUT
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

  const checkedCredentials = state?.credentials?.check;
  return (
    <ReportContext.Provider
      value={{
        checkedCredentials,
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
