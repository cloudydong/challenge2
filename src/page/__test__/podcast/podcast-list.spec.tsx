import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { PodcastList, PODCAST_LIST_QUERY } from "../../podcast/podcast-list";

export const mockedPodcastListQueryResponse = Promise.resolve({
  data: {
    getAllPodcasts: {
      __typename: "Podcasts",
      podcasts: [
        {
          __typename: "Podcast",
          id: 1,
          updateAt: "",
          title: "test",
          category: "test",
          rating: 5,
        },
      ],
    },
  },
});

const mockPush = jest.fn();
jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return { push: mockPush };
    },
  };
});

describe("<PodcastList />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      // mockedClient.setRequestHandler(
      //   PODCAST_LIST_QUERY,
      //   () => mockedPodcastListQueryResponse
      // );
      const queryHandler = jest
        .fn()
        .mockResolvedValue(mockedPodcastListQueryResponse);
      mockedClient.setRequestHandler(PODCAST_LIST_QUERY, queryHandler);
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Router>
              <PodcastList />
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render OK with props", async () => {
    const { getByText } = renderResult;
    getByText("test");
  });
});
