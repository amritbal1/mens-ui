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
    const { history } = this.props;
    const { results } = this.state;
    return results.map((result) => {
      const {
        productDetails: { productId },
      } = result;
      return <ProductCard key={productId} data={result} history={history} />;
    });
  };

  render() {
    return (
      <div
        class="min-h-screen bg-gradient-to-r
      from-lilac-50
      via-lilac-100
      to-lilac-200"
      >
        <Navbar />
        <div class="h-60px"></div>
        <div
          class="bg-gradient-to-r
      from-lilac-50
      via-lilac-100
      to-lilac-200"
        >
          <div class="py-10 px-5 sm:px-10 text-slate-gray text-xl font-light tracking-tight text-center font-montserrat">
            Analysis of thousands of reviews shows these products are the
            <b> perfect matches</b> for you!
          </div>
          <div class="px-3 sm:px-0 grid grid-cols-2 sm:grid-cols-3 gap-x-1 sm:gap-x-2 gap-y-2 font-montserrat">
            {this.getFormattedResults()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RecommendationPage);
