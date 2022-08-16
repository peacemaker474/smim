import styled from "styled-components";

export const ListsUl = styled.ul`
  width: 95%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(3, 185px);
  grid-template-rows: repeat(3, 140px);
  gap: 10px;

  @media ${({ theme }) => theme.device.webMiddle} {
    grid-template-columns: repeat(2, 250px);
    grid-template-rows: repeat(3, 133px);
    justify-content: space-evenly;
  }

  @media ${({ theme }) => theme.device.ipad} {
    grid-template-columns: repeat(2, 225px);
    grid-template-rows: repeate(4, 135px);
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

  p {
    width: 100%;
    height: 100%;
  }
`;

export const Writer = styled.p`
  height: 17%;
  font-size: 0.6em;
  align-self: flex-end;
  padding: 5px;
  text-align: end;
`;

export const NotWriteLists = styled.h2`
  text-decoration: underline;
`;