import { PostOwnerData } from './postTypes';

export interface CommentData {
  text: string;
  writer: PostOwnerData;
  post_id: string;
  createAt: string;
  parent_id: string | null;
  children: Array<string>;
  like_count: number;
  like_users: Array<string>;
  block: boolean;
  __v: number;
  _id: string;
}
