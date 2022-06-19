import { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    //Do not reset scroll when the product page location URL changes as the changes are due to review filters being changed in which case we want to keep the page scroll on the reviews section
    const isProductPage =
      this.props.location.pathname === "/product" &&
      prevProps.location.pathname === "/product";

    if (!isProductPage && this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
