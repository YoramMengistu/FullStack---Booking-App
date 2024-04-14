import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./placesPage";
import AccountNav from "./accountNav";

function ProfilePage() {
  const { user, loading, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async (e) => {
    await axios.post("http://localhost:5000/logout");
    localStorage.removeItem("token");
    setUser(null);
    setRedirect("/");
  };

  if (loading && !user) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && (
        <div className="text-center max-w-sm   mx-auto ">
          Logged in as..{user.name} email: {user.email} <br />
          <button onClick={logout} className="primary mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}

export default ProfilePage;
