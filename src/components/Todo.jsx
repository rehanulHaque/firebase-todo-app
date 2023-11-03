import React from "react";
import { db } from "../config/firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";

const Todo = ({ id, title, completed , todoList}) => {
  const handelChange = async (id) => {
    try {
      const todoDoc = doc(db, "todo", id);
      await updateDoc(todoDoc, { completed: !completed });
      todoList()
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async (id) => {
    try {
      const todoDoc = doc(db, "todo", id);
      await deleteDoc(todoDoc);
      todoList()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-400 rounded-md mb-1 w-full">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => handelChange(id)}
      />
      <h2>{title}</h2>
      <button onClick={e=> handelDelete(id)} className="px-3 py-2 rounded-md bg-black text-white">Delete</button>
    </div>
  );
};

export default Todo;
