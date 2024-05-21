import { useMemo } from "react";
import { Button } from "../Button";
import { Search } from "../Search";
import { useSearch } from "../Search/useSearch";
import "./styles.css";
import { Toggler } from "../Toggler";

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

  const likeItem = (item) => console.log(item);

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
            : visibleBlogs.map((item) => (
                <div key={item.id} className="blog">
                  <Toggler toggleContent={item.title} openLabel={"open"}>
                    <div>
                      <p>{item.title}</p>
                      <p>URL: {item.url}</p>
                      <p>
                        Likes: {item.likes}{" "}
                        <Button text="like" onClick={() => likeItem(item)} />
                      </p>
                      <p>Author: {item.author}</p>
                      {isLoggedIn && (
                        <Button text="delete" onClick={() => remove(item)} />
                      )}
                    </div>
                  </Toggler>
                </div>
              ))}
        </div>
      </>
    </div>
  );
};
