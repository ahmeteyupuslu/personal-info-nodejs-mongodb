import React, {useContext} from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  localStorage.clear();
  setUser(null);
  navigate("/");
  return null;
}

export default LogOut;