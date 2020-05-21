
import React from "react";
// javascript plugin used to create scrollbars on windows
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    CardFooter,
    ListGroupItem,
    ListGroup,
    UncontrolledTooltip,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

class RatePage extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("landing-page");
    }
    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }
    render() {
        return (
            <>
                <ExamplesNavbar />
                <div className="wrapper">
                    <div className="page-header">
                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/blob.png")}
                        />
                        <img
                            alt="..."
                            className="path2"
                            src={require("assets/img/path2.png")}
                        />
                        <img
                            alt="..."
                            className="shapes triangle"
                            src={require("assets/img/triunghiuri.png")}
                        />
                        <img
                            alt="..."
                            className="shapes wave"
                            src={require("assets/img/waves.png")}
                        />
                        <img
                            alt="..."
                            className="shapes squares"
                            src={require("assets/img/patrat.png")}
                        />
                        <img
                            alt="..."
                            className="shapes circle"
                            src={require("assets/img/cercuri.png")}
                        />
                        <div className="content-center">
                            <Row className="row-grid justify-content-between align-items-center text-left">
                                <Col lg="4" md="5">
                                    <img
                                        alt="..."
                                        className="img-fluid"
                                        src={require("assets/img/bitcoin.png")}
                                    />
                                </Col>
                                <Col lg="6" md="6">
                                    <h1 className="text-white">
                                        We keep your coin <br />
                                        <span className="text-white">secured</span>
                                    </h1>
                                    <p className="text-white mb-3">
                                        Start Earning ...
                  </p>
                                    <div className="btn-wrapper mb-3">
                                        <p className="category text-success d-inline">
                                            From 18.0% ROI/mo
                    </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <section className="section section-lg section-coins">
                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/path3.png")}
                        />
                        <Container>
                            <Row>
                                <Col md="4">
                                    <hr className="line-info" />
                                    <h1>
                                        Choose the plan{" "}
                                        <span className="text-info">that fits your needs</span>
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <Card className="card-coin card-plain">
                                        <CardHeader>
                                            <img
                                                alt="..."
                                                className="img-center img-fluid"
                                                src={require("assets/img/bitcoin.png")}
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <Row>

                                                <Col className="text-center" md="12">
                                                    <h1 className="card-title" ><small>$</small>500</h1>
                                                    <UncontrolledTooltip placement="bottom" target="help-tip">
                                                        Earn 18% Return on investment every month, on your Dip Starter, Interest Account(DIA)
                                                    </UncontrolledTooltip>
                                                    <span>Dip Starter-Interest Account</span>
                                                    <hr className="line-primary" />
                                                    <h5 id="help-tip">18.0% R0I / month</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <ListGroup>

                                                    <ListGroupItem><i class="tim-icons icon-chart-bar-32"></i>&nbsp; $500 - $4999</ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-alert-circle-exc" />&nbsp;&nbsp; 24/7 Support</ListGroupItem>
                                                    <ListGroupItem><i class="icon-calendar-60" />&nbsp;&nbsp; 10months Duration</ListGroupItem>
                                                </ListGroup>
                                            </Row>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button className="btn-simple" color="primary">
                                                Get plan
                      </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="card-coin card-plain">
                                        <CardHeader>
                                            <img
                                                alt="..."
                                                className="img-center img-fluid"
                                                src={require("assets/img/etherum.png")}
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col className="text-center" md="12">
                                                    <h1 className="card-title" ><small>$</small>10,000</h1>
                                                    <UncontrolledTooltip placement="bottom" target="help-pro">
                                                        Earn 25.0% Return on investment every month, on your Dip Pro, Interest Account(DIA)
                                                    </UncontrolledTooltip>
                                                    <span>Dip Pro-Interest Account</span>
                                                    <hr className="line-primary" />
                                                    <h5 id="help-pro">25.0% R0I / month</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <ListGroup>
                                                    <ListGroupItem><i class="tim-icons icon-chart-bar-32"></i>&nbsp; $10,000 - $99,999</ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-alert-circle-exc" />&nbsp;&nbsp; 24/7 Support</ListGroupItem>
                                                    <ListGroupItem><i class="icon-calendar-60" />&nbsp;&nbsp; 12months Duration</ListGroupItem>
                                                </ListGroup>
                                            </Row>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button className="btn-simple" color="success">
                                                Get plan
                      </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="card-coin card-plain">
                                        <CardHeader>
                                            <img
                                                alt="..."
                                                className="img-center img-fluid"
                                                src={require("assets/img/ripp.png")}
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col className="text-center" md="12">
                                                    <h1 className="card-title" ><small>$</small>100,000</h1>
                                                    <UncontrolledTooltip placement="bottom" target="help-ent">
                                                        Earn 35.0% Return on investment every month, on your Dip Enterprise, Interest Account(DIA)
                                                    </UncontrolledTooltip>
                                                    <span>Dip Enterprise-Interest Account</span>
                                                    <hr className="line-primary" />
                                                    <h5 id="help-ent">35.0% R0I / month</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <ListGroup>
                                                    <ListGroupItem><i class="tim-icons icon-chart-bar-32"></i>&nbsp; Unlimited</ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-alert-circle-exc" />&nbsp;&nbsp; 24/7 Support</ListGroupItem>
                                                    <ListGroupItem><i class="icon-calendar-60" />&nbsp;&nbsp; 18months Duration</ListGroupItem>
                                                </ListGroup>
                                            </Row>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button className="btn-simple" color="info">
                                                Get plan
                      </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <Footer />
                </div>
            </>
        );
    }
}

export default RatePage;
