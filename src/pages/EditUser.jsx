import React, { useState, useEffect } from "react";
import AnkageoWhite from "../assets/AnkageoWhite.png";
import AnkaSymbol from "../assets/ankaSymbol.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    tc: "",
    tel: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:3000/users/edit-user/" + id, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Kullanıcı Başarı ile düzenlendi");
          navigate("/personal-table");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/user/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setValues({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            tc: res.data.tc,
            tel: res.data.tel,
            email: res.data.email,
            password: res.data.password,
            isAdmin: res.data.isAdmin,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleAdminChange = (e) => {
    setValues({...values, isAdmin: e.target.checked });
  };

  return (
    <>
      <div className="addeditbox">
        <div className="background2">
          <img
            className="symbol1"
            src={AnkaSymbol}
            alt="AnkaGeo"
            width={300}
            height={300}
          />
          <img className="logo1" src={AnkageoWhite} alt="AnkaGeo" />
          <div className="registerTable">
            <form onSubmit={handleSubmit}>
              <div className="registerEditRow">
                <label htmlFor="firstName">Ad</label>
                <input
                  name="firstName"
                  type="text"
                  id="edit-name"
                  value={values.firstName}
                  onChange={handleInput}
                />
              </div>
              <div className="registerEditRow">
                <label htmlFor="lastName">Soyad</label>
                <input
                  type="text"
                  name="lastName"
                  id="edit-surname"
                  value={values.lastName}
                  onChange={handleInput}
                />
              </div>
              <div className="registerEditRow">
                <label htmlFor="tc">TC</label>
                <input
                  type="text"
                  id="edit-tc"
                  minLength={11}
                  maxLength={11}
                  name="tc"
                  value={values.tc}
                  onChange={handleInput}
                />
              </div>
              <div className="registerEditRow">
                <label htmlFor="tel">Telefon</label>
                <input
                  type="tel"
                  id="edit-tel"
                  name="tel"
                  value={values.tel}
                  onChange={handleInput}
                />
              </div>
              <div className="registerEditRow">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                />
              </div>
              <div className="registerEditRow">
                <label htmlFor="password">Şifre</label>
                <input
                  type="password"
                  id="edit-password"
                  name="password"
                  onChange={handleInput}
                  placeholder="Yeni Şifre Giriniz"
                />
              </div>
              <div className="registerEditRowAdmin">
                <label htmlFor="isAdmin">Admin</label>
                <input
                  type="checkbox"
                  className="adminCheck"
                  name="isAdmin"
                  id="edit-isAdmin"
                  value={values.isAdmin}
                  checked={values.isAdmin}
                  onChange={handleAdminChange}
                />
              </div>
              <div className="registerEditRow">
                <button className="black-b">Düzenle</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
