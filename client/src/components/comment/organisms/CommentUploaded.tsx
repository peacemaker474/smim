import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../../redux/hooks';
import { getCommentListRead } from '../../../networks/comment/http';
import CommentWrapper from '../molecules/CommentWrapper';
import { CommentData } from '../../../type/cmntTypes';
import LoadingPage from '../../../pages/LoadingPage';

type Params = { id: string };

export default function CommentUploaded() {
  const { pinnedId } = useAppSelector((state) => state.comment);
  const { id: postId } = useParams<keyof Params>() as Params;

  const loadComments = async () => {
    try {
      const {
        data: { data },
      } = await getCommentListRead(postId);
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const {
    data: loadedComments,
    isLoading,
    isFetching,
  } = useQuery(['commentArray'], loadComments, {
    select: (commentArray) =>
      commentArray
        .filter((el: Array<CommentData>) => String(el[0]._id) !== pinnedId)
        .sort((a: Array<CommentData>, b: Array<CommentData>) => {
          if (a[0].createAt > b[0].createAt) return -1;
          if (a[0].createAt < b[0].createAt) return 1;
          return 0;
        }),
  });

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  return (
    <>
      {loadedComments.map((el: Array<CommentData>) => !el[0].block && <CommentWrapper key={el[0]._id} cmntData={el} />)}
    </>
  );
}
