"use client";
import { updateUser } from "@/apis/user";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "shared/types";
import Modal from "../Modal";
import Input from "../inputs/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const SettingsModal = ({ isOpen, onClose, user }: SettingsModalProps) => {
  const router = useRouter();
  const session = useSession();
  const onHandleSubmit = async (data: FieldValues) => {
    await updateUser(
      {
        name: data?.name,
        email: data?.email,
        image: data?.image,
      },
      session.data!.user.accessToken
    );
  };
  const { mutate, isLoading } = useMutation({
    mutationKey: ["updateUser", user?.id],
    mutationFn: onHandleSubmit,
  });

  const { register, handleSubmit, setValue, watch, formState } =
    useForm<FieldValues>({
      defaultValues: {
        name: user?.name,
        email: user?.email,
        image: user?.image,
      },
    });
  const image = watch("image");
  const handleImageUpload = async (result: any) => {
    if (result) {
      setValue("image", result.info.url);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit((values) => mutate(values))}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-5 text-gray-600">
              This information will be displayed publicly so be careful what you
            </p>
            <div
              className="
            mt-10
            flex flex-col
            gap-y-8
          "
            >
              <Input
                label={"Name"}
                id={"name"}
                name={"name"}
                register={register}
                required={true}
                errors={formState.errors}
              />
              <div>
                <label
                  className="
              block
              text-sm
              font-medium
              leading-6
              text-gray-900
              "
                >
                  Photo
                </label>
                <div
                  className="
              mt-2
              flex
              items-center
              gap-x-4
              "
                >
                  <Image
                    sizes="48px"
                    width={48}
                    height={48}
                    className="rounded-full"
                    alt="avatar"
                    src={
                      image ||
                      user?.image ||
                      "https://avatars.githubusercontent.com/u/79909910?v=4"
                    }
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleImageUpload}
                    uploadPreset="vijcnoj2"
                  >
                    <Button
                      variant="secondary"
                      type="button"
                      disabled={isLoading}
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div
            className="
        mt-6
        flex
        items-center
        justify-end
        gap-x-4
        "
          >
            <Button
              variant={"secondary"}
              type="button"
              disabled={isLoading}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant={"primary"}
              type="submit"
              disabled={isLoading}
              onClick={onClose}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
