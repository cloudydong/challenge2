import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { UserRole } from "../../__generated__/globalTypes";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Router>
              <CreateAccount />
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  it("should render document.title", async () => {
    await waitFor(() => {
      expect(document.title).toBe("계정생성 | Challenge");
    });
  });

  it("renders validation errors", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText("이메일을 입력하세요");
    const button = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "worngEmailType");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("허용되지 않는 이메일 주소입니다");
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
    await waitFor(() => {
      userEvent.type(email, "correct@email.com");
      userEvent.click(button);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });

  it("should render OK with props", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText("이메일을 입력하세요");
    const password = getByPlaceholderText("비밀번호를 입력하세요");
    const button = getByRole("button");
    const formData = {
      email: "test@email.com",
      password: "test123!",
      role: UserRole.Listener,
    };
    const queryHandler = jest.fn().mockResolvedValue({
      data: { createAccount: { ok: true, error: "mutation-error" } },
    });
    mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, queryHandler);
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });

    expect(window.alert).toHaveBeenCalledWith(
      "계정이 생성되었습니다! 로그인 하세요!"
    );
    expect(queryHandler).toBeCalledTimes(1);
    expect(queryHandler).toBeCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(mockPush).toHaveBeenCalledWith("/");
    const mutationError = getByRole("alert");
    expect(mutationError).toHaveTextContent("mutation-error");
  });

  it("mutation return ok: false", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText("이메일을 입력하세요");
    const password = getByPlaceholderText("비밀번호를 입력하세요");
    const button = getByRole("button");
    const formData = {
      email: "test@email.com",
      password: "test123!",
      role: UserRole.Listener,
    };
    const queryHandler = jest.fn().mockResolvedValue({
      data: { createAccount: { ok: false, error: "mutation-error" } },
    });
    mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, queryHandler);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });
    expect(window.alert).not.toHaveBeenCalledWith(
      "계정이 생성되었습니다! 로그인 하세요!"
    );
    expect(mockPush).not.toHaveBeenCalledWith("/");
  });

  /** Test loading return false 
  it("useMutation loading return false", async () => {
     jest.mock("@apollo/client", () => {
       const realModule = jest.requireActual("@apollo/client");
       return {
         ...realModule,
         useMutation: () => {
           return [
             {
               loading: false,
              },
            ];
          },
        };
      });
    });
  */
});
