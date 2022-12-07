import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: tomato;
  color: #fff;
  padding: 20px;
`;

const Template = ({ children }) => {
  return (
    <Container>
      <Header>
        <h1>TODOLIST</h1>
      </Header>
      <div>{children}</div>
      <Footer>&copy; yujin {new Date().getFullYear()}</Footer>
    </Container>
  );
};

export default Template;
