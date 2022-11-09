import { PostListData } from './postTypes';

interface ParaProps {
  para: string;
  img: Array<string>;
}
export interface PostCreateFormValue {
  title: string | null;
  tagArray: Array<string>;
  para: ParaProps;
  age: string | null;
}

export interface PostCreateFormProps {
  postId: string;
  pathValue: string;
  postData: PostListData;
}
