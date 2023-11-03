import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import {onAuthStateChanged} from 'firebase/auth'

const TodoForm = ({todoList}) => {
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const [todo, setTodo] = useState({ title: "", completed: false });
  const todoCollection = collection(db, 'todo')
  const handelSubit = async (e) => {
    e.preventDefault();
    await addDoc(todoCollection, {...todo, userId})
    todoList()
    setTodo({ title: "", completed: false })
  };
  const handelChange = (e) => {
    setTodo({ ...todo, title: e.target.value });
  };
  useEffect(()=>{
    onAuthStateChanged(auth, user=>{
      if(user){
        setUserId(user.uid)
      }else{
        setError("Please Login/Signup")
      }
    })
  }, [])
  return (
    <form
      className="px-10 py-5 bg-slate-200 w-full mb-3"
      onSubmit={handelSubit}
    >
      {error && <p className="text-red-700">{error}</p>}
      <h1 className="font-bold text-2xl text-center mb-4">MyTodo</h1>
      <input
        type="text"
        value={todo.title}
        onChange={(e) => handelChange(e)}
        className="bg-gray-400 px-4 py-1 outline-none rounded-md text-black"
      />
      <button className="bg-blue-300 px-3 py-1 rounded-md ml-2">Add</button>
    </form>
  );
};

export default TodoForm;
