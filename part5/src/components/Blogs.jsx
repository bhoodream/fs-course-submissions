import { useMemo } from "react";
import { Button } from "./Button";
import { Search } from "./Search";
import { useSearch } from "./Search/useSearch";

export const Blogs = ({ items, remove, isLoggedIn }) => {
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
        {items.length <= 0
          ? "no blogs..."
          : visibleBlogs.length <= 0
          ? "no blogs found..."
          : visibleBlogs.map((item) => (
              <p key={item.id}>
                {item.title} {item.author}{" "}
                {isLoggedIn && (
                  <Button text="delete" onClick={() => remove(item)} />
                )}
              </p>
            ))}
      </>
    </div>
  );
};
