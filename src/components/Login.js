import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import "../styles/Login.scss";

let APIinformationImage = "./loginInformation.png";

export default function Login() {
  const { login, headers } = useContext(AuthContext);

  const [loginStr, setLogin] = useState("");
  const [passwordStr, setPassword] = useState("");
  const [urlStr, setUrl] = useState("");

  async function loginFromForm(event) {
    event.preventDefault();
    const isCorrectLogin = await login(urlStr, loginStr, passwordStr);

    if (!isCorrectLogin) {
      alert("Token or login is not correct");
    }
  }

  const displayStatus = headers ? "none" : "block";

  return (
    <div style={{ display: displayStatus }}>
      <div className="login-container">
        <form onSubmit={loginFromForm}>
          <h1>Kimai</h1>

          <label>
            <input
              name="url"
              value={urlStr}
              onChange={event => setUrl(event.target.value)}
              placeholder="Kimai URL"
              type="text"
              required
            />
          </label>

          <label>
            <input
              autoFocus
              name="login"
              placeholder="login"
              type="text"
              value={loginStr}
              onChange={event => setLogin(event.target.value)}
              required
            />
          </label>

          <label>
            <input
              name="token"
              placeholder="API password"
              type="password"
              value={passwordStr}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </label>
          <button type="submit" className="button-color button-color-fill">
            Login
          </button>
          <details>
            <summary>
              <p className="get-info-link">How to generate API password?</p>
            </summary>
            <div className="how-get-api">
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
          </details>
        </form>
      </div>
    </div>
  );
}
