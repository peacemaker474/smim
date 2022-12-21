import axios from 'axios';
import checkedText from '../../utils/checkedText';

interface UpdatePasswordData {
  userId: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  accessToken: string | null;
}

interface DeleteUserProps {
  userId: string;
  accessToken: string | null;
}

const http = process.env.REACT_APP_SERVER_URL;

export const getMyWriteLists = async (userId: string) => {
  const { data } = await axios.get(`${http}/my/writeLists?userId=${userId}`);
  
  if (data.success) {
    const newData = data.writeLists.map((item: any) => {
      return {
        ...item,
        content: checkedText(item.content),
      }
    });
    return newData;
  }

  return data;
}

export const getBookMarkLists = async (userId: string) => {
  const { data } = await axios.get(`${http}/my/bookmarkLists?userId=${userId}`);

  if (data.success) {
    const newData = data.bookMarkLists.map((item: any) => {
      return {
        ...item,
        content: checkedText(item.content),
      }
    });
    return newData;
  }

  return data;
}

export const getCheckMyId = (data: string) => {
  return axios.get(`${http}/my/id-check?userId=${data}`).then((res) => {
    return res;
  })
};

export const getCheckMyName = (data: string) => {
  return axios.get(`${http}/my/name-check?userName=${data}`).then((res) => {
    return res;
  })
};

export const putChangePassWord = (data: UpdatePasswordData) => {
  return axios.put(`${http}/my/changepw`, data, {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    }
  });
};

export const deleteUser = (data: DeleteUserProps) => {
  return axios.delete(`${http}/my/user-delete`, {
    data,
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    }
  });
}