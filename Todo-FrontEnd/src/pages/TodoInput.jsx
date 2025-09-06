import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask, addTodo, updateTodo, resetTask } from "../slice";

export const TodoInput = () => {
  const dispatch = useDispatch();
  const { task, editId } = useSelector((state) => state.todo);
  const trimmedTask = task.trim();

  const handleChange = useCallback((e) => {
    dispatch(setTask(e.target.value));
  }, [dispatch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!trimmedTask) return;

    if (editId) {
      dispatch(updateTodo({ id: editId, task: trimmedTask }));
    } else {
      dispatch(addTodo(trimmedTask));
    }

    dispatch(resetTask());
  }, [dispatch, editId, trimmedTask]);

  return (
 <form
  onSubmit={handleSubmit}
  className="flex flex-row items-center gap-2 bg-white p-3 rounded-xl shadow-md w-full"
>
  <input
    type="text"
    value={task}
    onChange={handleChange}
    placeholder="Enter a task..."
    className="w-2/3 sm:flex-1 border border-blue-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
  />
  <button
    className="w-1/3 sm:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
  >
    {editId ? "Update" : "Add"}
  </button>
</form>


  );
};
