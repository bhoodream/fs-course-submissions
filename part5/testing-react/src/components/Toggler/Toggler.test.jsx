import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggler } from "./Toggler";

describe("<Toggler />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Toggler openLabel="show..." toggleContent="Toggler content">
        <div className="children">children</div>
      </Toggler>
    ).container;
  });

  test("renders its children", async () => {
    await screen.findAllByText("Toggler content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".toggler");
    expect(div).toHaveClass("toggler toggler__closed");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".toggler");
    expect(div).toHaveClass("toggler toggler__opened");
    await screen.findAllByText("children");
  });

  test("toggled content can be closed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const closeButton = screen.getByText("close");
    await user.click(closeButton);

    const div = container.querySelector(".toggler");
    expect(div).toHaveClass("toggler toggler__closed");
  });
});
