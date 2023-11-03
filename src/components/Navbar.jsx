import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()
  const handelLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
        setUserName(user.email)
        navigate('/')
      }else{
        setUserName('')
        navigate('/auth')
      }
    });
  }, []);
  return (
    <nav className="flex justify-between py-4 px-4">
      <div>
        <h1 className="text-2xl font-bold ">MyTodo</h1>
        {userName && <p>{userName}</p>}
      </div>
      <div>
        {userId ? (
          <button
            className="px-3 py-1 rounded-md bg-gray-400"
            onClick={handelLogout}
          >
            Log out
          </button>
        ) : (
        <div>
          <Link to={"/auth"} className="px-3 py-2 mr-3 rounded-md bg-gray-400">
            Login
          </Link>
          <Link to={"/auth"} className="px-3 py-2 rounded-md bg-gray-600">
            Signup
          </Link>
        </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
