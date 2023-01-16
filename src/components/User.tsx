import { useContext } from "react";
import { AppContext } from "../App";

function User() {
  const context = useContext(AppContext);
  if (!context) return <div>Error</div>;

  return (
    <>
      {context.userName.length === 0 ? null : (
        <div className="text-center col-sm-2">
          Logged in as: {context.userName}
        </div>
      )}
    </>
  );
}

export default User;
