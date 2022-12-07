import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modify } from "../redux/todoSlice";
import axios from "axios";
import styled from "styled-components";

const Box = styled.form`
  width: 400px;
  height: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  background-color: ${(props) => props.bgColor};
  padding: 20px;
  margin: 20px 0;
`;

const Input = styled.input`
  height: 25px;
  width: 250px;
  margin-right: 5px;
  vertical-align: middle;
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

const Tag = styled.span`
  display: inline-block;
  height: 25px;
  line-height: 25px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.txtColor};
  vertical-align: middle;
  padding: 2px;
  font-size: 12px;
  font-weight: bold;
`;

export const Detail = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  let { id, title, done } = location.state;
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        title: value,
      });
      dispatch(modify({ id, value }));
      setValue("");
      alert("수정 완료되었습니다.");
    } catch (error) {
      window.location.href = `/error/${error.code}`;
    }
  };

  return (
    <>
      <Link to="/">메인으로</Link>
      <Box onSubmit={onSubmit}>
        <span>ID: {id}</span>
        <ContentBox bgColor="tomato">
          <Input text="text" value={title} readOnly />
          <Tag txtColor="tomato" bgColor="whiteSmoke">
            {done ? "완료" : "진행 중"}
          </Tag>
        </ContentBox>

        {done ? (
          ""
        ) : (
          <ContentBox bgColor="whiteSmoke">
            <div>
              <Tag txtColor="tomato" bgColor="none">
                ❗수정하려면 입력{" "}
              </Tag>
              <Input type="text" value={value} onChange={onChange} />
              <Button type="submit">수정</Button>
            </div>
          </ContentBox>
        )}
      </Box>
    </>
  );
};
