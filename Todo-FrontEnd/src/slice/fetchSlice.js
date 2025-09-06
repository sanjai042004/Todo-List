import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../services";

// 1. Fetch Todos this is backEnd code
export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const res = await API.get("/todo/get");
  return res.data.data
});

// 2. Add Todo
export const addTodo = createAsyncThunk("todo/createTodo",
  async (task, thunkAPI) => {
    try {
      const response = await API.post("todo/create", {
        title: task,
        isCompleted: false,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//update todo

export const updateTodo = createAsyncThunk("todo/updateTodo", async ({ id, task, isCompleted }, thunkAPI) => {
  try {
    const res = await API.put(`/todo/update/${id}`, {
      title: task,
      isCompleted, 
    });
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// 4. Delete Todo

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  await API.delete(`/todo/delete/${id}`); 
  return id;
});


const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    task: "",
    loading: false,
    error: null,
    editId: null,
    isCompleted:false
  },
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },

    resetTask: (state) => {
      state.task = "";
      state.editId = null;
    },
  },
  

  extraReducers: (builder) => {
    builder
      // Fetch

      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error=null
      })

      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos=action.payload;
      })

      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      // Add
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.task = "";
      })


      // Update
      .addCase(updateTodo.fulfilled, (state, action) => {

        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        state.task = "";
        state.editId = null;
      })

      // Delete
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  }
});

export const { setTask, setEditId, resetTask } = todoSlice.actions;
export const todoReducer= todoSlice.reducer;
