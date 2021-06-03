import { render } from "@testing-library/react";
import React from "react";
import { CheckFormError, FormError } from "../form-error";

describe("<FormError />", () => {
  it("should render OK CheckFormError", () => {
    const { getByText } = render(<CheckFormError errorMessage={"test"} />);
    getByText("test");
  });

  it("should null CheckFormError", () => {
    const { container, queryByText } = render(
      <CheckFormError errorMessage={null} />
    );
    expect(container).toBeEmptyDOMElement();
    expect(queryByText("test")).toBeNull();
  });

  it("should render OK FormError", () => {
    const { getByText } = render(<FormError errorMessage={"test"} />);
    getByText("test");
  });
});
