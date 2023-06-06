"use client";

import { getSesssionConversation } from "@/apis/conversations";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Select from "@/app/components/Select";
import Input from "@/app/components/inputs/input";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { EntitiesTypes } from "shared/types";

interface GroupChatModalProps {
  users: EntitiesTypes["UserEntity"][];
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
const GroupChatModal = ({ users, isOpen, onClose }: GroupChatModalProps) => {
  const router = useRouter();
  const session = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");
  const { mutate, isLoading } = useMutation({
    mutationKey: ["conversations"],
    mutationFn: (data: Parameters<typeof getSesssionConversation>[0]) =>
      getSesssionConversation(data, session.data!.user.accessToken),
    onSuccess: (data) => {
      router.refresh();
      onClose();
      router.push(`/conversations/${data.id}`);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });
  const onSubmit = (data: FieldValues) => {
    mutate({
      ...data,
      members: data.members.map((member: any) => member.value),
      isGroup: true,
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-500">
              Group chats are great for planning a trip, working on a project,
              or staying in touch with family and friends.
            </p>
            <div
              className="
          mt-10
          flex
          flex-col
          gap-y-8
          "
            >
              <Input
                label="name"
                id="name"
                name="name"
                register={register}
                required
                errors={errors}
              />

              <Select
                disabled={isLoading}
                label="Members"
                id="members"
                name="members"
                options={users.map((user) => ({
                  label: user.name,
                  value: user.id,
                }))}
                onChange={(value: any) => {
                  setValue("members", value, { shouldValidate: true });
                }}
                value={members}
              />
            </div>
          </div>
        </div>
        <div className=" mt-6 flex items-center justify-end gap-x-6 ">
          <Button
            disabled={isLoading}
            onClick={onClose}
            variant={"secondary"}
            type="button"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
