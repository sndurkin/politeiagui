import React, { Component } from "react";
import { autobind } from "core-decorators";
import { withRouter } from "react-router";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CurrentUser from "./CurrentUser";
import loginConnector from "../../connectors/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", passwordVerify: "" };
  }

  componentWillUnmount() {
    this.setState({ password: "", passwordVerify: "" });
    this.props.onResetNewUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newUserResponse) {
      nextProps.history.push("/user/signup/next");
    }
  }

  render() {
    return (
      <div className="login-form">
        {this.props.loggedInAs ? (
          <CurrentUser />
        ) : this.props.signup || this.props.isShowingSignup ? (
          <SignupForm {...{
            password: this.state.password,
            passwordVerify: this.state.passwordVerify,
            onSetPassword: this.onSetPassword,
            onSetPasswordVerify: this.onSetPasswordVerify,
            onSignup: this.onSignup,
            hideCancel: this.props.signup
          }} />
        ) : (
          <LoginForm {...{
            password: this.state.password,
            onSetPassword: this.onSetPassword,
            onLogin: this.onLogin
          }} />
        )}
      </div>
    );
  }

  onSetPassword(password) {
    this.setState({ password });
  }

  onSetPasswordVerify(passwordVerify) {
    this.setState({ passwordVerify });
  }

  onSignup() {
    const { password, passwordVerify } = this.state;
    if (!password || password !== passwordVerify || !this.props.email) return;
    this.props.onSignup(this.state.password);
    this.setState({ password: "", passwordVerify: "" });
  }

  onLogin() {
    this.props.onLogin(this.state.password);
    this.setState({ password: "", passwordVerify: "" });
  }
}

autobind(Login);

export default loginConnector(withRouter(Login));