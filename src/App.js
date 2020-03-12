import React from "react";
import { ReportState } from "./context/report/ReportState";
import { AuthState } from "./context/auth/AuthState";
import { Main } from "./pages/Main";

export default function App() {
  return (
    <AuthState>
      <ReportState>
        <Main />
      </ReportState>
    </AuthState>
  );
}
