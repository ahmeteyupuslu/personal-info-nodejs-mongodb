import { Navigate } from "react-router-dom";
import {history} from "../helpers/history";
import { useSelector } from "react-redux";

function PrivateRoutes({ children }) {
  let auth = useSelector((state) => state.users.isLoggedIn);
  let location = history.location;

  if (auth === false) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoutes;