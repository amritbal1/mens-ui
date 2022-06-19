import { isEmpty } from "../../utils/objectUtils";
import GaugeChart from "../GaugeChart/GaugeChart";
import { getGaugeChartOptions } from "./utils/getGaugeChartOptions.js";
import { getGaugeConfig } from "./chartConfigs/gaugeConfig";
import RatingStar from "../Rating/Rating";
import { PRODUCT_CHARACTERISTICS_MAP_REVIEW_PAGE } from "../../utils/config";
import { getValueFromDays } from "../../utils/speedOfResultsUtils/speedOfResultsUtil";
import { productPageTitleStyle } from "../../utils/styles";

export const ReviewSummaryPanel = ({ productDetails }) => {
  if (isEmpty(productDetails)) return null;
  const { overallMetrics } = productDetails;
  const {
    wouldRepurchasePercentage,
    skinConcernData,
    skinTypeData,
    productCharacteristicData,
    speedOfResultsDays,
    reviewSummary,
    numberOfReviews,
  } = overallMetrics;

  //Skin Concern
  let finalSkinConcerns = [];
  finalSkinConcerns =
    skinConcernData.length > 3
      ? [skinConcernData[0], skinConcernData[1], skinConcernData[2]]
      : skinConcernData;

  const skinConcernsConfig = finalSkinConcerns.map((skinConcern) => {
    const config = getGaugeConfig({
      chartValue: skinConcern.percentage,
      label: skinConcern.skinConcern,
    });
    return getGaugeChartOptions({
      config,
    });
  });

  //Skin Type
  let finalSkinTypes = [];
  finalSkinTypes =
    skinTypeData.length > 3
      ? [skinTypeData[0], skinTypeData[1], skinTypeData[2]]
      : skinTypeData;

  const skinTypesConfig = finalSkinTypes.map((skinType) => {
    const config = getGaugeConfig({
      chartValue: skinType.percentage,
      label: skinType.skinType,
    });
    return getGaugeChartOptions({
      config,
    });
  });

  const productCharacteristicStarData = productCharacteristicData.map(
    (characteristic) => {
      const { productCharacteristic, percentage } = characteristic;
      const displayName = PRODUCT_CHARACTERISTICS_MAP_REVIEW_PAGE[productCharacteristic];
      const starScore =
        percentage === 0 ? 0 : Math.round((percentage / 20) * 10) / 10;
      return { field: displayName, starScore };
    }
  );

  const { value, unit } = getValueFromDays({ valueInDays: speedOfResultsDays });
  return (
    <div class="px-2 pb-4">
      <div class="mt-4 pl-2">
        <div class={productPageTitleStyle}>
          {`Summary of ${numberOfReviews} review${
            numberOfReviews > 1 ? "s" : ""
          }`}
        </div>
      </div>
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="w-full xl:w-1/3 pl-2 mr-16 flex flex-col mb-10 sm:mb-0">
          <div class="leading-snug text-md text-gray-600 mb-4">
            {reviewSummary}
          </div>
          <div class="flex-col md:flex md:flex-row lg:flex-col lg:w-full h-full my-2 justify-between items-center">
            <div class="w-150px mx-auto">
              <div class="text-slate-gray text-center">
                <span class="text-3xl font-light">
                  {wouldRepurchasePercentage}
                </span>
                <span class="text-base font-light">%</span>
              </div>
              <div class="text-slate-gray text-sm font-light text-center tracking-tight">
                Would buy again
              </div>
            </div>
            <div class="flex flex-col items-center mx-8">
              <div class="mb-2 pt-8">
                <span class="text-3xl font-light text-slate-gray">
                  {`${value} `}
                </span>
                <span class="text-base font-light text-slate-gray">{unit}</span>
              </div>
              <div class="text-sm text-slate-gray font-light tracking-tight w-100px">
                Average time to see results
              </div>
            </div>
            <div class="mx-auto mt-8 w-220px self-center text-slate-gray">
              {productCharacteristicStarData.map((starData, index) => {
                const { field, starScore } = starData;
                return (
                  <div class="flex justify-between mb-1" key={index}>
                    <span class="text-sm font-light">{field}</span>
                    <RatingStar value={starScore} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full xl:w-2/3 flex justify-between md:ml-10">
          <div class="mb-10">
            <div class="uppercase text-slate-gray font-light text-base tracking-tight pb-2">
              Top rated skin types
            </div>
            <div class="flex w-full">
              {skinTypesConfig.map((config) => {
                return (
                  <div class="w-100px sm:w-125px">
                    <GaugeChart options={config} />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div class="uppercase text-slate-gray font-light text-base tracking-tight pb-2">
              Top rated skin concerns
            </div>
            <div class="flex w-full">
              {skinConcernsConfig.map((config) => {
                return (
                  <div class="w-100px sm:w-125px">
                    <GaugeChart options={config} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
