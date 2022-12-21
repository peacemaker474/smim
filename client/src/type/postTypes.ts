interface MainPageLists {
  [key: string]: PostListData[];
}

interface ContentData {
  check: boolean;
  value: string;
}

export interface PostOwnerData {
  imageUrl: string;
  userId: string;
  nickname: string;
  ageGroup: number;
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
  owner: PostOwnerData;
  targetAge: number;
  title: string;
  updateAt: string;
  block: boolean;
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

export interface SearchHTTPProps {
  option: string;
  keyword: string;
}

export interface Option {
  value: string;
  text: string;
}

export interface SelectBoxProps {
  optionArr: Array<Option>;
  name: string;
}

export interface SearchFormOption extends SelectBoxProps {
  age: string;
}
