import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should render OK but display loading", () => {
    const { getByText } = render(
      <Button canClick={true} loading={true} actionText={"test"} />
    );
    getByText("...로딩중");
  });

  it("should render OK with props", () => {
    const { getByText } = render(
      <Button canClick={true} loading={false} actionText={"test"} />
    );
    getByText("test");
  });

  it("should render OK and canClick is false", () => {
    const { container } = render(
      <Button canClick={false} loading={false} actionText={"test"} />
    );
    expect(container.firstChild).toHaveClass(
      "text-white py-3 transition-colors bg-rallyGreen-light opacity-50 pointer-events-none"
    );
  });
});
