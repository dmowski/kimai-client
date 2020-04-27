import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import "../styles/login.scss";

let APIinformationImage = "./loginInformation.png";

export default function Login() {
  const { login, headers } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    token: "",
    url: "",
  });

  async function loginFromForm(event) {
    event.preventDefault();
    const isCorrectLogin = await login(
      userData.url,
      userData.username,
      userData.token
    );

    if (!isCorrectLogin) {
      alert("Token or login is not correct");
    }
  }
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }
  const displayStatus = headers ? "none" : "block";

  return (
    <div style={{ display: displayStatus }}>
      <div className="login">
        <form onSubmit={loginFromForm}>
          <h1>Kimai</h1>

          <label>
            <input
              name="url"
              value={userData.url}
              onChange={handleInputChange}
              placeholder="Kimai URL"
              type="text"
              required
            />
          </label>

          <label>
            <input
              autoFocus
              name="username"
              placeholder="username"
              type="text"
              value={userData.username}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            <input
              name="token"
              placeholder="API token"
              type="password"
              value={userData.token}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit" className="button-color button-color-fill">
            Login
          </button>
          <details>
            <summary>
              <p className="get-info-link">How to generate API token?</p>
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
                <b>API token</b>
              </p>
            </div>
          </details>
        </form>
      </div>
    </div>
  );
}
