import { render, screen } from "@testing-library/react";
import { Blog } from "./Blog";
import userEvent from "@testing-library/user-event";

test("snapshot", async () => {
  const likeMock = vi.fn();
  const removeMock = vi.fn();

  const { container } = render(
    <Blog data={BLOG} userId={USER_ID} like={likeMock} remove={removeMock} />
  );

  expect(container).toMatchSnapshot();
});

test("renders content", async () => {
  const expectTitle = `${BLOG.title} – "${BLOG.author}"`;
  const likeMock = vi.fn();
  const removeMock = vi.fn();

  const { container } = render(
    <Blog data={BLOG} userId={USER_ID} like={likeMock} remove={removeMock} />
  );

  const element = screen.getByText(expectTitle);

  expect(element).toBeDefined();

  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent(expectTitle);
});

test("toggle content", async () => {
  const expectTitle = `${BLOG.title} – "${BLOG.author}"`;
  const expectUrl = `URL: ${BLOG.url}`;
  const expectLikes = `Likes: ${BLOG.likes}`;
  const expectUser = `User: ${BLOG.user.username} (${BLOG.user.name})`;
  const likeMock = vi.fn();
  const removeMock = vi.fn();
  const user = userEvent.setup();

  render(
    <Blog data={BLOG} userId={USER_ID} like={likeMock} remove={removeMock} />
  );

  const openBtn = screen.getByText("open");

  await user.click(openBtn);

  const titleElement = screen.getByText(expectTitle);
  const urlElement = screen.getByText(expectUrl);
  const likesElement = screen.getByText(expectLikes);
  const userElement = screen.getByText(expectUser);
  const closeBtn = screen.getByText("close");
  const deleteBtn = screen.getByText("delete");

  expect(titleElement).toBeDefined();
  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
  expect(userElement).toBeDefined();
  expect(closeBtn).toBeDefined();
  expect(deleteBtn).toBeDefined();

  await user.click(closeBtn);

  const toggledOpenBtn = screen.getByText("open");

  expect(toggledOpenBtn).toBeDefined();
});

test("actions", async () => {
  const likeMock = vi.fn();
  const removeMock = vi.fn();
  const user = userEvent.setup();

  render(
    <Blog data={BLOG} userId={USER_ID} like={likeMock} remove={removeMock} />
  );

  const openBtn = screen.getByText("open");

  await user.click(openBtn);

  const likeBtn = screen.getByText("like");
  const deleteBtn = screen.getByText("delete");

  await user.click(likeBtn);
  await user.click(likeBtn);
  await user.click(deleteBtn);

  expect(likeMock.mock.calls).toHaveLength(2);
  expect(removeMock.mock.calls).toHaveLength(1);
});

const USER_ID = 456;
const BLOG = {
  title: "title",
  likes: 123,
  author: "author",
  url: "url",
  user: { id: USER_ID, username: "username", name: "name" },
};
