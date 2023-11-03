import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import { db, auth } from "../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import Todo from "../components/Todo";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(null);
  const todoCollection = collection(db, "todo");

  const getTodos = async () => {
    if (userId) {
      const getquery = query(todoCollection, where("userId", "==", userId));
      const data = await getDocs(getquery);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(filteredData);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        navigate("/");
      } else {
        setUserId(null);
        navigate("/auth");
      }
    });
    getTodos();
  }, [userId]);
  return (
    <>
      <main className="w-full h-screen bg-blue-300 flex items-center justify-center flex-col">
        <div className="w-[400px]">
          <TodoForm todoList={getTodos} />
          {todos.map((todo) => (
            <Todo {...todo} key={todo.id} todoList={getTodos} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
