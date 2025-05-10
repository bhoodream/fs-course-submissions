import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogForm } from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm onSubmit={onSubmit} />);

  const titleInput = container.querySelector(`input[name="title"]`);
  const authorInput = container.querySelector(`input[name="author"]`);
  const urlInput = container.querySelector(`input[name="url"]`);
  const addButton = container.querySelector(`button[type="submit"]`);

  await user.type(titleInput, "title");
  await user.type(authorInput, "author");
  await user.type(urlInput, "url");
  await user.click(addButton);

  expect(onSubmit.mock.calls).toHaveLength(1);

  expect(onSubmit.mock.calls[0][0].title).toBe("title");
  expect(onSubmit.mock.calls[0][0].author).toBe("author");
  expect(onSubmit.mock.calls[0][0].url).toBe("url");
});
