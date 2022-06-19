import AWS from "aws-sdk";
import {
  ACCESS_KEY,
  IDENTITY_POOL_ID,
  REGION,
  S3_BUCKET,
  SECRET_ACCESS_KEY,
} from "../../../aws-config";

export const postProfileImageToS3 = ({ userId, profileImageFile }) => {
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });
  //Initialize the Amazon Cognito credentials provider
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
  });
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });
  const profileImageUrl = `users/${userId}`;
  const params = {
    Body: profileImageFile[0],
    Key: profileImageUrl,
  };
  myBucket.putObject(params, (err) => {
    if (err) {
      console.error("Error posting profile image to S3: ", err);
    }
  });
};
