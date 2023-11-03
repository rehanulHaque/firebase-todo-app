import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const navigate = useNavigate();

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handelSignup = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-full h-screen flex items-center justify-around flex-col">
      <div className="p-4 border border-black rounded-md">
        <h1 className="font-bold text-2xl text-center mb-3">Login</h1>
        <form onSubmit={handelLogin}>
          <input
            type="text"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="border border-black rounded-md outline-none px-3 py-1"
          />
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="border border-black rounded-md outline-none px-3 py-1 block my-2"
          />
          <button className="px-3 py-1 rounded-md bg-gray-400">Login</button>
        </form>
      </div>
      <div className="p-4 border border-black rounded-md">
        <h1 className="font-bold text-2xl text-center mb-3">Signup</h1>
        <form onSubmit={handelSignup}>
          <input
            type="text"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            className="border border-black rounded-md outline-none px-3 py-1"
          />
          <input
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            className="border border-black rounded-md outline-none px-3 py-1 block my-2"
          />
          <button className="px-3 py-1 rounded-md bg-gray-400">Signup</button>
        </form>
      </div>
    </main>
  );
};

export default Auth;
