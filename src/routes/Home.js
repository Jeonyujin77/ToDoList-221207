import React from "react";
import Template from "../components/Template";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoList";

export const Home = () => {
  return (
    <Template>
      <TodoInsert />
      <TodoList />
    </Template>
  );
};
