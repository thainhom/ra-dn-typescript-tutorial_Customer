import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import authApi from "../apis/auth/auth";
import { login } from "../store/actions/customerAuthAction";

function CustomerLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorUsername, setErrorUserName] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "userName") {
      setUserName(value);
      setErrorUserName("");
    } else if (name === "password") {
      setPassword(value);
      setErrorPassword("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let flag = false;

    if (username.length === 0) {
      flag = true;
      setErrorUserName("Tên đăng nhập bắt buộc phải nhập");
    }
    if (password.length === 0) {
      flag = true;
      setErrorPassword("Mật khẩu bắt buộc phải nhập");
    }

    if (!flag) {
      authApi
        .login(username, password, "customer")
        .then((response) => {
          dispatch(login(response.token));
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="userName"
              required
            />
            <label>Username</label>
            <br></br>
            <span className="error">{errorUsername}</span>
            <br></br>
            <br></br>
          </div>

          <div className="user-box">
            <input
              onChange={(e) => handleChange(e)}
              type="password"
              name="password"
              required
            />
            <label>Password</label>
            <br></br>
            <span className="error">{errorPassword}</span>
            <br></br>
          </div>

          <button type="submit">
            <a className="text-blue">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              SUBMIT
            </a>
          </button>
          <a href="/register">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Register
          </a>
        </form>
      </div>
    </>
  );
}

export default CustomerLoginPage;
