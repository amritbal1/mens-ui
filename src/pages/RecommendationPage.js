import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { getProductResultsData } from "../services/ProductResultsService/ProductResultsService";
import { createResultsPagePayload } from "../utils/payloadUtils/payloadCreators/createResultsPagePayload";
import ProductCard from "../components/ProductCard/ProductCard";
import { isEmpty } from "../utils/objectUtils";

//Page to display recommended products
class RecommendationPage extends PureComponent {
  state = {
    results: [],
  };

  async componentDidMount() {
    const payload = createResultsPagePayload({});
    const resultsData = await getProductResultsData({ payload });
    if (isEmpty(resultsData)) return;
    const { results = [] } = resultsData;
    const firstTwoResults =
      !isEmpty(results) && results.length >= 2 ? [results[0], results[1]] : [];
    this.setState({ results: firstTwoResults });
  }

  getFormattedResults = () => {
    const { results } = this.state;
    return results.map((result) => {
      const {
        productDetails: { productId },
      } = result;
      return <ProductCard key={productId} data={result} />;
    });
  };

  render() {
    return (
      <div class="bg-lilac-10">
        <Navbar />
        <div class="h-60px"></div>
        <div class="py-10 px-5 sm:px-10 text-slate-gray text-xl font-light tracking-tight text-center font-montserrat">
          Analysis of 100+ reviews shows that these products are the
          <b> perfect matches</b> for you!
        </div>
        <div class="grid sm:grid-cols-2 gap-x-2 gap-y-2 font-montserrat">
          {this.getFormattedResults()}
        </div>
      </div>
    );
  }
}

export default withRouter(RecommendationPage);
