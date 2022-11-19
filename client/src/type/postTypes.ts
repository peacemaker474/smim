interface MainPageLists {
  [key: string]: PostListData[];
}

interface ContentData {
  check: boolean;
  value: string;
}

export interface PostOwnerData {
  nickname: string;
}

export interface PostOwnerDetail extends PostOwnerData {
  _id: string;
  userId: string;
  imageUrl: string;
}

export interface PostBookMarkData {
  bookmarks: string[];
  pinnedCmnt: string | null;
  views: number;
  likes: number;
  answer: boolean;
}

export interface PostListData {
  being: boolean;
  content: string;
  createAt: string;
  hashtag: string[];
  meta: PostBookMarkData;
  owner: PostOwnerData;
  targetAge: number;
  title: string;
  updateAt: string;
  __v: number;
  _id: string;
}

export interface PostDetailData {
  bookmark: boolean;
  content: string;
  createAt: string;
  hashtag: string[];
  like: boolean;
  meta: PostBookMarkData;
  owner: PostOwnerDetail;
  targetAge: number;
  title: string;
  updateAt: string;
  __v: number;
  _id: string;
}
export interface MyWriteListData {
  being: boolean;
  content: ContentData;
  createAt: string;
  hashtag: string[];
  meta: PostBookMarkData;
  owner: string;
  targetAge: number;
  title: string;
  updateAt: string;
  __v: number;
  _id: string;
}

export interface BookMarkListData {
  being: boolean;
  content: ContentData;
  createAt: string;
  hashtag: string[];
  meta: PostBookMarkData;
  owner: PostOwnerData;
  targetAge: number;
  title: string;
  updateAt: string;
  __v: number;
  _id: string;
}

export interface AxiosResponseMainPage {
  success: boolean;
  lists: MainPageLists;
}
