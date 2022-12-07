import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 할일 목록 조회
export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 할일 추가
export const __addTodo = createAsyncThunk(
  "addTodo",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3001/todos", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 할일 삭제
export const __removeTodo = createAsyncThunk(
  "removeTodo",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/todos/${payload}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 할일 상태 변경
export const __toggleTodo = createAsyncThunk(
  "toggleTodo",
  async (payload, thunkAPI) => {
    try {
      const { id, done } = payload;
      const response = await axios.patch(`http://localhost:3001/todos/${id}`, {
        done: !done,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 할일 내용 수정
export const __modifyTodo = createAsyncThunk(
  "modifyTodo",
  async (payload, thunkAPI) => {
    try {
      const { id, title } = payload;
      const response = await axios.patch(`http://localhost:3001/todos/${id}`, {
        title,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
