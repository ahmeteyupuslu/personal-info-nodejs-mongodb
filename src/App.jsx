import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import EditUser from "./pages/EditUser";
import PersonalList from "./pages/PersonalList";
import AddUser from "./pages/AddUser";
import NotFound from "./pages/NotFound";

import ProtectedRoutes from "./components/ProtectedRoutes";
import LogOut from "./components/LogOut";

export const UserContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/personal-table",
    element: (
      <ProtectedRoutes>
        <PersonalList />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/personal-table/add-user",
    element: <AddUser />,
  },
  {
    path: "/personal-table/edit-user/:id",
    element: <EditUser />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get("http//127.0.0.1:27017/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
