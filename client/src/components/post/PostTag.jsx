import React, {  useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useDispatch ,useSelector } from 'react-redux';
import { tagAdd, tagDelete } from '../../redux/post/action';

const HashDivrap = styled.div`
  height: 40px;
  margin-top: 30px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border: 2px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  border-radius: 3px;
  padding: 2px 2px 2px 2px;

  .HashWrapOuter {
    height: 30px;
    display: flex;
    flex-wrap: wrap;
  }

  .HashWrapInner {
    margin-top:1px;
    height: 30px;
    background: ${theme.color['yellow']};
    border-radius: 56px;
    padding: 5px;
    color: ${theme.color['navy']};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
    margin-right: 5px;
    cursor: pointer;
  }

  .HashInput {
    width: auto;
    display: inline-flex;
    outline: none;
    cursor: text;
    line-height: 2rem;
    min-width: 8rem;
    border: none;
  }
`;


function PostTag() {

  const dispatch = useDispatch();
  const hashtag = useSelector((state) => state.postReducer.hashtag);
  const hashtagArr = useSelector((state) => state.postReducer.hashArr);
  console.log(hashtag, hashtagArr);

  const onKeyUp = useCallback(
    (e) => {
      const $HashWrapOuter = document.querySelector('.HashWrapOuter');
      const $HashWrapInner = document.createElement('div');
      $HashWrapInner.className = 'HashWrapInner';
      /* 태그를 클릭 이벤트 관련 로직 */
      $HashWrapInner.addEventListener('click', () => {
        $HashWrapOuter?.removeChild($HashWrapInner);
        console.log($HashWrapInner.innerHTML);
        // setHashArr(hashArr.filter((hashtag) => hashtag));
      });

      /* enter 키 코드 :13 */
      if (e.keyCode === 13 && e.target.value.trim() !== '') {
        console.log('Enter Key 입력됨!', e.target.value);
        $HashWrapInner.innerHTML = '#' + e.target.value;
        $HashWrapOuter?.appendChild($HashWrapInner);
        dispatch(tagDelete())
      }
    },
    [hashtag, hashtagArr]
  );

  const onChangeHashtag = (e) => {
    dispatch(tagAdd(e.target.value))
  }

  return (
    <HashDivrap palette='yellow'>
      <div className='HashWrapOuter'></div>
      <input
        className='HashInput'
        type='text'
        value={hashtag}
        onChange={onChangeHashtag}
        onKeyUp={onKeyUp}
        placeholder='해시태그 입력'
      />
    </HashDivrap>
  );
}

export default PostTag
