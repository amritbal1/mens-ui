export const getMatchDescriptor = ({ overallScore }) => {
  switch (true) {
    case overallScore <= 60:
      return "Poor";
    case overallScore <= 70:
      return "Average";
    case overallScore <= 80:
      return "Good";
    case overallScore <= 90:
      return "Very Good";
    case overallScore <= 100:
      return "Perfect";
    default:
      return "OK";
  }
};