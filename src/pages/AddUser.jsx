import React, { useState } from "react";
import AnkaSymbol from "../assets/ankaSymbol.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    tc: "",
    tel: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleAdminChange = (e) => {
    setValues({...values, isAdmin: e.target.checked });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:3000/users/add-user", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("User added successfully");
          navigate("/personal-table");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="addeditbox">
      <div className="background1">
        <img
          className="symbol1"
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
        <div className="registerTable">
          <div className="registerRow"></div>
          <form onSubmit={handleSubmit}>
            <div className="registerRow">
              <label htmlFor="firstName">Ad</label>
              <input
                type="text"
                id="firstName"
                placeholder="Adınızı Giriniz. *"
                required
                onChange={handleInput}
              />
              {errors.firstName && <span>{errors.firstName}</span>}
            </div>
            <div className="registerRow">
              <label htmlFor="lastName">Soyad</label>
              <input
                type="text"
                id="lastName"
                placeholder="Soyadınızı Giriniz. *"
                required
                onChange={handleInput}
              />
              {errors.lastName && <span>{errors.lastName}</span>}
            </div>
            <div className="registerRow">
              <label htmlFor="tc">TC</label>
              <input
                type="text"
                inputMode="numeric"
                id="tc"
                placeholder="TC Giriniz. *"
                maxLength={11}
                minLength={11}
                pattern="\d{11}"
                required
                onChange={handleInput}
              />
            </div>
            <div className="registerRow">
              <label htmlFor="tel">Telefon</label>
              <input
                type="text"
                id="tel"
                placeholder="Telefon Giriniz."
                onChange={handleInput}
                required
              />
            </div>
            <div className="registerRow">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email Giriniz. *"
                required
                onChange={handleInput}
              />
            </div>
            <div className="registerRow">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                placeholder="Şifre Giriniz. *"
                required
                onChange={handleInput}
              />
            </div>
            <div className="registerEditRowAdmin">
              <label htmlFor="isAdmin">Admin</label>
              <input
                className="adminCheck"
                type="checkbox"
                id="isAdmin"
                onChange={handleAdminChange}
              />
            </div>
            <div className="registerRow">
              <p>Lütfen bütün alanları eksiksiz şekilde doldurunuz</p>
              <button className="black-b">Gönder</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default AddUser;
