import { test, expect } from "@playwright/test";

test.describe("Part 5", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Fullstack Open Course");

    await expect(locator).toBeVisible();
  });

  test("login form can be opened", async ({ page }) => {
    logIn(page);

    await expect(page.getByText("Root User (root) logged in")).toBeVisible();
  });

  test.describe("when logged in", () => {
    test.beforeEach(async ({ page }) => {
      logIn(page);
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create blog" }).click();
      await page.getByTestId("blog-title").fill("title");
      await page.getByTestId("blog-author").fill("author");
      await page.getByTestId("blog-url").fill("url");

      await page.getByRole("button", { name: "add" }).click();

      await expect(page.getByText('title – "author"')).toBeVisible();
    });
  });
});

const logIn = async (page) => {
  await page.getByRole("button", { name: "log in" }).click();

  await page.getByTestId("username").fill("root");
  await page.getByTestId("password").fill("root");

  await page.getByRole("button", { name: "login" }).click();
};
