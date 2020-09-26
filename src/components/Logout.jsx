import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  state = {
    redirect: false,
  };
  submitForm = (event) => {
    event.preventDefault();
    localStorage.clear();
    this.setState({ redirect: true });
  };
  render() {
    if (!this.state.redirect)
      return (
        <form onSubmit={this.submitForm}>
          <input type="submit" value="Logout" />
        </form>
      );
    else return <Redirect to="/login" />;
  }
}

export default Logout;
