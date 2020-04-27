import React, { useContext } from "react";
import Login from "../components/Login";
import Reports from "../components/Reports";
import { AuthContext } from "../context/auth/AuthContext";

export function Main() {
  const { logout, checkedCredentials } = useContext(AuthContext);
  return (
    <div>
      {checkedCredentials ? <Reports /> : <Login />}
      <button
        className="logout button-color button-color-fail"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
