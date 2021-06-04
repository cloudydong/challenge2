import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ME_QUERY } from "../../hook/useMe";
import { LoggedInRouter } from "../logged-in-router";

describe("<LoggedInRouter />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Router>
              <Switch>
                <LoggedInRouter />
              </Switch>
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  it("just loading true", async () => {
    const { getByText } = renderResult;
    getByText("Loading...");
  });

  // it("should logged-in-router", async () => {
  // The module factory of `jest.mock()` is not allowed to reference any out-of-scope variables
  // const { getByText, queryByText } = renderResult;
  // const queryHandler = jest.fn().mockResolvedValue({
  //   data: {
  //     me: {
  //       id: 1,
  //       createAt: new Date(),
  //       updateAt: new Date(),
  //       email: "email@email.com",
  //       role: UserRole.Host,
  //     },
  //   },
  // });
  // mockedClient.setRequestHandler(ME_QUERY, queryHandler);
  // enum UserRole {
  //   Host = "Host",
  //   Listener = "Listener",
  // }
  // jest.mock("@apollo/client", () => {
  //   const realModule = jest.requireActual("@apollo/client");
  //   return {
  //     ...realModule,
  //     useQuery: () => {
  //       return {
  //         data: {
  //           me: {
  //             id: 1,
  //             createAt: new Date(),
  //             updateAt: new Date(),
  //             email: "email@email.com",
  //             role: UserRole.Host,
  //           },
  //         },
  //         loading: false,
  //         error: false,
  //       };
  //     },
  //   };
  // });
  // await waitFor(() => {
  //   expect(queryByText("test")).toBeNull();
  // });
  // getByText("Loading...");
  // });
});
