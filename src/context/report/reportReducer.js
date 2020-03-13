import * as types from "../types";

const handlers = {
  [types.FETCH_STATIC]: (state, { payload }) => {
    return {
      ...state,
      staticData: payload
    };
  },
  [types.SELECT_REPORT]: (state, { payload: report }) => {
    const copyOfReport = JSON.parse(JSON.stringify(report));

    return {
      ...state,
      selectedReport: copyOfReport
    };
  },
  [types.FETCH_REPORTS]: (state, { payload: reports }) => {
    const copyOfReport = JSON.parse(JSON.stringify(reports[0]));
    return {
      ...state,
      selectedReport: copyOfReport,
      reports: reports
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
          "X-AUTH-TOKEN": password
        }
      }
    };
  },
  checkLogin: (state, { payload }) => {
    return {
      ...state,
      credentials: {
        ...state.credentials,
        check: payload
      }
    };
  },
  [types.LOGOUT]: state => null,
  DEFAULT: state => state
};

export const reportReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
