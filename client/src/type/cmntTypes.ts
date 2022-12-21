import { PostOwnerData } from './postTypes';

export interface CommentData {
  text: string;
  writer: PostOwnerData;
  postId: string;
  createAt: string;
  parentId: string | null;
  children: Array<string>;
  likeCount: number;
  likeUsers: Array<string>;
  block: boolean;
  __v: number;
  _id: string;
}
