import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { GET_PODCAST_QUERY, PodcastDetail } from "../../podcast/podcast-detail";

const longStr161 = Array(162).join("x");
const mockedPodcastDetailQueryResponse = {
  data: {
    getPodcast: {
      __typename: "getPodcast",
      podcast: {
        __typename: "Podcast",
        id: 1,
        title: "test",
        category: "test",
        episodes: [
          {
            __typename: "Episodes",
            id: 1,
            title: "test",
            category: longStr161,
          },
          {
            __typename: "Episodes",
            id: 2,
            title: "test",
            category: "test",
          },
        ],
      },
    },
  },
};
describe("<PodcastDetail />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      const queryHandler = jest
        .fn()
        .mockResolvedValue(mockedPodcastDetailQueryResponse);
      mockedClient.setRequestHandler(GET_PODCAST_QUERY, queryHandler);
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Router>
              <PodcastDetail />
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
    const { queryAllByText, getByText } = renderResult;
    queryAllByText("test");
    await waitFor(() => {
      expect(document.title).toBe("Podcast Detail | Challenge");
    });
    getByText(longStr161.substring(0, 160) + "...");
  });
});
