import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CategorySelection extends Component {
  handleCategoryClick = ({ key, value }) => {
    //Push to new URL
    this.props.history.push(
      `/results?brands=null&minPrice=null&maxPrice=null&${
        key !== "productCategories"
          ? "productCategories=null"
          : `${key}=${value}`
      }&${key !== "skinTypes" ? "skinTypes=null" : `${key}=${value}`}&${
        key !== "skinConcerns" ? "skinConcerns=null" : `${key}=${value}`
      }`
    );
  };

  render() {
    const { config } = this.props;
    return (
      <div class="overflow-y-scroll scrollbar flex">
        {config.map((category) => {
          const { key, value, name, imageUrl } = category;
          return (
            <div class="px-10">
              <img
                src={imageUrl.default}
                alt="skin"
                class="h-100px w-100px rounded-full border cursor-pointer"
                onClick={() => this.handleCategoryClick({ key, value })}
              />
              <div class="pt-5 justify-self-end text-center">{name}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(CategorySelection);
