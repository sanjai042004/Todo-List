// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   todos: [],
//   task: "",
//   editIndex: -1,
//   isCompleted: false,
// };
// export const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     setTask: (state, action) => {
//       state.task = action.payload;
//     },
//     addTodo: (state) => {
//       state.todos.push({
//         title: state.task,
//         isCompleted: false,
//       });
//       state.task = "";
//     },

//     toggleComplete: (state, action) => {
//       const index = action.payload;
//       state.todos[index].isCompleted = !state.todos[index].isCompleted;
//     },

//     deleteTodo: (state, action) => {
//       state.todos = state.todos.filter((_, i) => i !== action.payload);
//     },
//     startEdit: (state, action) => {
//       state.editIndex = action.payload;
//       state.task = state.todos[action.payload].title;
//     },
//     updateTodo: (state) => {
//       if (state.editIndex !== -1 && state.task.trim() !== "") {
//         state.todos[state.editIndex].title = state.task;
//         state.editIndex = -1;
//         state.task = "";
//       }
//     },
//   },
// });

// export const {
//   setTask,
//   addTodo,
//   deleteTodo,
//   startEdit,
//   updateTodo,
//   toggleComplete,
// } = todoSlice.actions;

// export const todoReducer = todoSlice.reducer;
