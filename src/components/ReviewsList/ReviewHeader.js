import { REGION, S3_BUCKET } from "../../aws-config";
import RatingStar from "../Rating/Rating";

export const ReviewHeader = ({
  userData = {},
  reviewDate,
  starRating,
  reviewSummary,
}) => {
  const { profileImage = null, displayName = "" } = userData;
  const formattedDate =
    reviewDate &&
    new Date(reviewDate) &&
    new Date(reviewDate).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
  const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${profileImage}`;

  return (
    <div class="flex space-x-10 px-2 sm:px-6 w-full">
      <div class="flex flex-col sm:flex-row flex-shrink-0 text-gray-500">
        <img
          class="w-16 h-16 rounded-full bg-lilac-100 object-cover"
          src={s3ImageUrl}
          alt="user"
        ></img>
        <div class="sm:ml-3 sm:self-end">
          <p class="text-slate-gray font-extralight">{displayName}</p>
          <p class="text-gray-500 font-thin text-xs">{formattedDate}</p>
        </div>
      </div>
      <div class="md:flex">
        <div class="self-start md:mr-6 flex-shrink-0">
          <RatingStar value={starRating} />
        </div>
        <div class="mt-3 sm:mt-0 text-base sm:text-base text-slate-gray font-extralight self-center md:self-start">
          "{reviewSummary}"
        </div>
      </div>
    </div>
  );
};
