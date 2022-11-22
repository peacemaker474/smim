import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createComment } from '../../../redux/slice/commentCreateSlice';
import { postCommentCreate, putCommentEdit } from '../../../networks/comment/http';
import TextArea from '../../../components/common/atoms/Textarea';

interface CmntFromProps {
  parentId: string;
  id: string;
  groupId: string;
  onFormInputCancel: () => void | null;
  isTargetVisible: boolean;
  changedText: string;
  onTextChange: () => void;
  writer: string;
}

function CmntForm({
  parentId,
  id,
  groupId,
  isTargetVisible,
  onFormInputCancel,
  changedText,
  onTextChange,
  writer,
}: CmntFromProps) {
  const loginState = useAppSelector((state) => state.user);
  const { accessToken } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, setValue, setFocus, watch } = useForm();
  const dispatch = useAppDispatch();
  let data = watch('comment');

  let STATE = '';
  if (!parentId && !id) {
    STATE = 'main';
  } else if (!parentId && id) {
    STATE = 'main Edit';
  } else if (parentId === groupId && !id) {
    STATE = 'main Reply';
  } else if (parentId === groupId && id) {
    STATE = 'main Reply Edit';
  } else if (parentId !== groupId && id) {
    STATE = 'Reply Reply Edit';
  } else {
    STATE = 'Reply Reply';
  }

  if (!onFormInputCancel) {
    onFormInputCancel = () => setValue('comment', '');
  }

  const handleCommentTextareaSubmit = (data: any, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addData = data.comment.replaceAll('\n', '<br>');

    // if (accessToken) {
    //   if (id) {
    //     handleCommentEdit(e, addData);
    //   } else {
    //     handleCommentCreate(e, addData);
    //   }
    //   setValue('comment', '');
    // }
  };

  useEffect(() => {
    if (isTargetVisible) {
      setFocus('comment');
      setValue('comment', changedText);
    }
  }, [isTargetVisible, setFocus, changedText, setValue]);

  const handleCommentCreate = async (e: any, data: string) => {
    const response = await postCommentCreate({ post_id: id, content: data, parent_id: parentId }, accessToken);

    if (response.data.success) {
      dispatch(
        createComment({
          _id: response.data.comment_id,
          writer: {
            userId: loginState.id,
            nickname: loginState.name,
            imageUrl: loginState.imgUrl,
          },
          parent_id: parentId,
          group_id: groupId,
          post_id: id,
          text: data,
        }),
      );
      //   if (parentId) {
      //     onFormInputCancel(e);
      //   }
    }
  };

  const handleCommentEdit = async (e: React.MouseEvent<HTMLButtonElement>, data: string) => {
    const response = await putCommentEdit(id, { post_id: id, content: data }, accessToken);

    // if (response.data.success) {
    //   onTextChange(data.replace('<br>', '\n'));
    //   onFormInputCancel(e);
    // }
  };

  const handleKeyDownCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === '13' && e.shiftKey === true) {
      e.preventDefault();
      setValue('comment', data + '\n');
    }
    if (e.code === '13' && e.shiftKey === false) {
      e.preventDefault();
      //   handleSubmit(handleCommentTextareaSubmit(watch(), e));
    }
  };

  return (
    <CmntFormTag
      groupId={groupId}
      method="POST"
      //   onSubmit={handleSubmit(handleCommentTextareaSubmit)}
    >
      {/* <UserImage width={'42px'} height={'42px'} imgUrl={loginState.imgUrl} /> */}
      <CmntInputDiv state={STATE}>
        <TextArea
          onKeyDownCheck={handleKeyDownCheck}
          register={register}
          setValue={setValue}
          value={data}
          groupId={groupId}
          parentId={parentId}
          id={id}
          writer={writer}
        />
        {id ? (
          <CmntBtnBox state={STATE}>
            <CmntBtn type="button" onClick={onFormInputCancel}>
              취소
            </CmntBtn>
            <CmntBtn type="submit" groupId={groupId} parentId={parentId}>
              수정
            </CmntBtn>
          </CmntBtnBox>
        ) : (
          <CmntBtnBox state={STATE}>
            <CmntBtn type="button" onClick={onFormInputCancel}>
              취소
            </CmntBtn>
            <CmntBtn type="submit" groupId={groupId} parentId={parentId}>
              게시
            </CmntBtn>
          </CmntBtnBox>
        )}
      </CmntInputDiv>
    </CmntFormTag>
  );
}

export default CmntForm;

const CmntFormTag = styled.form<{ groupId: string }>`
  width: auto;
  margin-bottom: ${({ groupId }) => (groupId ? '15px' : '38px')};
  margin-top: ${({ groupId }) => (groupId ? '15px' : '0')};
  display: flex;
  align-items: flex-start;
`;

const CmntInputDiv = styled.div<{ state: string }>`
  @media (max-width: 612px) {
    width: ${({ state }) =>
      state === 'main'
        ? '283px'
        : state === 'main Edit'
        ? '283px'
        : state === 'main Reply'
        ? '193px'
        : state === 'main Reply Edit'
        ? '218px'
        : state === 'Reply Reply'
        ? '128px'
        : '218px'};
    display: ${({ state }) =>
      state === 'main'
        ? 'flex'
        : state === 'main Edit'
        ? 'flex'
        : state === 'main Reply'
        ? 'block'
        : state === 'main Reply Edit'
        ? 'block'
        : state === 'Reply Reply'
        ? 'block'
        : 'block'};
  }
  @media (min-width: 612px) and (max-width: 768px) {
    width: ${({ state }) =>
      state === 'main'
        ? '460px'
        : state === 'main Edit'
        ? '460px'
        : state === 'main Reply'
        ? '374px'
        : state === 'main Reply Edit'
        ? '396px'
        : state === 'Reply Reply'
        ? '308px'
        : '396px'};
  }
  @media (min-width: 768px) and (max-width: 992px) {
    width: ${({ state }) =>
      state === 'main'
        ? '595px'
        : state === 'main Edit'
        ? '595px'
        : state === 'main Reply'
        ? '506px'
        : state === 'main Reply Edit'
        ? '530px'
        : state === 'Reply Reply'
        ? '441px'
        : '530px'};
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    width: ${({ state }) =>
      state === 'main'
        ? '725px'
        : state === 'main Edit'
        ? '725px'
        : state === 'main Reply'
        ? '636px'
        : state === 'main Reply Edit'
        ? '660px'
        : state === 'Reply Reply'
        ? '572px'
        : '660px'};
  }
  @media (min-width: 1200px) {
    width: ${({ state }) =>
      state === 'main'
        ? '855px'
        : state === 'main Edit'
        ? '855px'
        : state === 'main Reply'
        ? '766px'
        : state === 'main Reply Edit'
        ? '790px'
        : state === 'Reply Reply'
        ? '701px'
        : '790px'};
  }
  display: flex;
  align-items: flex-end;
`;

const CmntBtnBox = styled.div<{ state: string }>`
  display: flex;
  @media (max-width: 612px) {
    margin: ${({ state }) =>
      state === 'main'
        ? '0px'
        : state === 'main Edit'
        ? '0px'
        : state === 'main Reply'
        ? '5px 0 0 103px'
        : state === 'main Reply Edit'
        ? '5px 0 0 127px'
        : state === 'Reply Reply'
        ? '5px 0 0 37px'
        : '5px 0 0 127px'};
  }
`;

const CmntBtn = styled.button<{ groupId?: string; parentId?: string }>`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;
