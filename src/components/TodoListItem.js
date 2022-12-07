import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remove, toggle } from "../redux/todoSlice";
import axios from "axios";
import styled from "styled-components";

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
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      dispatch(remove(id));
    } catch (error) {
      window.location.href = `/error/${error.code}`;
    }
  };

  const onToggle = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        ...todo,
        done: !todo.done,
      });
      dispatch(toggle(id));
    } catch (error) {
      window.location.href = `/error/${error.code}`;
    }
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
