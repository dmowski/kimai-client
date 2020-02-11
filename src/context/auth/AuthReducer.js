import * as types from "../types";

const handlers = {
  [types.LOGIN]: (state, { payload: { url, login, password } }) => {
    return {
      ...state,
      url,
      login,
      password,
      check: true,
      headers: {
        "X-AUTH-USER": login,
        "X-AUTH-TOKEN": password
      }
    };
  },
  [types.LOGOUT]: state => {
    return {};
  },
  DEFAULT: state => state
};

export const AuthReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
