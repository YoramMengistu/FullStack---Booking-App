import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
      alert("Login successful");
      setRedirect(true);
    } catch (err) {
      alert("login failed", err);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="p-4 ">
      <h1 className="mt-4 text-4xl text-center h-24 flex flex-col justify-center  items-center">
        Login
      </h1>

      <form className="max-w-md mx-auto " onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></input>
        <button className="primary">Login</button>
        <div className="py-2 text-center text-gray-500">
          Don't have an account yet ?
          <Link className="underline text-black mx-1" to={"/register"}>
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
