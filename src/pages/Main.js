import React, { useContext } from "react";
import Login from "../components/Login";
import Reports from "../components/Reports";
import { ReportContext } from "../context/ReportContext";

export function Main() {
  const { logout, checkedCredentials } = useContext(ReportContext);
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
