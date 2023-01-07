import { useContext } from "react";
import { AppContext } from "../App";

function BizOnly() {
  const context = useContext(AppContext);
  const biz = context && context.isBiz;

  if (biz) {
    return <h2 className="text-center">You are an admin</h2>;
  }
  return <div className="text-danger">Forbbiden</div>;
}
export default BizOnly;