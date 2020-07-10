
import React from "react";
import classnames from "classnames";
import * as actions from "store/actions/auth";
import { Link } from "react-router-dom"

// reactstrap components
import {
  Card,
  Alert,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class RegisterPage extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    btc_wallet: "",
    errors: {}

  };

  handleName = e => {
    this.setState({ fullNameFocus: false })
    let { username } = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!username) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

  handleWallet = e => {
    this.setState({ walletFocus: false })
    let WAValidator = require('wallet-address-validator');

    let { btc_wallet } = this.state;
    let errors = {};
    let formIsValid = true;

    let valid = WAValidator.validate(btc_wallet, 'BTC');
    if (!btc_wallet) {
      formIsValid = false;
      errors["wallet"] = "Cannot be empty";
    }

    if (!valid) {
      formIsValid = false
      errors["wallet"] = "Invalid Bitcoin wallet address";
    }

    this.setState({ errors: errors });
    return formIsValid;

    // This will log 'This is a valid address' to the console.
  }

  handleEmail = e => {
    this.setState({ emailFocus: false })
    let { email } = this.state
    let errors = {};
    let formIsValid = true;
    //Email
    if (!email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof email !== "undefined") {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }


  handlePass = e => {
    this.setState({ passwordFocus: false })
    let { password1 } = this.state;
    let errors = {};
    let formIsValid = true;
    if (!password1) {
      formIsValid = false;
      errors["password1"] = "Input Password"
    }

    if (typeof password1 !== "undefined") {
      if (!password1.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
        formIsValid = false;
        errors["password1"] = "Password must contain at least one letter,number, and be longer than six charaters.";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  confirmpassword = e => {
    this.setState({ password2Focus: false })
    let { password1, password2 } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!password2.match(password1)) {
      formIsValid = false
      errors["password2"] = "Passwords do not match"
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  checkform() {
    let { username, email, password1, password2, btc_wallet } = this.state;
    let errors = {};
    let formIsValid = true;
    let WAValidator = require('wallet-address-validator');


    let valid = WAValidator.validate(btc_wallet, 'BTC');

    if (!btc_wallet) {
      formIsValid = false;
      errors["wallet"] = "Cannot be empty";
    }

    if (!valid) {
      formIsValid = false
      errors["wallet"] = "Invalid Bitcoin wallet address";
    }



    //Name
    if (!username) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }




    if (!email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof email !== "undefined") {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    if (!password1) {
      formIsValid = false;
      errors["password1"] = "Input Password"
    }

    if (typeof password1 !== "undefined") {
      if (!password1.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
        formIsValid = false;
        errors["password1"] = "Password must contain at least one letter,number, and be longer than six charaters.";
      }
    }

    if (!password2.match(password1)) {
      formIsValid = false
      errors["password2"] = "Passwords do not match"
    }

    this.setState({ errors: errors });
    return formIsValid;

  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password1, password2, btc_wallet } = this.state;
    if (this.checkform()) {
      this.props.signup(username, email, password1, password2, btc_wallet);
    } else {
      this.checkform();
    }

  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };
  render() {
    const { username, email, password1, password2, btc_wallet } = this.state;
    const { error, detail, loading } = this.props

    if (detail) {
      return <Redirect to="/your-email-sent"></Redirect>;
    }

    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <div
                  className="square square-7"
                  id="square7"
                  style={{ transform: this.state.squares7and8 }}
                />
                <div
                  className="square square-8"
                  id="square8"
                  style={{ transform: this.state.squares7and8 }}
                />
                <Row>
                  <div className="mx-auto col-md-8 col-lg-5" >
                    <Card className="card-register">
                      <CardHeader>

                      </CardHeader>
                      <h6 className="collapse-brand" xs="6" style={{ textAlign: 'center' }}>REGISTER</h6>

                      <CardBody>

                        {error ?
                          <Alert color="danger"><p>{error.detail}</p></Alert>
                          :
                          null
                        }
                        <Form className="form" onSubmit={this.handleSubmit}>
                          <Label for="error" className="control-label" >{this.state.errors["name"]}</Label>

                          <InputGroup
                            className={this.state.errors['name'] ? "has-danger" : classnames({
                              "input-group-focus": this.state.fullNameFocus,
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              onChange={this.handleChange}
                              value={username}
                              name="username"
                              placeholder={
                                this.state.errors["name"] ?
                                  this.state.errors['name']
                                  :
                                  "Name"
                              }
                              type="text"
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={this.handleName
                              }

                            />
                          </InputGroup>

                          <Label for="error" className="control-label">{this.state.errors["email"]}</Label>

                          <InputGroup
                            className={this.state.errors["email"] ? "has-danger" : classnames({
                              "input-group-focus": this.state.emailFocus
                            })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              onChange={this.handleChange}
                              value={email}
                              name="email"
                              placeholder={
                                this.state.errors["email"] ?
                                  this.state.errors['email']
                                  :
                                  "Email"
                              }
                              type="text"
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={this.handleEmail}
                            />
                          </InputGroup>

                          <Label for="error" className="control-label">{this.state.errors["password1"]}</Label>
                          <InputGroup
                            className={this.state.errors["password1"] ? "has-danger" : classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              onChange={this.handleChange}
                              value={password1}
                              name="password1"
                              placeholder=
                              "Password"
                              type="password"
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={
                                this.handlePass
                              }
                            />
                          </InputGroup>

                          <Label for="error" className="control-label">{this.state.errors["password2"]}</Label>
                          <InputGroup
                            className={this.state.errors["password2"] ? "has-danger" : classnames({
                              "input-group-focus": this.state.password2Focus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              onChange={this.handleChange}
                              name="password2"
                              value={password2}
                              placeholder={
                                this.state.errors["password2"] ?
                                  this.state.errors["password2"]
                                  :
                                  "Confirm Password"
                              }
                              type="password"
                              onFocus={e =>
                                this.setState({ password2Focus: true })
                              }
                              onBlur={
                                this.confirmpassword
                              }
                            />
                          </InputGroup>
                          <Label for="error" className="control-label">{this.state.errors["wallet"]}</Label>
                          <InputGroup
                            className={this.state.errors["wallet"] ? "has-danger" : classnames({
                              "input-group-focus": this.state.walletFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              onChange={this.handleChange}
                              value={btc_wallet}
                              name="btc_wallet"
                              placeholder={
                                this.state.errors["wallet"] ?
                                  this.state.errors["wallet"]
                                  :
                                  "Your BTC wallet address"
                              }
                              type="text"
                              onFocus={e =>
                                this.setState({ walletFocus: true })
                              }
                              onBlur={this.handleWallet
                              }
                            />
                          </InputGroup>
                          <FormGroup check className="text-left">
                            <Label check>
                              <Input type="checkbox" required />
                              <span className="form-check-sign" />I agree to the{" "}
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                terms and conditions
                              </a>
                              .
                            </Label>
                          </FormGroup>
                        </Form>
                      </CardBody>
                      <div className="text-center card-footer">
                        {
                          loading ?
                            <div className="loader loader-1">
                              <div className="loader-outter"></div>
                              <div className="loader-inner"></div>
                            </div>
                            :
                            <Link to="/profile-page" className="btn-round btn btn-primary btn-lg btn-block" onClick={this.handleSubmit}>
                              Get Started
                        </Link>
                        }

                      </div>
                    </Card>
                  </div>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    token: state.auth.token,
    detail: state.auth.detail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2, btc_wallet) => dispatch(actions.authSignup(username, email, password1, password2, btc_wallet))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
