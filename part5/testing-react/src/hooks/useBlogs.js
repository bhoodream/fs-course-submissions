import { useEffect, useMemo, useState } from "react";
import { useDataInvalidation } from "./useDataInvalidation";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  likeBlog,
  updateBlog,
} from "../services/blogs";
import { getApiErrorMsg } from "../utils/api";

export const useBlogs = ({ notify, onAdd }) => {
  const [items, setItems] = useState([]);
  const invalidation = useDataInvalidation();
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => b.likes - a.likes);
  }, [items]);

  const add = async (data) => {
    const existsBlog = items.find((blog) =>
      UNIQ_FIELDS.some((v) => blog[v] === data[v])
    );
    const operation = existsBlog ? "update" : "create";

    if (
      existsBlog &&
      !confirm(
        `${existsBlog.title} is already added to blogs, replace data with new one?`
      )
    )
      return false;

    const response = await (existsBlog
      ? updateBlog(existsBlog.id, data)
      : createBlog(data));

    if (response.error) {
      notify(getApiErrorMsg(response), "error");

      return false;
    }

    notify(`${operation} ${data.title} ${data.author}`, "success");
    onAdd();

    invalidation.invalidate();

    return true;
  };

  const remove = async (blog) => {
    if (!confirm(`Delete ${blog.title} ?`)) return;

    const response = await deleteBlog(blog.id);

    if (response.error) return notify(getApiErrorMsg(response), "error");

    notify(`Deleted ${blog.title}`, "success");

    invalidation.invalidate();
  };

  const like = async (blog) => {
    const response = await likeBlog(blog);

    if (response.error) return notify(getApiErrorMsg(response), "error");

    notify(`Liked ${blog.title}`, "success");

    invalidation.invalidate();
  };

  useEffect(() => {
    getBlogs().then((response) => {
      if (response.error) return notify(getApiErrorMsg(response), "error");

      setItems(response.data);
    });
  }, [invalidation.date, notify]);

  return { add, remove, like, items: sortedItems };
};

const UNIQ_FIELDS = ["title"];
