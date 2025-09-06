import { useDispatch } from "react-redux";
import { deleteTodo, setTask, setEditId, updateTodo } from "../slice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setEditId(todo._id));
    dispatch(setTask(todo.title));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  const toggleComplete = () => {
    dispatch(
      updateTodo({
        id: todo._id,
        task: todo.title,
        isCompleted: !todo.isCompleted,
      })
    );
  };
  dayjs.extend(relativeTime); 
//   const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleString(); // 👈 readable format
// };

  return (
    <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center bg-white shadow px-4 py-4 sm:px-6 sm:py-5 rounded-xl max-w-2xl gap-3">
      <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={toggleComplete}
          className="mt-1 sm:mt-0 cursor-pointer"/>
          
     <div className="w-full max-w-md break-words">
  <span className={`text-base sm:text-lg ${
      todo.isCompleted ? "line-through text-gray-400" : "text-gray-800"
    }`}>
    {todo.title}
  </span>
  <p className="text-amber-700">Created: {dayjs(todo.createdAt).fromNow()}</p>
</div>
      </div>

      <div className="flex gap-4 text-lg">
        <button onClick={handleEdit} className="text-orange-500 hover:text-orange-600 transition" >
          ✏️
        </button>
        <button onClick={handleDelete} className="text-purple-600 hover:text-purple-700 transition">
          ✖️
        </button>
      </div>
    </div>
  );
};
