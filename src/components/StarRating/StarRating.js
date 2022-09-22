import React, { PureComponent } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import "./StarRating.css";

class StarRating extends PureComponent {
  state = {
    hover: null,
  };

  handleClick = (ratingValue) => {
    const { starRatingHandler } = this.props;
    starRatingHandler({ starRating: ratingValue });
  };

  handleHover = (ratingValue) => {
    this.setState({ hover: ratingValue });
  };

  renderStars = () => {
    const { hover } = this.state;
    const { rating } = this.props;
    return [...Array(5)].map((star, index) => {
      const ratingValue = index + 1;
      const starColor =
        ratingValue <= (hover || rating) ? "#9ecfca" : "#e4e5e9";
      return (
        <label key={index}>
          <input
            type="radio"
            name="rating"
            id="rating"
            value={ratingValue}
            onClick={() => this.handleClick(ratingValue)}
          />
          <StarIcon
            className="star h-7 w-7"
            color={starColor}
            onMouseEnter={() => this.handleHover(ratingValue)}
            onMouseLeave={() => this.handleHover(null)}
          />
        </label>
      );
    });
  };

  render() {
    const starsToRender = this.renderStars();
    return <div class="flex">{starsToRender}</div>;
  }
}

export default StarRating;
