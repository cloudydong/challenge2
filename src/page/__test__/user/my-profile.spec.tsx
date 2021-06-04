import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
// import { isLoggedInVar } from "../../../apollo";
import { MyProfile } from "../../user/my-profile";

// wtf...
jest.mock("@apollo/client", () => {
  const realModule = jest.requireActual("@apollo/client");
  return {
    // ...realModule,
    useQuery: () => {
      return {
        data: {
          id: 1,
          createAt: "now",
          updateAt: "now",
          email: "test@email.com",
          role: "UserRole.Listener",
        },
        loading: false,
      };
    },
    // makeVar: () => {
    //   return true;
    // },
  };
});

// const mockPush = jest.fn();

// jest.mock("react-router-dom", () => {
//   const realModule = jest.requireActual("react-router-dom");
//   return {
//     ...realModule,
//     useHistory: () => {
//       return {
//         push: mockPush,
//       };
//     },
//   };
// });

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

  it("should render document.title", async () => {
    await waitFor(() => {
      expect(document.title).toBe("My Profile | Challenge");
    });
  });

  it("test", async () => {
    const { debug } = renderResult;
    debug();
  });

  // it("click logOut button", async () => {
  //   const { getByRole } = renderResult;
  //   const button = getByRole("button");
  //   await waitFor(() => {
  //     userEvent.click(button);
  //   });
  //   expect(isLoggedInVar).toEqual(false);
  //   expect(mockPush).toHaveBeenCalledWith({
  //     pathname: "/",
  //   });
  // });
});
