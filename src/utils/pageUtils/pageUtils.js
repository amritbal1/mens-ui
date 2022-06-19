import { isEmpty } from "../objectUtils";
import ProductCard from "../../components/ProductCard/ProductCard";

export const getFormattedResults = ({ results, history }) => {
  if (isEmpty(results)) return null;
  return results.map((result, i) => {
    return <ProductCard key={i} data={result} history={history} />;
  });
};
