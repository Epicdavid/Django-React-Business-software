
import React from "react";
import { connect } from "react-redux";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js"
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import * as action from "../store/actions/auth";

// sections for this page/view

import Signup from "views/IndexSections/Signup.js";

class Index extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
    this.props.onTryReg();
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <ExamplesNavbar {...this.props} />
        <div className="wrapper">
          <PageHeader />
          <div className="main">

            <Signup />
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryReg: () => dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);