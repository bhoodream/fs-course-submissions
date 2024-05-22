import { useMemo } from "react";
import { Search } from "../Search";
import { useSearch } from "../Search/useSearch";
import "./styles.css";
import { Blog } from "../Blog/Blog";

export const Blogs = ({ userId, items, remove, like }) => {
  const search = useSearch();

  const visibleBlogs = useMemo(
    () =>
      search.value
        ? items.filter((i) =>
            i.title.toLowerCase().includes(search.value.toLowerCase())
          )
        : items,
    [items, search.value]
  );

  return (
    <div>
      <h2>Blogs</h2>
      <>
        <h3>Articles</h3>
        <Search {...search} />
        <div className="blogs">
          {items.length <= 0
            ? "no blogs..."
            : visibleBlogs.length <= 0
            ? "no blogs found..."
            : visibleBlogs.map((item) => {
                return (
                  <Blog
                    key={item.id}
                    data={item}
                    userId={userId}
                    like={like}
                    remove={remove}
                  />
                );
              })}
        </div>
      </>
    </div>
  );
};
