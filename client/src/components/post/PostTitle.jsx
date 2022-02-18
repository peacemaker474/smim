import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { titleAdd } from '../../redux/post/action';


// PostTitle onChange할 때마다 focus를 잃는 현상 때문에 밖에 배치
const TitleWrap = styled.div`
  margin-top: 30px;
`;

const TitleInput = styled.input`
  width: 500px;
  height: 40px;
  border: 2px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  border-radius: 3px;
  @media screen and (max-width: 550px) {
    width: 400px;
  }
`;


function PostTitle() {

  const dispatch = useDispatch();
  const title = useSelector((state)=> state.postReducer.title)

  const titleHandler = (e) => {
      dispatch(titleAdd(e.target.value))
  }
  console.log(title)

    return (
      <TitleWrap>
        <TitleInput placeholder='제목' palette='yellow' onChange={titleHandler} value={title}/>
      </TitleWrap>
    );
}

export default PostTitle
