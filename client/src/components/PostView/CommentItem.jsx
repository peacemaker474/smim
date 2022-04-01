import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CommentDropDown } from './CommentDropDown';
import moreIcon from '../../asset/icon/icon-more.svg';
import heartFill from '../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../asset/icon/icon-heart-line.svg';

const CommentItemBox = styled.div`
  margin-bottom: 15px;
  display: flex;
  position: relative;
  margin-left: ${(props) => (props.extend === 'reply' ? '49px' : '0')};
`;

const ProfileImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #091d3e;
  margin-right: 11px;
`;

const CommentDropDownBtn = styled.button`
  width: 24px;
  height: 24px;
  margin-left: 10px;
  background: url(${moreIcon});
`;

const CommentContent = styled.div`
  width: 709px;
`;

const CommentText = styled.span`
  display: block;
  margin: 0;
  margin-bottom: 12px;
  line-height: 23px;
`;

const CommentEtc = styled.div`
  display: flex;
  align-items: center;
`;

const CommentDate = styled.span`
  margin-right: 12px;
  font-size: 14px;
`;

const CommentReBtn = styled.button`
  margin-right: 12px;
  font-size: 14px;
  font-weight: 600;
`;

const CommentLike = styled.button`
  width: 20px;
  height: 20px;
  background: url(${(props) => (props.like ? `${heartFill}` : `${heartLine}`)});
  background-position: center;
  background-size: contain;
`;

const CommentEditInput = styled.input`
  width: 709px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
`;

const CommentStrongName = styled.strong`
  font-weight: 600;
`;

const commentData = {
  userName: '도기석',
};

export default function CommentItem({ handleReplyClick, extend }) {
  const dropDownRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [like, setLike] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const btnRef = useRef();

  const handleLikeBtnClick = () => {
    setLike(!like);
  };

  const handleDropDownShow = () => {
    setIsVisible(!isVisible);
  };

  const handleTextWrite = () => {
    console.log(commentData.userName);
    handleReplyClick();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isVisible && btnRef.current && !btnRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isVisible]);

  return (
    <>
      <CommentItemBox extend={extend}>
        <ProfileImg />
        <CommentContent>
          {isEditing ? (
            <CommentEditInput></CommentEditInput>
          ) : (
            <>
              <CommentText>
                <CommentStrongName>도기석</CommentStrongName> 안녕하세요 오늘은 비도오고 그래서 짧고
                좋은 글귀를 모아왔어요 사랑이야기 이별이야기 힘들때 위로되는 글귀등등 여러가지
                준비해왔어요 공감되고 힘이되는 글이 많으면 좋겠어요 이런 감성 글귀들은 새벽에 읽어야
                되게 감동이 증폭되는거 같아요
              </CommentText>
              <CommentEtc>
                <CommentDate>2일</CommentDate>
                <CommentReBtn onClick={handleTextWrite}>답글 달기</CommentReBtn>
                <CommentLike onClick={handleLikeBtnClick} like={like} />
              </CommentEtc>
            </>
          )}
        </CommentContent>
        <CommentDropDownBtn ref={btnRef} onClick={handleDropDownShow}>
          {isVisible && <CommentDropDown ref={dropDownRef} setIsEditing={setIsEditing} />}
        </CommentDropDownBtn>
      </CommentItemBox>
    </>
  );
}
