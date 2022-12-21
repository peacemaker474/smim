import styled from "styled-components";

export const MyPageInputWrapper = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ChangeInputWrapper = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.device.ipad} {
    input {
      height: 60%;
    }
  }
`;

export const ListsUl = styled.ul<{list: number}>`
  width: 95%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: ${({ list }) => `repeat(${list}, 133px);`}
  gap: 10px;
  @media ${({ theme }) => theme.device.webMiddle} {
    grid-template-columns: repeat(2, 250px);
    justify-content: space-evenly;
  }
  @media ${({ theme }) => theme.device.ipad} {
    grid-template-columns: repeat(2, 225px);
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
  height: 25%;
  font-weight: bold;
`;

export const ListContent = styled.p`
  width: 100%;
  height: 50%;
  padding: 7px;
  font-size: 0.7em;
  align-self: flex-start;
  line-height: 15px;
  word-spacing: 1px;
  word-break: break-all;
  overflow-y: hidden;
  margin-bottom: 10px;
`;

export const Writer = styled.p`
  height: 100%;
  font-size: 0.6rem;
  padding: 5px;
  text-align: end;
`;

export const IsImage = styled.span`
  padding-left: 7px;
`;

export const NotWriteLists = styled.h2`
  text-decoration: underline;
`;