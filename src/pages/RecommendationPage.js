import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import { isEmpty } from "../utils/objectUtils";

//Page to display recommended products
class RecommendationPage extends PureComponent {
  getFormattedResults = () => {
    const { history, results, userCountry } = this.props;
    return results.map((result) => {
      const {
        productDetails: { productId, unavailableCountries = [] },
      } = result;
      if (
        !isEmpty(unavailableCountries) &&
        Array.isArray(unavailableCountries) &&
        unavailableCountries.find((el) => el === userCountry)
      ) {
        return null;
      } else {
        return (
          <ProductCard
            key={productId}
            data={result}
            history={history}
            userCountry={userCountry}
          />
        );
      }
    });
  };

  render() {
    return (
      <div class="w-full px-2 sm:px-0 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-12 sm:gap-y-12 font-jost">
        {this.getFormattedResults()}
      </div>
    );
  }
}

export default withRouter(RecommendationPage);
