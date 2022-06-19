export const putObjectsInBucket = ({ s3Bucket, images, s3UrlPrefix }) => {
  let imageUrls = [];
  images.forEach((image, i) => {
    const imageUrl = `${s3UrlPrefix}_${i + 1}`;
    imageUrls.push(imageUrl);
    const params = {
      Body: image,
      Key: imageUrl,
    };
    s3Bucket.putObject(params, (err) => {
      if (err) {
        console.error("Error posting image to S3: ", err);
      }
    });
  });
  return imageUrls;
};
