import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("When show button is clicked. ", () => {
  let component;
  const blog = {
    title: "Component testing",
    author: "Author testing",
    url: "url testing",
    likes: 2,
    user: { name: "jessica" },
  };
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleShowButton={mockHandler}
        handleLikeButton={mockHandler}
      />
    );
  });

  test("It renders the blog's title and author, but does not render its url or number of likes by default", () => {
    const hideWhenExpandedDiv = component.container.querySelector(
      ".visibleContent"
    );
    const showWhenExpandedDiv = component.container.querySelector(
      ".hiddenContent"
    );
    expect(hideWhenExpandedDiv).toBeVisible();
    expect(showWhenExpandedDiv).not.toBeVisible();
  });

  test("after clicking the button, url and likes are displayed and view button is not displayed", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    const hideWhenExpandedDiv = component.container.querySelector(
      ".visibleContent"
    );
    const showWhenExpandedDiv = component.container.querySelector(
      ".hiddenContent"
    );
    expect(hideWhenExpandedDiv).not.toBeVisible();
    expect(showWhenExpandedDiv).toBeVisible();
  });

  test(" if the like button is clicked twice, the event handler the component received as props is called twice. ", () => {
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
