import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import AWS from "aws-sdk";
import {
  postNewReview,
  postNewReviewImages,
} from "../../services/ReviewFormServices/ReviewService/mockData/NewReviewService";
import { createNewReviewPayload } from "../../services/ReviewFormServices/ReviewService/mockData/payloadCreator";
import {
  QUESTIONNAIRE_BOOLEAN_RESPONSE_VALUES,
  QUESTIONNAIRE_RESPONSE_VALUES,
} from "../../utils/enums";
import { getSubmitButtonEnabledState } from "./utils/getSubmitButtonEnabledState";
import {
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
  REGION,
  S3_BUCKET,
  IDENTITY_POOL_ID,
} from "../../aws-config";
import Navbar from "../../components/Navbar/Navbar";
import { putObjectsInBucket } from "./utils/imagePoster";
import ReviewScreen1 from "./screens/reviewScreen1";
import ReviewScreen2 from "./screens/reviewScreen2";
import ReviewScreen3 from "./screens/reviewScreen3";
import Wizard from "../../components/Wizard/Wizard";
import { getWizardLabels } from "./utils/options";
class ReviewPage extends PureComponent {
  //Selected answers from review form
  state = {
    starRating: null,
    brand: null,
    productId: null,
    productName: "",
    productNameS3: "",
    wouldRepurchaseValue: "",
    skinConcerns: {},
    skinTypes: {},
    productCharacteristics: {},
    reviewTextDetails: { summary: "", pros: [], cons: [] },
    speedOfResults: { value: "", unit: null },
    reviewImages: [],
    beforeImages: [],
    afterImages: [],
    screenNumberToRender: 1,
  };

  handleScreenButtonClick = ({ screenNumberToRender }) => {
    this.setState({ screenNumberToRender });
  };

