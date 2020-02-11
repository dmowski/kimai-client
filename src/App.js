import React from "react";
import "./styles/App.scss";
import { ReportState } from "./context/report/ReportState";
import { Main } from "./pages/Main";

export default function App() {
  return (
    <ReportState>
      <Main />
    </ReportState>
  );
}
