import { CURRENCY_SIGN } from "../../../utils/pricingUtils/index";

export const getSingleAffiliateOption = ({ affiliateOption }) => {
  const { name: affiliateName, priceData } = affiliateOption;
  const { affiliatePrice, affiliateCurrency } = priceData;
  return (
    <div class="flex mb-4 items-end">
      <span class="mr-1 text-4xl leading-8">
        {CURRENCY_SIGN[affiliateCurrency]}
        {affiliatePrice}
      </span>
      <span>from {affiliateName}</span>
    </div>
  );
};

export const getMultipleAffiliateOptions = ({
  affiliateData,
  selectedPricingOptionName,
  handlePricingOptionClickFn,
}) => {
  const options = affiliateData.map((option, i) => {
    const { name: affiliateName, priceData, productUrl } = option;
    const { affiliatePrice, affiliateCurrency } = priceData;
    const borderStyle = i === affiliateData.length - 1 ? "" : "border-r";
    const isSelected = selectedPricingOptionName === affiliateName;
    let width = "w-full";
    if (affiliateData.length === 2) {
      width = "w-1/2";
    } else if (affiliateData.length === 3) {
      width = "w-1/3";
    }
    const selectedStyle = isSelected
      ? "bg-lilac-50 border-2 border-lilac-500 rounded-md"
      : "md:hover:text-lilac-700";
    const styles = `${borderStyle} ${selectedStyle} ${width} flex flex-col justify-center items-center md:hover:bg-lilac-50 cursor-pointer`;
    const selectedFont = isSelected
      ? "text-lilac-600 text-xl font-semibold"
      : "text-base";
    const fontStyle = `${selectedFont} mr-1 leading-8`;
    const selectedAffiliateFont = isSelected ? "text-lilac-700" : "";
    const affiliateFontStyle = `${selectedAffiliateFont} text-base`;
    return (
      <div
        class={styles}
        key={i}
        onClick={(e) =>
          handlePricingOptionClickFn(affiliateName, productUrl, e)
        }
      >
        <span class={fontStyle}>
          {CURRENCY_SIGN[affiliateCurrency]}
          {affiliatePrice}
        </span>
        <span class={affiliateFontStyle}>{affiliateName}</span>
      </div>
    );
  });
  return <div class="flex rounded-md border mb-8">{options}</div>;
};