  handleS3Upload = async ({ reviewId }) => {
    const { reviewImages, beforeImages, afterImages, productNameS3 } =
      this.state;
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });
    //Initialize the Amazon Cognito credentials provider
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID,
    });
    const s3Bucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const imageUrls = putObjectsInBucket({
      s3Bucket,
      images: reviewImages,
      s3UrlPrefix: `products/${productNameS3}/reviewImages/productImages/${reviewId}`,
    });
    const beforeImageUrls = putObjectsInBucket({
      s3Bucket,
      images: beforeImages,
      s3UrlPrefix: `products/${productNameS3}/reviewImages/beforeImages/${reviewId}`,
    });
    const afterImageUrls = putObjectsInBucket({
      s3Bucket,
      images: afterImages,
      s3UrlPrefix: `products/${productNameS3}/reviewImages/afterImages/${reviewId}`,
    });
    await postNewReviewImages({
      reviewId,
      payload: {
        reviewImages: imageUrls,
        beforeAfterImageData: {
          beforeImages: beforeImageUrls,
          afterImages: afterImageUrls,
        },
        hasImages:
          imageUrls.length > 0 ||
          beforeImageUrls.length > 0 ||
          afterImageUrls.length > 0,
      },
    });
  };

  handleImageFiles = ({ files }) => {
    this.setState({ reviewImages: files });
  };

  handleBeforeImageFiles = ({ files }) => {
    this.setState({ beforeImages: files });
  };

  handleAfterImageFiles = ({ files }) => {
    this.setState({ afterImages: files });
  };

  //Speed of results UNIT handler
  speedOfResultsUnitsHandler = ({ unit }) => {
    const { speedOfResults } = this.state;
    const updatedUnit = { ...speedOfResults, unit };
    this.setState({ speedOfResults: updatedUnit });
  };

  //Speed of results VALUE handler
  speedOfResultsValueHandler = ({ value }) => {
    const { speedOfResults } = this.state;
    const updatedValue = { ...speedOfResults, value };
    this.setState({ speedOfResults: updatedValue });
  };

  handleTextDetailsChange = ({ value, fieldToChange }) => {
    const { reviewTextDetails } = this.state;
    const updatedReviewTextDetails = {
      ...reviewTextDetails,
      [fieldToChange]: value,
    };
    this.setState({ reviewTextDetails: updatedReviewTextDetails });
  };

  starRatingHandler = ({ starRating }) => {
    this.setState({ starRating });
  };

  brandSelectorHandler = ({ brand }) => {
    this.setState({ brand, productId: null, productName: "" });
  };

  productSelectorHandler = ({ productId, productName, productNameS3 }) => {
    this.setState({ productId, productName, productNameS3 });
  };

  handleSubmitButton = async () => {
    const { history } = this.props;
    const {
      starRating,
      productId,
      wouldRepurchaseValue,
      skinConcerns,
      skinTypes,
      productCharacteristics,
      reviewTextDetails,
      speedOfResults,
    } = this.state;
    const payload = createNewReviewPayload({
      starRating,
      productId,
      wouldRepurchaseValue,
      skinConcerns,
      skinTypes,
      productCharacteristics,
      reviewTextDetails,
      speedOfResults,
    });
    const response = await postNewReview({ payload });
    if (!response) return;
    else {
      await this.handleS3Upload({ reviewId: response });
      history.push("/submit-page");
    }
  };

  handleWouldRepurchase = ({ selectedResponse }) => {
    this.setState({
      wouldRepurchaseValue:
        QUESTIONNAIRE_BOOLEAN_RESPONSE_VALUES[selectedResponse],
    });
  };

  handleSkinTypes = ({ optionValue, selectedResponse }) => {
    const { skinTypes } = this.state;
    if (selectedResponse) {
      const responseValue = QUESTIONNAIRE_RESPONSE_VALUES[selectedResponse];
      const updatedSkinTypes = { ...skinTypes, [optionValue]: responseValue };
      this.setState({ skinTypes: updatedSkinTypes });
    } else if (selectedResponse === null) {
      const { [optionValue]: omit, ...rest } = skinTypes;
      this.setState({ skinTypes: rest });
    }
  };

  handleSkinConcerns = ({
    optionValue,
    selectedResponse,
    removeResponse = false,
  }) => {
    const { skinConcerns } = this.state;
    if (removeResponse) {
      const { [optionValue]: omit, ...rest } = skinConcerns;
      this.setState({ skinConcerns: rest });
    } else {
      const responseValue = QUESTIONNAIRE_RESPONSE_VALUES[selectedResponse];
      const updatedSkinConcerns = {
        ...skinConcerns,
        [optionValue]: responseValue,
      };
      this.setState({ skinConcerns: updatedSkinConcerns });
    }
  };

  handleProductCharacteristics = ({ optionValue, selectedResponse }) => {
    const { productCharacteristics } = this.state;
    const responseValue = QUESTIONNAIRE_RESPONSE_VALUES[selectedResponse];
    const updatedProductCharacteristics = {
      ...productCharacteristics,
      [optionValue]: responseValue,
    };
    this.setState({ productCharacteristics: updatedProductCharacteristics });
  };

  getScreenToRender = () => {
    const {
      brand,
      productName,
      starRating,
      screenNumberToRender,
      wouldRepurchaseValue,
      skinTypes,
      skinConcerns,
      productCharacteristics,
      reviewTextDetails,
      speedOfResults,
    } = this.state;
    const {
      summary: reviewTitle,
      pros: textPros,
      cons: textCons,
    } = reviewTextDetails;
    const isSubmitButtonEnabled = getSubmitButtonEnabledState({
      state: this.state,
    });
    switch (screenNumberToRender) {
      case 1:
        return (
          <ReviewScreen1
            selectedBrand={brand}
            selectedProduct={productName}
            speedOfResults={speedOfResults}
            starRating={starRating}
            wouldRepurchaseValue={wouldRepurchaseValue}
            brandSelectorHandler={this.brandSelectorHandler}
            productSelectorHandler={this.productSelectorHandler}
            starRatingHandler={this.starRatingHandler}
            handleWouldRepurchase={this.handleWouldRepurchase}
            speedOfResultsValueHandler={this.speedOfResultsValueHandler}
            speedOfResultsUnitsHandler={this.speedOfResultsUnitsHandler}
            handleScreenButtonClick={this.handleScreenButtonClick}
            handleProductCharacteristics={this.handleProductCharacteristics}
            productCharacteristics={productCharacteristics}
          />
        );
      case 2:
        return (
          <ReviewScreen2
            skinTypes={skinTypes}
            skinConcerns={skinConcerns}
            handleSkinTypes={this.handleSkinTypes}
            handleSkinConcerns={this.handleSkinConcerns}
            handleScreenButtonClick={this.handleScreenButtonClick}
          />
        );
      case 3:
        return (
          <ReviewScreen3
            textPros={textPros}
            textCons={textCons}
            reviewTitle={reviewTitle}
            isSubmitButtonEnabled={isSubmitButtonEnabled}
            handleTextDetailsChange={this.handleTextDetailsChange}
            handleImageFiles={this.handleImageFiles}
            handleBeforeImageFiles={this.handleBeforeImageFiles}
            handleAfterImageFiles={this.handleAfterImageFiles}
            handleScreenButtonClick={this.handleScreenButtonClick}
            handleSubmitButton={this.handleSubmitButton}
          />
        );
      default:
        return (
          <ReviewScreen1
            selectedBrand={brand}
            selectedProduct={productName}
            speedOfResults={speedOfResults}
            starRating={starRating}
            wouldRepurchaseValue={wouldRepurchaseValue}
            brandSelectorHandler={this.brandSelectorHandler}
            productSelectorHandler={this.productSelectorHandler}
            starRatingHandler={this.starRatingHandler}
            handleWouldRepurchase={this.handleWouldRepurchase}
            speedOfResultsValueHandler={this.speedOfResultsValueHandler}
            speedOfResultsUnitsHandler={this.speedOfResultsUnitsHandler}
            handleProductCharacteristics={this.handleProductCharacteristics}
            productCharacteristics={productCharacteristics}
          />
        );
    }
  };

  render() {
    const { backgroundOpacity } = this.props;
    const { screenNumberToRender } = this.state;

    return (
      <div>
        <Navbar />
        <div class="h-60px"></div>
        <div
          class={`flex flex-col space-y-8 p-4 sm:px-24 lg:px-28 pt-8 pb-16 sm:space-y-10 ${backgroundOpacity}`}
        >
          <div class="uppercase tracking-wide text-lg text-slate-gray">
            Write A Review
          </div>
          <Wizard
            steps={getWizardLabels({
              handleClick: this.handleScreenButtonClick,
              screenNumberToRender,
            })}
            activeStep={screenNumberToRender - 1}
          />
          <div class="border rounded-md shadow-md p-3">
            {this.getScreenToRender()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ReviewPage);
