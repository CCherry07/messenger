"use client";

import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import Input from "@/components/inputs/input";
import Button from "@/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { client } from "@/utils/client";
import { useRouter } from "next/navigation";
enum VariantType {
  Login = "login",
  Register = "register",
}

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [Variant, setVariant] = useState<VariantType>(VariantType.Login);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [router, session?.status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
        signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: `${window.location.origin}/`,
          redirect: false,
        })
          .then((res) => {
            if (!res?.ok && res?.error) {
              toast.error("Login failed");
            } else {
              toast.success("Login success");
            }
          })
          .finally(() => setIsLoading(false));

        // client("auth/login", {
        //   data,
        // })
        //   .then(
        //     async (res) => {
        //       session.data = res.data;
        //       session.status = "authenticated";
        //       toast.success(res.data.message || "Login success");
        //     },
        //     (err) => {
        //       toast.error(err.message);
        //     }
        //   )
        //   .finally(() => {
        //     setIsLoading(false);
        //   });
      } else {
        Axios.post("/api/auth/register", data)
          .then(
            (res) => {
              toast.success(res.data.message || "Register success");
            },
            () => {
              toast.error(`${data.name} register failed`);
            }
          )
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [Variant, session]
  );
  type ActionType = "github" | "google";
  const socialAction = useCallback((actionType: ActionType) => {
    setIsLoading(true);
    signIn(actionType, {
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
      .then((res) => {
        if (!res?.ok && res?.error) {
          toast.error("Login failed");
        } else {
          toast.success("Login success");
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const taggleVariant = useCallback(() => {
    setIsLoading(false);
    reset();
    setVariant((variant) =>
      variant === VariantType.Login ? VariantType.Register : VariantType.Login
    );
  }, [reset]);

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
