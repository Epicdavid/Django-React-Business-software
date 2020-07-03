
import React from "react";
import classnames from "classnames";
import { authLogin } from "../../store/actions/auth";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Spinner,
    Alert,
    Button,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { connect } from "react-redux"
import { Redirect, Link } from "react-router-dom";


class LoginPage extends React.Component {
    state = {
        email: "",
        password: "",
        squares1to6: "",
        squares7and8: "",
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }



    onSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password);
        console.log(email, password)
    };

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
        const { error, token } = this.props;
        const { email, password } = this.state;
        if (token) {
            return <Redirect to="/Dashboard"></Redirect>;
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
                                            <h6 className="card-title" style={{ textAlign: 'center' }}>Login</h6>

                                            <CardBody>
                                                {this.props.error ?
                                                    <Alert color="danger">{error && <p>{this.props.error.message}</p>}</Alert>
                                                    :
                                                    null
                                                }
                                                <Form className="form" onSubmit={this.onSubmit}>
                                                    <InputGroup
                                                        className={classnames({
                                                            "input-group-focus": this.state.emailFocus
                                                        })}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="tim-icons icon-email-85" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            onChange={this.handleChange}
                                                            value={email}
                                                            name="email"
                                                            placeholder="Email"
                                                            type="text"
                                                            onFocus={e => this.setState({ emailFocus: true })}
                                                            onBlur={e => this.setState({ emailFocus: false })}
                                                        />
                                                    </InputGroup>
                                                    <InputGroup
                                                        className={classnames({
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
                                                            value={password}
                                                            name="password"
                                                            placeholder="Password"
                                                            type="password"
                                                            onFocus={e =>
                                                                this.setState({ passwordFocus: true })
                                                            }
                                                            onBlur={e =>
                                                                this.setState({ passwordFocus: false })
                                                            }
                                                        />
                                                    </InputGroup>
                                                </Form>
                                                <div>
                                                    <Spinner color="danger" />
                                                </div>
                                            </CardBody>


                                            <div className="text-center card-footer">
                                                {
                                                    this.props.loading ?
                                                        <Spinner color="danger" type="grow" />
                                                        :

                                                        <Button className="btn-round btn btn-primary btn-lg btn-block" onClick={this.onSubmit}>
                                                            Get Started
                                                        </Button>
                                                }

                                                <div className="pull-left ml-3 mb-3">
                                                    <h6 className="link footer-link" color="info"><Link to="/register-page">Create Account</Link></h6>
                                                </div>
                                                <div className="pull-right mr-3 mb-3">
                                                    <h6 className="link footer-link" color="info"><Link to="/support">Forgot Password?</Link></h6>
                                                </div>
                                            </div>

                                        </Card>
                                    </div>
                                </Row>
                                <div className="register-bg" />
                                <div
                                    className="square square-7"
                                    id="square7"
                                    style={{ transform: this.state.squares7and8 }}
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
                                    className="square square-5"
                                    id="square5"
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
        error: state.error,
        loading: state.loading,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(authLogin(username, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
