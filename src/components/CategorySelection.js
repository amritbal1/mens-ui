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
      }&${key !== "skinConcerns" ? "skinConcerns=null" : `${key}=${value}`}`
    );
  };

  render() {
    const { config, type } = this.props;
    return (
      <div
        class={`overflow-y-scroll scrollbar w-full flex justify-start ${
          type === "skinConcerns" ? "xl:justify-center" : "lg:justify-center"
        }`}
      >
        {config.map((category) => {
          const { key, value, name, imageUrl } = category;
          return (
            <div class="px-4 md:px-10 pb-2 cursor-pointer md:hover:opacity-60 flex flex-col justify-center items-center flex-shrink-0">
              <img
                src={imageUrl.default}
                alt="skin"
                class="h-130px w-130px sm:h-150px sm:w-150px md:h-180px md:w-180px lg:h-200px lg:w-200px rounded-full cursor-pointer"
                onClick={() => this.handleCategoryClick({ key, value })}
              />
              <div class="pt-3 justify-self-end text-center uppercase text-xs sm:text-sm md:text-base lg:text-lg">
                {name}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(CategorySelection);
