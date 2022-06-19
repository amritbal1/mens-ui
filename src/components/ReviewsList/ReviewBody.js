import { getAttributePills } from "./utils/getReviewPills";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";
import { PILL_TYPE } from "../../utils/enums";

export const ReviewBody = ({ criteriaData, reviewTextDetails }) => {
  const { positiveAttributes, negativeAttributes } = criteriaData;
  return (
    <div class="mt-1 px-1 sm:mt-5 sm:px-6">
      <div class="flex flex-col sm:flex-row">
        <br />
        <div class="sm:w-1/2 sm:border-r-2 sm:border-gray-500 sm:border-opacity-30">
          <div class="mb-6 text-slate-gray text-sm">
            What do you like best?
          </div>
          <div class="text-slate-gray font-extralight mb-8">
            <ul>
              {reviewTextDetails.pros.map((pro, i) => {
                return (
                  <li class="mb-1" key={`${i}-pro`}>
                    <div class="flex items-center text-sm">
                      <PlusCircleIcon class="flex-shrink-0 h-4 w-4 text-green-700 mr-2" />
                      {pro}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div class="flex flex-wrap">
            {getAttributePills({
              attributes: positiveAttributes,
              pillType: PILL_TYPE.POSITIVE,
            })}
          </div>
        </div>
        <div class="sm:w-1/2 sm:ml-4 mt-10 sm:mt-0">
          <div class="mb-6 text-slate-gray text-sm">
            What do you dislike?
          </div>
          <div class="text-slate-gray font-extralight mb-8">
            <ul>
              {reviewTextDetails.cons.map((con, i) => {
                return (
                  <div class="flex items-center text-sm" key={`${i}-con`}>
                    <MinusCircleIcon class="flex-shrink-0 h-4 w-4 text-red-700 mr-2" />
                    {con}
                  </div>
                );
              })}
            </ul>
          </div>
          <div class="flex flex-wrap">
            {getAttributePills({
              attributes: negativeAttributes,
              pillType: PILL_TYPE.NEGATIVE,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
