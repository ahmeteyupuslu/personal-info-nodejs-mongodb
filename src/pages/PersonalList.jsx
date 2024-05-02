import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import Header from "../components/Header";

const TableBox = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:3000/users/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
          console.log(res.data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isAdminStr = localStorage.getItem("isAdmin");
  const isAdmin = isAdminStr === "true" ? true : false;

  const [userIdToDelete, setUserIdToDelete] = useState("");
  const handleInputID = (e) => {
    setUserIdToDelete(e.target.value);
  };
  const handleDeletebyID = () => {
    axios
      .delete("http://127.0.0.1:3000/users/delete-user/" + userIdToDelete, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== userIdToDelete));
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  return (
    <>
      <Header />
      <Link to="/logout">Çıkış Yap</Link>
      <div className="tablo">
        <div
          className="tableTop"
          style={{ height: isAdmin === true ? "80px" : "40px" }}
        >
          <p>DATABASE</p>
          {isAdmin === true ? (
            <>
              <div>
                <Link to={`/personal-table/add-user`}>
                  <button className="addUser">KULLANICI EKLE</button>
                </Link>
                <input
                  id="noDel"
                  type="text"
                  placeholder="ID"
                  onChange={handleInputID}
                />
                <button className="noDel" onClick={handleDeletebyID}>
                  SİL
                </button>
              </div>
              <p className="delnote">
                Silmek istediğiniz verinin ID'sini giriniz
              </p>
            </>
          ) : null}
        </div>
        <table id="personelTable">
          <thead>
            <tr>
              <th>NO</th>
              <th>ID</th>
              <th>AD</th>
              <th>SOYAD</th>
              <th>TC</th>
              <th>TELEFON</th>
              <th>EMAIL</th>
              {isAdmin === true ? <th>ADMIN</th> : null}
              {isAdmin === true ? <th>DÜZENLE</th> : null}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.tc}</td>
                <td>{user.tel}</td>
                <td>{user.email}</td>
                {isAdmin === true ? (
                  <td>
                    {user.isAdmin === true ? (
                      <span>&#10004;</span>
                    ) : (
                      <span>&#x2716;</span>
                    )}
                  </td>
                ) : null}
                {isAdmin === true ? (
                  <td>
                    <Link to={`/personal-table/edit-user/${user._id}`}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="edit-btn"
                      />
                    </Link>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(user._id)}
                      className="delete-btn"
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableBox;
