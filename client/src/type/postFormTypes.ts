import { PostListData } from './postTypes';

export interface ParaProps {
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

export interface CreateDataHTTPProps {
  title: string | null;
  content: ParaProps;
  targetAge: string | null;
  hashtag: Array<string>;
}
