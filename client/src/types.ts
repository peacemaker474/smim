export interface OwnerData {
  nickname: string;
}

export interface BookMarkData {
  bookmarks: string[];
  pinnedCmnt: string | null;
  views: number;
  likes: number;
  answer: boolean;
}

export interface MainListsData {
  being: boolean;
  content: string;
  createAt: string;
  hashtag: string[];
  meta: BookMarkData;
  owner: OwnerData;
  targetAge: number;
  title: string;
  updateAt: string;
  __v: number;
  _id: string;
}

interface Lists {
  [key: string] : MainListsData[];
}

export interface MainPageData {
  success: boolean;
  lists: Lists;
}