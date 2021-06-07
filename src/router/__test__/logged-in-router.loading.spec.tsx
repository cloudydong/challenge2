import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { PODCAST_LIST_QUERY } from "../../page/podcast/podcast-list";
import { mockedPodcastListQueryResponse } from "../../page/__test__/podcast/podcast-list.spec";
import { LoggedInRouter } from "../logged-in-router";

const useMeMock = {
  data: {
    me: {
      __typename: "User",
      id: 1,
      createAt: "now",
      updateAt: "now",
      email: "test@email.com",
      role: "Listener",
    },
  },
  loading: true,
};

jest.mock("../../hook/useMe", () => {
  return {
    useMe: () => {
      return useMeMock;
    },
  };
});

describe("<LoggedInRouter />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      mockedClient.setRequestHandler(
        PODCAST_LIST_QUERY,
        () => mockedPodcastListQueryResponse
      );
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Router>
              <LoggedInRouter />
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("just loading true", async () => {
    const { getByText } = renderResult;
    getByText("Loading...");
  });
});
