import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { MyProfile } from "../../user/my-profile";

const mockUser = {
  __typename: "User",
  id: 1,
  createAt: "now",
  updateAt: "now",
  email: "test@email.com",
  role: "Listener",
};

jest.mock("../../../hook/useMe", () => {
  return {
    useMe: () => {
      return {
        data: {
          me: mockUser,
        },
      };
    },
  };
});

describe("<MyProfile />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Router>
              <MyProfile />
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render document.title", async () => {
    await waitFor(() => {
      expect(document.title).toBe("My Profile | Challenge");
    });
  });

  it("click logOut button", async () => {
    const { getByRole } = renderResult;
    const button = getByRole("button");
    await waitFor(() => {
      userEvent.click(button);
    });
  });
});
