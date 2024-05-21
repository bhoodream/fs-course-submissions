import { service } from "../utils/services";

export const getBlogs = () => {
  return service({ baseUrl: BASE_URL, method: "get", pathname: "" });
};

export const createBlog = (payload) => {
  return service({ baseUrl: BASE_URL, method: "post", pathname: "", payload });
};

export const updateBlog = (id, payload) => {
  return service({
    baseUrl: BASE_URL,
    method: "put",
    pathname: `/${id}`,
    payload,
  });
};

export const deleteBlog = (id) => {
  return service({ baseUrl: BASE_URL, method: "delete", pathname: `/${id}` });
};

export const likeBlog = (blog) => {
  const likedBlog = {
    ...blog,
    likes: (blog.likes || 0) + 1,
    user: undefined,
  };

  return updateBlog(likedBlog.id, likedBlog);
};

const BASE_URL = "/api/blogs";
