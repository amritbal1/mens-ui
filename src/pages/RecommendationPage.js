import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";

//Page to display recommended products
class RecommendationPage extends PureComponent {
  getFormattedResults = () => {
    const { history, results } = this.props;
    return results.map((result) => {
      const {
        productDetails: { productId },
      } = result;
      return <ProductCard key={productId} data={result} history={history} />;
    });
  };

  render() {
    return (
      <div class="w-full px-2 sm:px-0 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-12 sm:gap-y-12 font-montserrat">
        {this.getFormattedResults()}
      </div>
    );
  }
}

export default withRouter(RecommendationPage);
