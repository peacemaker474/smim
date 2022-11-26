import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createComment } from '../../../redux/slice/commentCreateSlice';
import { postCommentCreate, putCommentEdit } from '../../../networks/comment/http';
import TextArea from '../../../components/common/atoms/Textarea';
import UserImage from '../../common/atoms/UserImage';

interface CmntFormValue {
  comment: string;
}
interface CmntFromProps {
  parentId?: string | null;
  id?: string | undefined;
  groupId?: string | null | undefined;
  // onFormInputCancel;
  isTargetVisible?: boolean;
  postId: string | undefined;
  // changedText: string;
  // onTextChange: () => void;
  // writer: string;
}

function CmntForm({
  // parentId,
  id,
  groupId,
  isTargetVisible,
  // onFormInputCancel,
  // changedText,
  // onTextChange,
  // writer,
  postId,
  parentId = null,
}: CmntFromProps) {
  const loginState = useAppSelector((state) => state.user);
  const { accessToken } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, setValue, setFocus, watch } = useForm<CmntFormValue>();
  const dispatch = useAppDispatch();
  const data = watch('comment');
  const formRef = useRef<HTMLFormElement>(null);

  const STATE = 'main';
  const onFormInputCancel = () => setValue('comment', '');

  // const handleCommentTextareaSubmit = (data: CmntFormValue) => {
  //   const addData = data.comment.replaceAll('\n', '<br>');

  //   if (accessToken) {
  //     // if (id) {
  //     //   handleCommentEdit(e, addData);
  //     // } else {
  //     handleCommentCreate(addData);
  //     // }
  //     setValue('comment', '');
  //   }
  // };

  // useEffect(() => {
  //   if (isTargetVisible) {
  //     setFocus('comment');
  //     setValue('comment', changedText);
  //   }
  // }, [isTargetVisible, setFocus, changedText, setValue]);

  const handleCommentCreate = async (data: string) => {
    const response = await postCommentCreate({ post_id: postId, content: data, parent_id: parentId }, accessToken);

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
          post_id: postId,
          text: data,
        }),
      );

      onFormInputCancel();
    }
  };

  // const handleCommentEdit = async (e: React.MouseEvent<HTMLButtonElement>, data: string) => {
  //   const response = await putCommentEdit(id, { post_id: id, content: data }, accessToken);

  //   if (response.data.success) {
  //     onTextChange(data.replace('<br>', '\n'));
  //     onFormInputCancel();
  //   }
  // };

  const handleKeyDownCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Textarea line-change event
    if (e.code === 'Enter' && e.shiftKey === true) {
      e.preventDefault(); // Enter prevent
      setValue('comment', `${data}\n`); // value에 enter값 추가하기
    } else if (e.code === 'Enter' && e.shiftKey === false) {
      e.preventDefault(); // Enter prevent
    }
  };

  return (
    <CmntFormForm
      groupId={groupId}
      method="POST"
      ref={formRef}
      onSubmit={handleSubmit((d: CmntFormValue) => handleCommentCreate(d.comment))}
    >
      <UserImage width="42px" height="42px" imgUrl={loginState.imgUrl} />
      <CmntInputDiv state={STATE}>
        <TextArea
          onKeyDownCheck={handleKeyDownCheck}
          register={register}
          setValue={setValue}
          value={data}
          groupId={groupId}
          parentId={parentId}
          id={id}
          // writer={writer}
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
    </CmntFormForm>
  );
}

export default CmntForm;

const CmntFormForm = styled.form<{ groupId: string | null | undefined }>`
  width: auto;
  margin-bottom: ${({ groupId }) => (groupId ? '15px' : '38px')};
  margin-top: ${({ groupId }) => (groupId ? '15px' : '0')};
  display: flex;
  align-items: flex-start;
`;

const CmntInputDiv = styled.div<{ state: string }>`
  // width: 283px;
  display: flex;
  align-items: flex-end;
`;

const CmntBtnBox = styled.div<{ state: string }>`
  display: flex;
  margin: 0px;
`;

const CmntBtn = styled.button<{ groupId?: string | null; parentId?: string | null }>`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;
