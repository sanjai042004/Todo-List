import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTodos } from "../slice";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const dispatch = useDispatch();

  const {
    todos = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.todo || {});

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-blue-500 text-lg">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 text-xl font-semibold">
        No todos yet. Add one!
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};
