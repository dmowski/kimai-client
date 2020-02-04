import React, { Component } from "react";

import { connect } from "react-redux";
import "../styles/Login.css";
let APIinformationImage = "./loginInformation.png";

class Login extends Component {
  render() {
    return (
      <div style={{ display: "none" }}>
        <div className="login-container">
          <form>
            <h1>Kimai</h1>

            <label>
              <input name="url" placeholder="Kimai URL" type="text" required />
            </label>

            <label>
              <input
                autoFocus
                name="login"
                placeholder="login"
                type="text"
                required
              />
            </label>

            <label>
              <input
                name="token"
                placeholder="API password"
                type="password"
                required
              />
            </label>
            <button type="submit" className="button-color button-color-fill">
              Login
            </button>
            <p className="get-info-link">How to generate API password?</p>
            <div className="how-get-api" style={{ display: "none" }}>
              <img src={APIinformationImage} alt="" />
              <p>
                Open
                <b>User menu</b>
                in root Kimai system
              </p>
              <p>
                Move to
                <b>Edit</b>
                page
              </p>
              <p>
                Switch to
                <b>API</b>
                tab
              </p>
              <p>
                Enter new
                <b>API password</b>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(Login);
