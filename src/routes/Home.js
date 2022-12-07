import React from "react";
import { useSelector } from "react-redux";
import Template from "../components/Template";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoList";

export const Home = () => {
  const { error } = useSelector((state) => state.todo);
  return (
    <Template>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <>
          <TodoInsert />
          <TodoList />
        </>
      )}
    </Template>
  );
};
