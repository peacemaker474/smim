import styled from "styled-components";

export const ListsUl = styled.ul`
  width: 95%;
  height: 85%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px;
`;

export const Listli = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
`;

export const Title = styled.h2`
  align-self: flex-start;
  font-size: 16px;
  margin: 5px 0 0 5px;
  height: 30%;
`;

export const ListContent = styled.p`
  height: 60%;
  margin-left: 5px;
  align-self: flex-start;
  font-size: 12px;
  line-height: 15px;
`;

export const Writer = styled.p`
  font-size: 12px;
  align-self: flex-end;
  margin-right: 5px;
  height: 10%;
`;