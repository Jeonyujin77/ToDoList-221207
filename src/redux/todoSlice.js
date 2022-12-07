import { createSlice } from "@reduxjs/toolkit";
import { __getTodos, __addTodo, __removeTodo, __toggleTodo } from "../lib/api";

const initialState = {
  todos: [],
  isLoading: false, // 서버에서 todos를 가져오는 상태를 나타내는 값
  error: null, // 서버와의 통신이 실패한 경우
};

// reducer
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action) => {
      const { id, title, done } = action.payload;
      state.todos = [...state.todos, { id, title, done }];
    },
    remove: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggle: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    },
    modify: (state, action) => {
      const { id, title } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      );
    },
  },
  extraReducers: {
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__addTodo.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [__removeTodo.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [__toggleTodo.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { add, remove, toggle, modify } = todoSlice.actions;
export default todoSlice;
