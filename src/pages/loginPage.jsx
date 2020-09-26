import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./loginPageCSS.css";

class Login extends Component {
  state = {
    uname: JSON.parse(localStorage.getItem("uname")) || "",
    psw: JSON.parse(localStorage.getItem("psw")) || "",
    error: "",
    shouldProceed: localStorage.getItem("shouldProceed") || false,
  };
  formSubmit = (event) => {
    event.preventDefault();
    if (
      (event.target.uname.value === "John" &&
        event.target.psw.value === "12345") ||
      (event.target.uname.value === "MICKY" &&
        event.target.psw.value === "98765")
    ) {
      this.setState({ error: "" });
      const userName = JSON.stringify(this.state.uname);
      const psw = JSON.stringify(this.state.psw);
      localStorage.setItem("uname", userName);
      localStorage.setItem("psw", psw);
      localStorage.setItem("shouldProceed", true);
      this.setState({ shouldProceed: true });
    } else {
      this.setState({ error: "Wrong credentials, Please Login again." });
      localStorage.setItem("shouldProceed", "");
    }
    // this.props.setUser(this.props.user);
  };
  updateState = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    if (localStorage.getItem("shouldProceed")) return <Redirect to="/" />;
    else {
      return (
        <>
          <center>
            <h1 style={{ textDecoration: "underline" }}>Login Form </h1>
          </center>
          <div style={{ margin: "7% 33%" }}>
            <form onSubmit={this.formSubmit}>
              <div className="container">
                <label>
                  <b>Username</b>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="uname"
                    onChange={this.updateState}
                    required
                  />{" "}
                </label>

                <label>
                  <b>Password</b>

                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    onChange={this.updateState}
                    required
                  />
                </label>
                <button type="submit">Login</button>
              </div>
            </form>
            <div>
              <p style={{ color: "red" }}>{this.state.error}</p>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Login;
