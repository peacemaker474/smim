import React from 'react';
import styled from 'styled-components';

function PostTitlePresenter({ register, errors }) {
  return (
    <TitleWrap>
      <TitleInput
        placeholder='제목'
        palette='yellow'
        error={errors.title}
        maxLength='25'
        {...register('title', { required: 'This is required' })}
      />
    </TitleWrap>
  );
}

export default PostTitlePresenter;

const TitleWrap = styled.div`
  margin-top: 30px;
`;

const TitleInput = styled.input`
  height: 40px;
  border: 2px solid
    ${({ palette, theme, error }) => (error ? theme.color['lightGray'] : theme.color[palette])};
  border-radius: 3px;
  @media screen and (max-width: 612px) {
    width: 100%;
  }
  @media (min-width: 612px) {
    width: 413px;
  }
`;
