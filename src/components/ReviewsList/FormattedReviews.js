import { PureComponent } from "react";
import { isEmpty } from "../../utils/objectUtils";
import { ReviewHeader } from "./ReviewHeader";
import { ReviewBody } from "./ReviewBody";
import Carousel from "../Carousel/Carousel";
import { REGION, S3_BUCKET } from "../../aws-config";

class FormattedReviews extends PureComponent {
  render() {
    const { reviews, handleImageClickFn } = this.props;
    return reviews.map((review, i) => {
      const {
        reviewTextDetails,
        userData,
        starRating,
        criteriaData,
        reviewDate,
        reviewImageData,
        beforeAfterImageData,
      } = review;
      const { summary } = reviewTextDetails;
      const reviewImageUrls = !isEmpty(reviewImageData)
        ? reviewImageData.map((imageUrl) => {
            return `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${imageUrl}`;
          })
        : [];
      const beforeImage =
        !isEmpty(beforeAfterImageData) &&
        !isEmpty(beforeAfterImageData.beforeImages)
          ? [`https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${beforeAfterImageData.beforeImages[0]}`]
          : [];
      const afterImage =
        !isEmpty(beforeAfterImageData) &&
        !isEmpty(beforeAfterImageData.afterImages)
          ? [`https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${beforeAfterImageData.afterImages[0]}`]
          : [];
      const allImages = [...reviewImageUrls, ...beforeImage, ...afterImage];
      return (
        <div
          class="flex flex-col sm:flex-row p-2 rounded-md shadow-md mb-6 md:mb-16 border"
          key={`${i}-formattedreview`}
        >
          <div class="w-full md:my-4" key={`${i}-review`}>
            <ReviewHeader
              key={`${i}-reviewheader`}
              userData={userData}
              reviewDate={reviewDate}
              starRating={starRating}
              reviewSummary={summary}
            />
            <ReviewBody
              key={`${i}-reviewbody`}
              index={i}
              criteriaData={criteriaData}
              reviewTextDetails={reviewTextDetails}
            />
            <div class="mt-6 px-6">
              {!isEmpty(allImages) && (
                <Carousel
                  images={allImages}
                  handleImageClickFn={handleImageClickFn}
                  showCursorOnHover={true}
                />
              )}
            </div>
          </div>
        </div>
      );
    });
  }
}

export default FormattedReviews;
