import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { CheckFormError, FormError } from "../components/form-error";
import { Helmet } from "react-helmet-async";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { LoginInput } from "../__generated__/globalTypes";
import { EMAIL_REGEX } from "../util";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginInput>({ mode: "onChange" });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex flex-col items-center bg-blueGray">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5 mt-8 lg:mt-28">
        <Helmet>
          <title>로그인 | Challenge</title>
        </Helmet>
        <div className="w-full flex flex-col items-center">
          <h1 className="w-full font-black text-rallyGreen text-6xl text-left">
            Challenge
          </h1>
        </div>
        <div className="w-full flex flex-col items-center rounded-3xl shadow-lg px-4 py-4 bg-blueGray-light">
          <h3 className="w-full md:w-2/3 font-medium text-white text-2xl flex flex-col items-center">
            로그인
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-2/3 grid gap-3 my-5"
          >
            <input
              {...register("email", {
                required: "email is required",
                pattern: EMAIL_REGEX,
              })}
              type="email"
              placeholder="이메일을 입력하세요"
              className="input"
            />
            <CheckFormError errorMessage={errors.email?.message} />
            {errors.email?.type === "pattern" && (
              <FormError errorMessage={"허용되지 않는 이메일 주소 입니다."} />
            )}
            <input
              {...register("password", {
                required: "password is required",
                minLength: 4,
              })}
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="input"
            />
            <CheckFormError errorMessage={errors.password?.message} />
            {errors.password?.type === "minLength" && (
              <FormError errorMessage={"비밀번호는 최소 4자리 이상입니다."} />
            )}
            <Button canClick={isValid} loading={loading} actionText="Log In" />
            <CheckFormError errorMessage={loginMutationResult?.login.error} />
          </form>
          <div className="text-white font-medium">
            Challenge는 처음이신가요?{" "}
            <Link
              to="/create-account"
              className="text-rallyGreen font-medium hover:underline"
            >
              계정 만들기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
