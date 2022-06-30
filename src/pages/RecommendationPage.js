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
    this.setState({ results });
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
        <div class="py-10 px-5 sm:px-10 text-slate-gray text-lg font-light tracking-tight text-center">
          Analysis of 100+ reviews shows that these products are the
          <b> perfect matches</b> for you!
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
          {this.getFormattedResults()}
        </div>
      </div>
    );
  }
}

export default withRouter(RecommendationPage);
