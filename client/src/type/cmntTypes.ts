import { PostOwnerData } from './postTypes';

export interface CommentData {
  children: Array<string>;
  complain_count: number;
  createAt: string;
  like_count: number;
  like_users: Array<string>;
  parent_id: string | null;
  post_id: string;
  text: string;
  writer: PostOwnerData;
  __v: number;
  _id: string;
}
