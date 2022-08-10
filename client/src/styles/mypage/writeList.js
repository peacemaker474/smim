import styled from "styled-components";

export const ListsUl = styled.ul`
  width: 95%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;

  @media screen and (max-width: 1180px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Listli = styled.li`
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
  font-weight: bold;
`;

export const ListContent = styled.p`
  width: 100%;
  height: 53%;
  padding: 7px;
  font-size: 0.7em;
  align-self: flex-start;
  line-height: 15px;
  word-spacing: 1px;
`;

export const Writer = styled.p`
  height: 17%;
  font-size: 0.6em;
  align-self: flex-end;
  padding: 5px;
  height: 10%;
  text-align: end;
`;

export const NotWriteLists = styled.h2`
  text-decoration: underline;
`;