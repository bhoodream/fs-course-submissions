import { Button } from "../Button";
import "./styles.css";
import { Toggler } from "../Toggler";

export const Blog = (props) => {
  const { data, userId, like, remove } = props;
  const title = `${data.title} – "${data.author}"`;
  const isUsersItem = userId && data.user && userId === data.user.id;

  return (
    <div key={data.id} className={`blog ${isUsersItem ? "blog__yours" : ""}`}>
      <Toggler toggleContent={title} openLabel={"open"}>
        <div>
          {title}
          <p>URL: {data.url}</p>
          <p>
            Likes: {data.likes}{" "}
            <Button text="like" onClick={() => like(data)} />
          </p>
          {data.user && (
            <p>
              User: {data.user.username} ({data.user.name})
            </p>
          )}
          {isUsersItem && <Button text="delete" onClick={() => remove(data)} />}
        </div>
      </Toggler>
    </div>
  );
};
