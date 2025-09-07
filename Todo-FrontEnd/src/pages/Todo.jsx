import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { BsClipboardCheckFill } from "react-icons/bs";

export const Todo = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="w-full max-w-xl mx-auto space-y-6">
        <h1 className="text-xl sm:text-3xl font-bold text-blue-950 text-center flex flex-col sm:flex-row justify-center items-center gap-3">
          <span className="text-gray-500"><BsClipboardCheckFill /></span>
           TODO-List
        </h1>
        <TodoInput />
        <TodoList />
      </div>
    </div>
  );
};
