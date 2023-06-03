"use client";

import { sendMessage } from "@/apis/message";
import useConversation from "@/app/hooks/useConversation";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
const Form = () => {
  const { conversationId } = useConversation();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const { mutate, isLoading } = useMutation({
    mutationKey: ["Messages", conversationId],
    mutationFn: (data: FieldValues) => {
      const payload = {} as {
        body: string;
        image?: string;
        type: "text" | "image" | "file";
      };
      if (
        data.event === "success" &&
        data.info &&
        data.info.resource_type !== "raw"
      ) {
        payload.image = data.info.secure_url;
        payload.type = "image";
      } else if (
        data.event === "success" &&
        data.info &&
        data.info.resource_type === "raw"
      ) {
        payload.image = data.info.secure_url;
        payload.type = "file";
      }
      if (data.message) {
        payload.body = data.message;
        payload.type = "text";
      }

      return sendMessage(
        {
          ...payload,
          conversationId,
        },
        session!.user.accessToken
      );
    },
    onSettled: () => {
      setValue("message", "");
    },
  });
  return (
    <div
      className="
      py-4 
      px-4 
      bg-white 
      border-t 
      flex 
      items-center 
      gap-2 
      lg:gap-4 
      w-full
  "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={(data: any) => mutate(data)}
        uploadPreset="vijcnoj2"
      >
        <HiPhoto size={28} className="text-sky-500 cursor-pointer" />
      </CldUploadButton>
      <form
        onClick={handleSubmit((data) => mutate(data))}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          name="message"
          type="text"
          placeholder="Write a message"
          register={register}
          errors={errors}
          required
        />

        <button
          type="submit"
          className="
        rounded-full
        p-2
        cursor-pointer
        bg-sky-500
        hover:bg-sky-600
        focus:outline-none
        transition
      "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
