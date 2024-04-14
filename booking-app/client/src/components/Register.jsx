import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/register", {
          name,
          email,
          password,
        })
        .then((res) => res.data);
    } catch (err) {
      alert("Registration failed. please try again.", err);
    }
  };
  return (
    <div className="p-4 ">
      <h1 className="mt-4 text-4xl text-center h-24 flex flex-col justify-center  items-center">
        Register
      </h1>

      <form className="max-w-md mx-auto " onSubmit={registerUser}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter you name here.."
        />
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
        <button className="primary">Register</button>
        <div className="py-2 text-center text-gray-500">
          Allready a member ?
          <Link className="underline text-black mx-1" to={"/login"}>
            Login now
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
