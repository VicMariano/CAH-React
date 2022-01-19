import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-self: flex-end;
  appearance: none;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: 15px;
  box-sizing: border-box;
  color: ${(props) => props.color};
  cursor: pointer;
  display: inline-block;
  margin: 0.5em;
  min-height: 3em;
  min-width: 5em;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  &:disabled {
    pointer-events: none;
    color: #797979;
    background-color: ${(props) => props.disabledBgColor};
    border: 2px solid #353535;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }
  &.black {
    background-color: #000000;
    border: 2px solid #1a1a1a;
    color: #ffffff;
    &:disabled {
      background-color: rgb(63, 63, 63);
      color: rgb(144 144 144);
    }
  }
  &.white {
    background-color: #ffffff;
    border: 2px solid #c9c9c9;
    color: #000000;
    &:disabled {
      background-color: #bebebe;
      color: #636363;
    }
  }
`;
