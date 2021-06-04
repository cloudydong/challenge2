import { useMutation, gql } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { CheckFormError, FormError } from "../components/form-error";
import { EMAIL_REGEX } from "../util";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { CreateAccountInput, UserRole } from "../__generated__/globalTypes";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<CreateAccountInput>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Listener,
    },
  });

  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("계정이 생성되었습니다! 로그인 하세요!");
      history.push("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };
  return (
    <div className="h-screen flex flex-col items-center bg-blueGray">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5 mt-8 lg:mt-28">
        <Helmet>
          <title>계정생성 | Challenge</title>
        </Helmet>
        <div className="w-full flex flex-col items-center">
          <h1 className="w-full font-black text-rallyGreen text-6xl text-left">
            Challenge
          </h1>
        </div>
        <div className="w-full flex flex-col items-center rounded-3xl shadow-lg px-4 py-8 md:px-0 bg-blueGray-light">
          <h3 className="w-full md:w-2/3 font-medium text-white text-left text-2xl">
            회원가입
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
              className="input bg-gray-200 focus:bg-white"
            />
            <CheckFormError errorMessage={errors.email?.message} />
            {errors.email?.type === "pattern" && (
              <FormError errorMessage={"허용되지 않는 이메일 주소입니다"} />
            )}
            <input
              {...register("password", {
                required: "password is required",
                minLength: 4,
              })}
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="input bg-gray-200 focus:bg-white"
            />
            <CheckFormError errorMessage={errors.password?.message} />
            {errors.password?.type === "minLength" && (
              <FormError errorMessage={"비밀번호는 최소 4자리 이상입니다"} />
            )}
            <div className="w-full grid grid-cols-2 my-2 rounded-xl border-2 h-12 bg-gray-50 overflow-hidden">
              {Object.keys(UserRole).map((role, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center relative hover:bg-gray-200 hover:text-lg"
                >
                  <input
                    {...register("role", { required: true })}
                    type="radio"
                    id={role}
                    name="role"
                    value={role}
                    className="hidden"
                  />
                  <label
                    htmlFor={role}
                    className={`w-full h-full flex justify-center items-center ${
                      watch("role") === role
                        ? "text-white bg-rallyGreen-dark"
                        : ""
                    }`}
                  >
                    {role}
                  </label>
                </div>
              ))}
            </div>
            <Button
              canClick={isValid}
              loading={loading}
              actionText="계정 생성"
            />
            <CheckFormError
              errorMessage={createAccountMutationResult?.createAccount.error}
            />
          </form>
          <div className="text-white font-medium">
            이미 회원가입 하셨나요?{" "}
            <Link
              to="/"
              className="text-rallyGreen font-medium hover:underline"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
