import ReviewsListContext from "../../components/ReviewsList/ReviewsListContext";
import ResultsContext from "../../pages/ResultsPage/ResultsContext";
import { isEmpty } from "../objectUtils";
import { CONTEXT } from "../enums";

export const getMappedFilterDataValues = ({ filteringData, fields }) => {
  return fields.map((field) => {
    return (
      !isEmpty(filteringData) && filteringData[field].map((item) => item.value)
    );
  });
};

export const contextConsumerSwitcher = ({ contextName, childFn }) => {
  if (contextName === CONTEXT.REVIEWS_LIST) {
    return (
      <ReviewsListContext.Consumer>
        {(reviewsListContext) => {
          return childFn({
            context: reviewsListContext,
            contextName: contextName,
          });
        }}
      </ReviewsListContext.Consumer>
    );
  } else if (contextName === CONTEXT.RESULTS) {
    return (
      <ResultsContext.Consumer>
        {(resultsContext) => {
          return childFn({
            context: resultsContext,
            contextName: contextName,
          });
        }}
      </ResultsContext.Consumer>
    );
  }
};
