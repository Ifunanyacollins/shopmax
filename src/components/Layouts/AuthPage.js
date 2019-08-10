import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Container, Button, Form, Checkbox, Label } from "semantic-ui-react";
import { startUserLogin, startUserRegister } from "../../Actions/User";


class AuthPage extends Component {
  state = {
    isOpen: 1,
    error: "",
    errorForLogin:'',
    errorForRegister:"",
    name: "",
    email: "",
    password: "",
    isLoging: false,
    isRegistering: false
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleChange = id => {
    this.setState({ isOpen: id });
  };

  handleCompare = e => {
    if (e.target.value === this.state.password) {
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
    }
  };

  handleRegister = () => {
    const { name, email, password } = this.state;
    const user = { name, email, password };
    this.setState({errorForRegister:false})
    this.setState({ isRegistering: true });
    this.props
      .startUserRegister(user)
      .then(res => {
        if (res) {
          this.setState({ isRegistering: false });
          this.props.history.push("/");
        }
      })
      .catch(error =>{
        this.setState({ isRegistering: false });
        this.setState({errorForRegister:true})
      });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const user = { email, password };
    this.setState({errorForLogin:false})
    this.setState({ isLoging: true });
    this.props
      .startUserLogin(user)
      .then(res => {
        if (res) {
          this.setState({ isLoging: false });
          this.props.history.push("/");
        }
      })
      .catch(error =>{ 
        this.setState({ isLoging: false });
        this.setState({errorForLogin:true})
    
    });
  };
  render() {
    const {
      isOpen,
      error,
      name,
      email,
      password,
      isLoging,
      isRegistering,
      errorForLogin,
      errorForRegister
    } = this.state;
    return (
      <Fragment>
        <Container>
          <div className="Authpage-frame Padding margin-top-large flex justify-center">
            <div className="small-width  White">
              <div className="Off-white height_Auth very-tiny-padding flex justify-around">
                {isOpen === 1 ? (
                  <p>
                    <span className="very-tiny-padding-left">
                      Dont have an account ?
                    </span>
                    <Button
                      type="submit"
                      className="action"
                      onClick={() => this.handleChange(2)}
                    >
                      Register
                    </Button>
                  </p>
                ) : (
                  <p>
                    <span className="very-tiny-padding-left">
                      Have an account?
                    </span>
                    <Button
                      type="submit"
                      className="action"
                      onClick={() => this.handleChange(1)}
                    >
                      Login
                    </Button>
                  </p>
                )}
              </div>
              {isOpen === 1 ? (
                <Form className="margin-top-small Padding">
                  <Form.Field>
                    <p className="view-subtitle">Login</p>
                  </Form.Field>

                  <Form.Field>
                    <label>Email Address</label>
                    <input
                      placeholder="Email Address"
                      onChange={this.handleChangeEmail}
                      value={email}
                      required
                      type="email"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      placeholder="Password"
                      onChange={this.handleChangePassword}
                      value={password}
                      type="password"
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <Link to="/">Forgotten Password ?</Link>
                  </Form.Field>
                  {!isLoging ? (
                    <Button
                      type="submit"
                      className="action"
                      size="large"
                      onClick={() => this.handleLogin()}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button className="action" loading>
                      Loading
                    </Button>
                  )}

                  {errorForLogin === true && (
                    <Label basic color="red" pointing>
                      an error occured while login!
                    </Label>
                  )}

                </Form>
              ) : (
                " "
              )}

              {isOpen === 2 ? (
                <div>
                  <Form className="margin-top-small Padding">
                    <Form.Field>
                      <p className="view-subtitle">Register</p>
                    </Form.Field>

                    <Form.Field>
                      <label>Full Name</label>
                      <input
                        placeholder="Full Name"
                        onChange={this.handleChangeName}
                        value={name}
                        required
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>Email</label>
                      <input
                        placeholder="Email address"
                        onChange={this.handleChangeEmail}
                        value={email}
                        required
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input
                        placeholder="Password"
                        onChange={this.handleChangePassword}
                        value={password}
                        type="password"
                        required
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>Confirm Password</label>
                      <input
                        placeholder="Confirm Password"
                        onChange={this.handleCompare}
                        type="password"
                        required
                      />
                      {error === true && (
                        <Label basic color="red" pointing>
                          Password dont match
                        </Label>
                      )}

                      {error === false && (
                        <Label basic color="green" pointing>
                          Huston! We have a match
                        </Label>
                      )}
                    </Form.Field>

                    <Form.Field>
                      <Checkbox label="I agree to the Terms and Conditions" />
                    </Form.Field>
                    {!isRegistering ? (
                      <Button
                        type="submit"
                        className="action"
                        size="large"
                        onClick={() => this.handleRegister()}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button className="action" loading>
                        Loading
                      </Button>
                    )}

                    {errorForRegister === true && (
                      <Label basic color="red" pointing>
                        Huston we have a problem! try again
                      </Label>
                    )}
                  </Form>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startUserLogin: user => dispatch(startUserLogin(user)),
  startUserRegister: user => dispatch(startUserRegister(user))
});

const mapStateToProps = ({ User }) => ({ User });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
