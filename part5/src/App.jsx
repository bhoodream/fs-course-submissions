import { useRef } from "react";
import { Alert } from "./components/Alert";
import { useAlert } from "./components/Alert/useAlert";
import { BlogForm } from "./components/BlogForm";
import { Blogs } from "./components/Blogs";
import { Login } from "./components/Login";
import { Toggler } from "./components/Toggler";
import { User } from "./components/User";
import { useBlogs } from "./hooks/useBlogs";
import { useCurrentUser } from "./hooks/useCurrentUser";

function App() {
  const currentUser = useCurrentUser();
  const alert = useAlert();
  const blogsFormTogglerRef = useRef();
  const blogs = useBlogs({
    notify: alert.show,
    onAdd: () => blogsFormTogglerRef.current.close(),
  });

  return (
    <div>
      <h1>Fullstack Open Course</h1>
      {currentUser.data ? (
        <>
          <User data={currentUser.data} logOut={currentUser.logOut} />
          <Toggler buttonLabel="Create blog" ref={blogsFormTogglerRef}>
            <BlogForm onSubmit={blogs.add} />
          </Toggler>
        </>
      ) : (
        <Toggler buttonLabel="log in">
          <Login onLogin={currentUser.onLogin} notify={alert.show} />
        </Toggler>
      )}
      <Alert {...alert.state} />
      <Blogs
        items={blogs.items}
        remove={blogs.remove}
        isLoggedIn={Boolean(currentUser.data)}
      />
    </div>
  );
}

export default App;
