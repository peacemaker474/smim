// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCommentListRead } from '../../../networks/comment/http';
import CommentWrapper from './CommentWrapper';
import { CommentData } from '../../../type/cmntTypes';
import LoadingPage from '../../../pages/LoadingPage';

export default function CommentUploaded() {
  //   const { pinnedId } = useSelector((state) => state.comment);
  const { id: postid } = useParams();

  const loadComments = async () => {
    try {
      const {
        data: { data },
      } = await getCommentListRead(postid);
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const { data: loadedComments, isLoading, isFetching } = useQuery(['commentArray'], loadComments);

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  const sortedLoadedComments = loadedComments
    .filter((el: Array<CommentData>) => String(el[0]._id))
    .sort((a: Array<CommentData>, b: Array<CommentData>) => {
      if (a[0].createAt > b[0].createAt) {
        return -1;
      }
      if (a[0].createAt < b[0].createAt) {
        return 1;
      }
      return 0;
    });

  return (
    <>
      {sortedLoadedComments.map((el: Array<CommentData>) => (
        <CommentWrapper key={el[0]._id} cmntData={el} />
      ))}
    </>
  );
}
