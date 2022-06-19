import { REGION, S3_BUCKET } from "../../aws-config";

export const getUserProfileImage = ({ profileImage }) => {
  return `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${profileImage}`;
};
