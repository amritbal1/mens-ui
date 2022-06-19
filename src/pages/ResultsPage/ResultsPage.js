import { PureComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { isEmpty } from "../../utils/objectUtils";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ResultsContext from "../../pages/ResultsPage/ResultsContext";
import { CONTEXT } from "../../utils/enums";
import SortingPanel from "../../components/SortingPanel/SortingPanel";
import { sortingPillConfig } from "./config/sortingPillConfig";
import { getFilterPillsConfig } from "../../utils/filterPillUtils/getFilterPillConfig";
import { getProductResultsData } from "../../services/ProductResultsService/ProductResultsService";
import { createResultsPagePayload } from "../../utils/payloadUtils/payloadCreators/createResultsPagePayload";
import { getValueFromUrl } from "../../utils/urlUtils/urlValueGetter";
import Navbar from "../../components/Navbar/Navbar";
import { infiniteScrollText } from "../../utils/styles";

class ResultsPage extends PureComponent {
  getFormattedResults = ({ productResults }) => {
    const { history } = this.props;
    if (isEmpty(productResults)) return null;
    return productResults.map((result) => {
      const {
        productDetails: { productId },
      } = result;
      return <ProductCard key={productId} data={result} history={history} />;
    });
  };

  fetchProductData = async () => {
    //Add new page number to URL
    const currPageNumber = getValueFromUrl({ param: "pageNumber" });
    const validCurrentPageNumber =
      currPageNumber &&
      currPageNumber !== "null" &&
      !isNaN(Number(currPageNumber))
        ? Number(currPageNumber)
        : 1;
    const incrementedPageNumber = validCurrentPageNumber + 1;

    //Fetch Data with new URL params
    const payload = createResultsPagePayload({
      overridePageNum: incrementedPageNumber,
    });
    const resultsData = await getProductResultsData({ payload });
    if (!resultsData) return;
    //Only update the URL pageNumber param if data was returned
    if (!isEmpty(resultsData.results)) {
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.set("pageNumber", incrementedPageNumber);
      this.props.history.push({
        pathname: this.props.match.path,
        search: searchParams.toString(),
      });
    }
    const { results } = resultsData;
    const { productResults } = this.context;
    const newProductDataSet = [...productResults, ...results];

    this.context.setProductResults({
      productResults: newProductDataSet,
      hasMoreResults: !isEmpty(results),
    });
  };

  async componentDidMount() {
    const payload = createResultsPagePayload({});
    const resultsData = await getProductResultsData({ payload });
    if (!resultsData) return;
    const { results } = resultsData;
    this.context.setProductResults({
      productResults: results,
      hasMoreResults: !isEmpty(results),
    });
  }

  render() {
    const { initialSortPillDisplayValue, backgroundOpacity } = this.props;
    const { productResults, hasMoreResults } = this.context;
    const formattedResults = this.getFormattedResults({ productResults });
    const filterPillsConfig = getFilterPillsConfig({
      showPricePill: true,
      showProductCategories: true,
    });

    return (
      <div>
        <Navbar />
        <div class="h-60px"></div>
        <div class={`px-2 md:px-6 mx-auto pt-8 ${backgroundOpacity}`}>
          <div class="flex flex-col sm:px-6">
            <div class="md:px-2 md:mb-4 flex-nowrap">
              <FilterPanel
                contextName={CONTEXT.RESULTS}
                filterPillsConfig={filterPillsConfig}
              />
            </div>
            <div class="self-end my-4">
              <SortingPanel
                contextName={CONTEXT.RESULTS}
                initialSortPillDisplayValue={initialSortPillDisplayValue}
                sortingPillConfig={sortingPillConfig}
              />
            </div>
            {productResults && productResults.length === 0 && (
              <div class="self-center pt-4 text-gray-700">
                Sorry, we couldn't find any results. Try another search?
              </div>
            )}
            {productResults && productResults.length > 0 && (
              <div class="h-screen">
                <InfiniteScroll
                  dataLength={productResults.length}
                  next={this.fetchProductData}
                  hasMore={hasMoreResults}
                  loader={<div class={infiniteScrollText}>Loading...</div>}
                  endMessage={
                    <div class={infiniteScrollText}>
                      You have seen all the products
                    </div>
                  }
                >
                  {/* Had to add this hack of pb-48 to make the div go below the viewport because the infinite scroll shows Loading text on Ipad Pro (https://github.com/ankeetmaini/react-infinite-scroll-component/issues/47) */}
                  <div class="grid grid-cols-2 gap-x-4 md:grid-cols-3 lg:gap-y-8 lg:grid-cols-4 mt-5 pb-48">
                    {formattedResults}
                  </div>
                </InfiniteScroll>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ResultsPage.contextType = ResultsContext;

export default ResultsPage;
