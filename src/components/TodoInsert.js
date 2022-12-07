import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/todoSlice";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
  text-align: center;
`;
const Input = styled.input`
  height: 25px;
  width: 250px;
  margin-right: 5px;
`;
const Button = styled.button`
  border: 0;
  background-color: teal;
  width: 50px;
  height: 30px;
  color: #fff;
  border-radius: 7px;
  cursor: pointer;
`;

const TodoInsert = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const onChange = (event) => {
    setTitle(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (title === "") return;

    const todo = {
      id: Date.now(),
      title,
      done: false,
    };

    try {
      await axios.post("http://localhost:3001/todos", todo);
      dispatch(add(todo));
    } catch (error) {
      window.location.href = `/error/${error.code}`;
    } finally {
      setTitle("");
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        value={title}
        onChange={onChange}
        placeholder="write to do..."
      />
      <Button type="submit">추가</Button>
    </Form>
  );
};

export default TodoInsert;
