import { useAppSelector } from '../../../redux/hooks';
import CommentWrapper from '../molecules/CommentWrapper';

export default function CommentCreated() {
  const { pinnedId } = useAppSelector((state) => state.comment);
  const { commentArray } = useAppSelector((state) => state.commentCreate);

  const uploadingComments = commentArray
    .filter((el) => !el.parent_id)
    .filter((el) => String(el._id) !== pinnedId)
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
