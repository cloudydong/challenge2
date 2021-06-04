import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { PodcastList, PODCAST_LIST_QUERY } from "../../podcast/podcast-list";

describe("<PodcastList />", () => {
  it("how to mocked PODCAST_LIST_QUERY", async () => {
    await waitFor(async () => {
      render(
        <HelmetProvider>
          <MockedProvider
            mocks={[
              {
                request: {
                  query: PODCAST_LIST_QUERY,
                },
                result: {
                  data: {
                    getAllPodcasts: {
                      podcasts: {
                        id: 1,
                        updateAt: "",
                        title: "test",
                        category: "test",
                        rating: 5,
                      },
                    },
                  },
                },
              },
            ]}
          >
            <Router>
              <PodcastList />
            </Router>
          </MockedProvider>
        </HelmetProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
      // debug();
      await waitFor(() => {
        expect(document.title).toBe("Podcast List | Challenge");
      });
    });
  });
});
