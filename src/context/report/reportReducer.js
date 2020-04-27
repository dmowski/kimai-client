import types from "../types";

const handlers = {
  [types.UPDATE_REPORT]: (state, { payload }) => {
    const updatedReport = payload;
    const newReports = state.reports.slice();
    const reportIndex = newReports.findIndex(
      (report) => report.id === updatedReport.id
    );

    if (reportIndex !== -1) {
      newReports[reportIndex] = updatedReport;
    } else {
      newReports.unshift(updatedReport);
    }
    return {
      ...state,
      reports: newReports,
    };
  },
  [types.DELETE_REPORT]: (state, { payload }) => {
    const id = payload;
    const newReports = state.reports
      .slice()
      .filter((report) => report.id !== id);
    return {
      ...state,
      reports: newReports,
      selectedReportId: newReports[0].id,
    };
  },
  [types.FETCH_STATIC]: (state, { payload }) => {
    return {
      ...state,
      staticData: payload,
    };
  },
  [types.SELECT_REPORT]: (state, { payload }) => {
    const id = payload;
    const ifExistReport = state.reports.find((report) => report.id === id);
    return {
      ...state,
      selectedReportId: ifExistReport ? id : state.selectedReportId,
    };
  },
  [types.FETCH_REPORTS]: (state, { payload: reports }) => {
    return {
      ...state,
      selectedReportId: state.selectedReportId || reports[0].id,
      reports: reports,
    };
  },
  [types.LOGIN]: (state, { payload: { url, login, password } }) => {
    return {
      ...state,
      credentials: {
        url,
        login,
        password,
        check: true,
        headers: {
          "X-AUTH-USER": login,
          "X-AUTH-TOKEN": password,
        },
      },
    };
  },
  checkLogin: (state, { payload }) => {
    return {
      ...state,
      credentials: {
        ...state.credentials,
        check: payload,
      },
    };
  },
  [types.LOGOUT]: (state) => null,
  DEFAULT: (state) => state,
};

export const reportReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
