import React from "react";
import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const { todos, isLoading, error } = useSelector((state) => state.todo);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul>
      {isLoading
        ? "Loading...."
        : todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)}
    </ul>
  );
};

export default TodoList;
