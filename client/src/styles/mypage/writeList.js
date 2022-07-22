import styled from "styled-components";

export const ListsUl = styled.ul`
  width: 95%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
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
  font-size: 0.9em;
  padding: 7px;
  width: 100%;
  height: 30%;
`;

export const ListContent = styled.p`
  width: 100%;
  height: 60%;
  padding: 7px;
  font-size: 0.7em;
  align-self: flex-start;
`;

export const Writer = styled.p`
  font-size: 12px;
  align-self: flex-end;
  margin-right: 5px;
  height: 10%;
`;

export const NotWriteLists = styled.h2`
  text-decoration: underline;
`;