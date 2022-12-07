import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remove, toggle } from "../redux/todoSlice";
import styled from "styled-components";
import { __removeTodo, __toggleTodo } from "../lib/api";

const Item = styled.li`
  list-style: none;
  min-width: 600px;
  margin: 10px;
  a {
    display: inline-block;
    width: 400px;
    color: inherit;
    text-decoration: ${(props) => props.isDone};
  }
  &:hover {
    color: tomato;
  }
`;
const Button = styled.button`
  border: 0;
  background-color: ${(props) => props.bgColor};
  width: 50px;
  height: 30px;
  color: #fff;
  border-radius: 7px;
  cursor: pointer;
  margin-right: 5px;
`;

const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();
  const { id, title, done } = todo;

  const onRemove = async (id) => {
    dispatch(__removeTodo(id)).then((response) => {
      dispatch(remove(id));
    });
  };

  const onToggle = async (id) => {
    dispatch(__toggleTodo(todo)).then((response) => {
      dispatch(toggle(id));
    });
  };

  return (
    <Item isDone={done ? "line-through" : "none"}>
      <Link to={`/todo/${id}`} state={todo}>
        {`${id}» ${title}`}
      </Link>
      <Button bgColor="tomato" type="button" onClick={() => onRemove(id)}>
        삭제
      </Button>
      <Button bgColor="gray" type="button" onClick={() => onToggle(id)}>
        {done ? "취소" : "완료"}
      </Button>
    </Item>
  );
};

export default React.memo(TodoListItem);
