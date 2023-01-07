import { useContext } from "react";
import { AppContext } from "../App";

function Logout() {
  const context = useContext(AppContext);
  if (!context) return <div>Error</div>;

  return (
    <button
      onClick={(e) => context.handleLogout()}
      className="btn btn-link nav-link"
    >
      Log Out
    </button>
  );
}

export default Logout;
