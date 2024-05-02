import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnkaSymbol from "../assets/ankaSymbol.png";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(UserContext);
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
      axios
        .post("http://127.0.0.1:3000/login", values)
        .then((res) => {
          if (res.data.success) {
            
            toast.success("Login successfully");
            localStorage.setItem("token", res.data.token);
            console.log(res.data.user);
            localStorage.setItem("isAdmin", res.data.user.isAdmin);
            setUser(res.data.user);
            navigate("/personal-table");
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors);
            console.log(serverErrors);
            serverErrors.forEach((error) => {
              toast.error(error.msg); // Display error message as toast
            });
          } else {
            console.log(err);
            
          }
        });
        
       
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <img
          className="loginSymbol"
          src={AnkaSymbol}
          alt="AnkaGeo"
          width={300}
          height={300}
        />
        <img
          className="logo1"
          src="https://ankageo.com/wp-content/uploads/2021/02/katman-2@2x.png"
          alt="AnkaGeo"
        />
        <div className="loginpageInput">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Şifre"
                value={values.password}
                onChange={handleInput}
                required
              />
            </div>
            <button type="submit">Giriş yap</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
