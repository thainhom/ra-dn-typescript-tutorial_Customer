import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import "./Register.css";
import authApi from "../apis/auth/auth";

function CustomerRegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      await setUsername(value);
      setErrorUsername("");
    } else if (name === "email") {
      await setEmail(value);
      setErrorEmail("");
    } else if (name === "password") {
      await setPassword(value);
      setErrorPassword("");
    } else if (name === "confirm_password") {
      await setConfirmPassword(value);
      setErrorConfirmPassword("");
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (username.trim().length === 0) {
      hasError = true;
      setErrorUsername("Bắt buộc nhập tên đăng nhập.");
    } else if (username.length < 2 || username.length > 10) {
      hasError = true;
      setErrorUsername("Tên đăng nhập chỉ cho phép 4 đến 10 ký tự");
    }
    if (email.trim().length === 0) {
      hasError = true;
      setErrorEmail("Bắt buộc nhập địa chỉ email.");
    } else if (!validateEmail(email)) {
      hasError = true;
      setErrorEmail(
        "Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng email."
      );
    }
    if (password.trim().length === 0) {
      hasError = true;
      setErrorPassword("Bắt buộc nhập mật khẩu.");
    } else if (password.length < 8 || password.length > 20) {
      hasError = true;
      setErrorPassword("password phải ít nhất 8 ký tự và không quá 20 ký tự");
    }
    if (confirmPassword.trim().length === 0) {
      hasError = true;
      setErrorConfirmPassword("Bắt buộc nhập xác nhận mật khẩu.");
    }
    if (password !== confirmPassword) {
      hasError = true;
      alert("Mật khẩu không trùng khớp");
    }

    if (hasError) {
      return;
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
      role: "customer",
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    authApi
      .register(newUser)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Lỗi đăng ký người dùng:", error);
        alert(error.message);
      });
  };

  return (
    <div className="login-box">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            value={username}
            onChange={(e) => handleChange(e)}
            type="text"
            name="username"
          />
          <span className="error">{errorUsername}</span>
          <br></br>
          <label>Username</label>
          <br></br>
        </div>
        <div className="user-box">
          <input
            value={email}
            onChange={(e) => handleChange(e)}
            type="text"
            name="email"
          />
          {<span className="error">{errorEmail}</span>}
          <br></br>
          <label>Email</label>
          <br></br>
        </div>
        <div className="user-box">
          <input
            value={password}
            onChange={(e) => handleChange(e)}
            type="password"
            name="password"
          />
          {<span className="error">{errorPassword}</span>}
          <br></br>
          <label>Password</label>
          <br></br>
        </div>
        <div className="user-box">
          <input
            value={confirmPassword}
            onChange={(e) => handleChange(e)}
            type="password"
            name="confirm_password"
          />
          {<span className="error">{errorConfirmPassword}</span>}
          <br></br>
          <label>Confirm Password </label>
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
        <button>
          <a href="/login">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            LOGIN
          </a>
        </button>
      </form>
    </div>
  );
}

export default CustomerRegisterPage;
