import { useAppSelectorTyped } from '../../../redux/hooks';
import CommentWrapper from '../molecules/CommentWrapper';

export default function CommentCreated() {
  const { pinnedId, commentArray } = useAppSelectorTyped((state) => ({
    pinnedId: state.comment.pinnedId,
    commentArray: state.commentCreate.commentArray,
  }));

  const uploadingComments = commentArray
    .filter((el) => !el.parentId) // 최상위 댓글인지 확인
    .filter((el) => String(el._id) !== pinnedId) // 고정댓글인지 확인
    .sort((a, b) => {
      if (a?.createAt > b?.createAt) return -1;
      if (a?.createAt < b?.createAt) return 1;
      return 0;
    });

  return (
    <>
      {uploadingComments.map((el) => (
        <CommentWrapper key={el.createAt} cmntData={[el]} />
      ))}
    </>
  );
}
