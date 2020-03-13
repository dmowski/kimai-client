import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PreviewReport from "../components/PreviewReport";
import { ReportState } from "../context/report/ReportState";
import { AuthState } from "../context/auth/AuthState";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(
      <AuthState>
        <ReportState>
          <PreviewReport />
        </ReportState>
      </AuthState>,
      container
    );
  });

  const previewDom = container.querySelector(".preview-report");

  expect(previewDom).not.toBeNull();
});
