import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../../../styles/common/tag';

export default function PostTagListPresenter({ hashtag }) {
  return (
    <PostTagBox>
      {hashtag && hashtag.map((el, idx) => <TagItem key={idx}>{el}</TagItem>)}
    </PostTagBox>
  );
}

const PostTagBox = styled.div`
  display: flex;
`;

const TagItem = styled(Tag)`
  & + span {
    margin-left: 10px;
  }
`;
