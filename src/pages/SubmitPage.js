import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import { withRouter } from "react-router-dom";

class SubmitPage extends Component {
  handleNewReview = () => {
    const { history } = this.props;
    history.push("/new-review");
  };

  handleHomePage = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { backgroundOpacity } = this.props;
    return (
      <div>
        <Navbar />
        <div class="h-60px"></div>
        <div class={`p-4 sm:px-24 lg:px-28 pt-8 ${backgroundOpacity}`}>
          <div class="text-2xl text-lilac-700 text-center pb-6">
            Thank you! Your review has been successfully submitted &#127881;
          </div>
          <div class="flex flex-col sm:flex sm:flex-row flex-wrap justify-center">
            <button
              class="flex justify-center items-center h-48px border border-lilac-600 rounded-md mt-4 mr-2 sm:mr-4 text-lilac-700 bg-white px-2 hover:bg-lilac-100"
              onClick={this.handleNewReview}
            >
              Write another review
            </button>
            <button
              class="flex justify-center items-center h-48px border border-lilac-600 rounded-md mt-4 mr-2 sm:mr-4 text-lilac-700 bg-white px-4 hover:bg-lilac-100"
              onClick={this.handleHomePage}
            >
              Find Skincare products
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SubmitPage);
