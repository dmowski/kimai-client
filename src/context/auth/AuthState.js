import React, { useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import converters from "../../converters";
import { AuthReducer } from "./AuthReducer";
import kimaiApi from "../../kimaiApi";
import types from "../types";

export const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(
    AuthReducer,
    JSON.parse(localStorage.getItem("Auth") || "{}")
  );

  useEffect(() => {
    let copyOfState = JSON.parse(JSON.stringify(state));
    delete copyOfState?.check;
    localStorage.setItem("Auth", JSON.stringify(copyOfState));
  }, [state]);

  function logout() {
    dispatch({
      type: types.LOGOUT,
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
          password,
        },
      });
    }
    return isCorrectLogin;
  }

  if (!state?.check) {
    const { url, login: loginStr, password } = state;
    login(url, loginStr, password);
  }

  const checkedCredentials = state?.check;

  return (
    <AuthContext.Provider
      value={{
        checkedCredentials,
        logout,
        url: state.url,
        headers: state.headers,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
