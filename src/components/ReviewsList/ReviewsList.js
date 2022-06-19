import React, { PureComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { withRouter } from "react-router-dom";
import ReviewsListContext from "./ReviewsListContext";
import { isEmpty } from "../../utils/objectUtils";
import FormattedReviews from "./FormattedReviews";
import FilterPanel from "../FilterPanel/FilterPanel";
import SortingPanel from "../SortingPanel/SortingPanel";
import { CONTEXT, SORTING_FIELD } from "../../utils/enums";
import { sortingPillConfig } from "./config/sortingPillConfig";
import { getFilterPillsConfig } from "../../utils/filterPillUtils/getFilterPillConfig";
import MediaLightbox from "../MediaLightbox/MediaLightbox";
import { infiniteScrollText, productPageTitleStyle } from "../../utils/styles";

class ReviewsList extends PureComponent {
  state = {
    showLightboxModal: false,
    lightboxImages: null,
    indexToDisplay: 0,
  };

  handleLightboxCloseButtonFn = () => {
    this.setState({ showLightboxModal: false });
  };

  handleImageClickFn = ({ images, indexToDisplay }) => {
    this.setState({
      showLightboxModal: true,
      lightboxImages: images,
      indexToDisplay,
    });
  };

  render() {
    return (
      <ReviewsListContext.Consumer>
        {(context) => {
          const { reviewsToDisplay, fetchReviews, hasMoreResults } = context;
          const { showLightboxModal, lightboxImages, indexToDisplay } =
            this.state;
          const filterPillsConfig = getFilterPillsConfig({
            withImages: true,
            showBrandsPill: false,
          });
          return (
            <div class="w-90vw mx-auto">
              <div class={`${productPageTitleStyle} py-4 mb-2`}>Reviews</div>
              <div class="flex flex-col xl:w-2/3">
                <div class="flex-nowrap">
                  <FilterPanel
                    contextName={CONTEXT.REVIEWS_LIST}
                    filterPillsConfig={filterPillsConfig}
                  />
                </div>
                <div class="self-end my-4">
                  <SortingPanel
                    contextName={CONTEXT.REVIEWS_LIST}
                    initialSortPillDisplayValue={SORTING_FIELD.MOST_RECENT}
                    sortingPillConfig={sortingPillConfig}
                  />
                </div>
                {isEmpty(reviewsToDisplay) && (
                  <div class="self-center text-slate-gray mb-20 mt-10 text-sm font-light">
                    Hmm, no results. Try changing the filters
                  </div>
                )}
                {!isEmpty(reviewsToDisplay) && (
                  <div>
                    <InfiniteScroll
                      dataLength={reviewsToDisplay.length}
                      next={fetchReviews}
                      hasMore={hasMoreResults}
                      loader={<div class={infiniteScrollText}>Loading...</div>}
                      endMessage={
                        <div class={infiniteScrollText}>
                          You have seen all the reviews
                        </div>
                      }
                    >
                      <div class="flex flex-col">
                        <FormattedReviews
                          reviews={reviewsToDisplay}
                          handleImageClickFn={this.handleImageClickFn}
                        />
                      </div>
                    </InfiniteScroll>
                  </div>
                )}
                {showLightboxModal && (
                  <MediaLightbox
                    showLightboxModal={true}
                    indexToDisplay={indexToDisplay}
                    images={lightboxImages}
                    handleLightboxCloseButtonFn={
                      this.handleLightboxCloseButtonFn
                    }
                  />
                )}
              </div>
            </div>
          );
        }}
      </ReviewsListContext.Consumer>
    );
  }
}

ReviewsList.contextType = ReviewsListContext;
export default withRouter(ReviewsList);
