import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { GET_PODCAST_QUERY, PodcastDetail } from "../../podcast/podcast-detail";

describe("<PodcastDetail />", () => {
  it("how to mocked Graphql Query", async () => {
    await waitFor(async () => {
      render(
        <HelmetProvider>
          <MockedProvider
            mocks={[
              {
                request: {
                  query: GET_PODCAST_QUERY,
                },
                result: {
                  data: {
                    podcast: {
                      id: 1,
                      title: "test",
                      category: "test",
                      episodes: {
                        id: 1,
                        title: "test",
                        category: "test",
                      },
                    },
                  },
                },
              },
            ]}
          >
            <Router>
              <PodcastDetail />
            </Router>
          </MockedProvider>
        </HelmetProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
      // debug();
      await waitFor(() => {
        expect(document.title).toBe("Podcast Detail | Challenge");
      });
    });
  });
});
