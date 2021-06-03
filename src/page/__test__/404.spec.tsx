import React from "react";
import { render, waitFor } from "../../test-utils";
import { NotFound } from "../404";

describe("<NotFound />", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<NotFound />);
    });
  });

  it("should render document.title", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Not Found | Challenge");
    });
  });
});
