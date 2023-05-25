"use client";

import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";

import AuthSocialButton from "./AuthSocialButton";

import { BsGithub, BsGoogle } from "react-icons/bs";

enum VariantType {
  Login = "login",
  Register = "register",
}

const AuthForm = () => {
  const [Variant, setVariant] = useState<VariantType>(VariantType.Login);
  const [isLoading, setIsLoading] = useState(false);
  const taggleVariant = useCallback(() => {
    setVariant((variant) =>
      variant === VariantType.Login ? VariantType.Register : VariantType.Login
    );
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = useCallback<SubmitHandler<FieldValues>>(
    (data: FieldValues) => {
      setIsLoading(true);
      if (Variant === VariantType.Login) {
        // TODO: login
      } else {
        // TODO: register
      }
    },
    []
  );
  type ActionType = "github" | "google";
  const socialAction = useCallback((actionType: ActionType) => {
    setIsLoading(true);
    if (Variant === VariantType.Login) {
      // window.location.href = '/api/auth/google'
    }
  }, []);

  return (
    <div
      className="
    mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md
  "
    >
      <div
        className="
      bg-white
      py-8
      px-4
      shadow
      sm:rounded-lg
      sm:px-10
    "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {Variant === VariantType.Register ? (
            <Input
              label="Name"
              id="name"
              name="name"
              register={register}
              disabled={isLoading}
            />
          ) : null}
          <Input
            label="Email address"
            type="email"
            id="email"
            name="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            register={register}
            disabled={isLoading}
          />

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="primary"
              onClick={handleSubmit(onSubmit)}
            >
              {Variant === VariantType.Login ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
        flex
        gap-2
        justify-center
        text-sm
        mt-6
        px-2
        text-gray-500
        "
        >
          <div>
            {Variant === VariantType.Login
              ? "Don't have an account?"
              : "Already have an account?"}
          </div>
          <div
            onClick={taggleVariant}
            className="
          underline
          cursor-pointer
          "
          >
            {Variant === VariantType.Login ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
