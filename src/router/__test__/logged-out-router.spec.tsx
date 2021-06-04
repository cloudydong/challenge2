import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { LoggedOutRouter } from "../logged-out-router";

describe("<LoggedOutRouter />", () => {
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Router>
              <LoggedOutRouter />
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  it("should render Login page in logged-out", async () => {
    await waitFor(() => {
      expect(document.title).toBe("로그인 | Challenge");
    });
  });
});
