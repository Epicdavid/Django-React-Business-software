
import React from "react";
import { connect } from "react-redux";


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js"
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import { logout } from "../store/actions/auth";

// sections for this page/view

import Signup from "views/IndexSections/Signup.js";
import Basics from "views/IndexSections/Basics.js";

class Index extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
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
            <Basics />
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
    logout: () => dispatch(logout())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);