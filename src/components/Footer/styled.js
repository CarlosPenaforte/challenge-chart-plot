import styled from "styled-components";

export const Container = styled.footer`
  margin: 0;
  padding: 0;
  height: 10%;
  background-color: rgb(180, 180, 200);
  box-shadow: inset 0 0 1rem rgba(150,150,170,0.7);
  display: flex;
  align-items: center;
  padding-left: 2rem;
`;

export const Button = styled.button`
  margin: 0;
  padding: 2px 6px;
  border: none;
  background-color: rgb(0, 150, 255);
  border-radius: 5px;
  box-shadow: 0 0 1rem rgba(100, 200, 255, 0.8);
  cursor: pointer;

  p {
    color: rgb(200, 220, 200);
    font-size: 0.7rem;
    font-weight: 600;
  }

  &:hover {
    background-color: rgb(0,180,255);
  }

  &:active {
    background-color: rgb(0,150,255);
  }
`;
