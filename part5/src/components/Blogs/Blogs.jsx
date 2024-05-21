import { useMemo } from "react";
import { Button } from "../Button";
import { Search } from "../Search";
import { useSearch } from "../Search/useSearch";
import "./styles.css";
import { Toggler } from "../Toggler";

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
                const isUsersItem =
                  userId && item.user && userId === item.user.id;

                return (
                  <div
                    key={item.id}
                    className={`blog ${isUsersItem ? "blog__yours" : ""}`}
                  >
                    <Toggler toggleContent={item.title} openLabel={"open"}>
                      <div>
                        {item.title}
                        <p>URL: {item.url}</p>
                        <p>
                          Likes: {item.likes}{" "}
                          <Button text="like" onClick={() => like(item)} />
                        </p>
                        <p>Author: {item.author}</p>
                        {item.user && (
                          <p>
                            User: {item.user.username} ({item.user.name})
                          </p>
                        )}
                        {isUsersItem && (
                          <Button text="delete" onClick={() => remove(item)} />
                        )}
                      </div>
                    </Toggler>
                  </div>
                );
              })}
        </div>
      </>
    </div>
  );
};
