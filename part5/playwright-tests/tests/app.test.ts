import { test, expect } from "@playwright/test";

test.describe("Part 5", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset-blogs");

    await page.goto("http://localhost:5173");
  });

  test("main page", async ({ page }) => {
    const locator = page.getByText("Fullstack Open Course");

    await expect(locator).toBeVisible();
  });

  test("login", async ({ page }) => {
    logIn(page);

    await expect(page.getByText("Root User (root) logged in")).toBeVisible();
  });

  test.describe("logged in", () => {
    test.beforeEach(async ({ page }) => {
      logIn(page);
    });

    test("add blog", async ({ page }) => {
      addBlog(page);

      await expect(page.getByText('title – "author"')).toBeVisible();
    });

    test.describe("blog created", () => {
      test.beforeEach(async ({ page }) => {
        addBlog(page);
      });

      test("likes works", async ({ page }) => {
        await page.getByRole("button", { name: "open" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("Likes: 1")).toBeVisible();
      });
    });
  });
});

const logIn = async (page) => {
  await page.getByRole("button", { name: "log in" }).click();

  await page.getByTestId("username").fill("root");
  await page.getByTestId("password").fill("root");

  await page.getByRole("button", { name: "login" }).click();
};

const addBlog = async (page) => {
  await page.getByRole("button", { name: "Create blog" }).click();
  await page.getByTestId("blog-title").fill("title");
  await page.getByTestId("blog-author").fill("author");
  await page.getByTestId("blog-url").fill("url");

  await page.getByRole("button", { name: "add" }).click();
};
