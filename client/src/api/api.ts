import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

console.log(baseURL)

const api = axios.create({
  baseURL: baseURL,
});

export const registerApi = async (login: string, password: string) => {
  return await api.post("auth/register", {
    login: login,
    pass: password,
  });
};

export const loginApi = async (login: string, password: string) => {
  return await api.post("auth/login", {
    login: login,
    pass: password,
  });
};

export const getPostApi = async (token: string) => {
  return await api.get("/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getHotPostApi = async (token: string) => {
  return await api.get("/posts/hot", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createPostApi = async (
  userId: string,
  title: string,
  picturePath: string,
  token: string
) => {
  return await api.post(
    "/posts/create",
    {
      title,
      userId,
      picturePath,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const likeApi = async (
  postId: string,
  userId: string,
  token: string
) => {
  return await api.patch(
    `/posts/${postId}/like`,
    {
      userId
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};