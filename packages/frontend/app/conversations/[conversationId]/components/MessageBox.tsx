"use client";

import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { EntitiesTypes } from "shared/types";
import useRelativeTimeText from "@/app/hooks/useRelativeTimeText";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTranslateText } from "@/apis/message";

interface MessageBoxProps {
  islast: boolean;
  message: EntitiesTypes["MessageEntity"];
}

const MessageBox = ({ islast, message }: MessageBoxProps) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwnMessage = message.senderId === Number(session.data?.user.id);
  const seenlist = (message.seen || [])
    .filter((seen) => seen.id !== Number(session.data?.user.id))
    .map((user) => user.name)
    .join(", ");

  const seen = seenlist ? `Seen by ${seenlist}` : "";
  const container = clsx("flex gap-3 p-4", isOwnMessage && "justify-end");
  const avatar = clsx(isOwnMessage && "order-2");
  const body = clsx(
    "flex flex-col gap-2",
    isOwnMessage && "items-end cursor-pointer"
  );
  const messageText = clsx(
    "text-sm w-fit overflow-hidden",
    isOwnMessage ? "bg-sky-500 text-white" : "bg-gray-100",
    message.type !== "text" ? "rounded-lg p-2" : "rounded-lg px-3 py-3"
  );
  const timeText = useRelativeTimeText(message.createdAt);
  const [translateText, setTranslateText] = useState("");
  const handleTranslate = async () => {
    const res = await getTranslateText(
      message.body,
      session.data!.user.accessToken
    );
    console.log(res);
    setTranslateText(res.text);
  };

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={message.sender} />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={body}>
            <div className="flex items-center gap-1">
              <div className="text-sm text-gray-500">
                {message.sender?.name}
              </div>
              <div className="text-xs text-gray-400">{timeText}</div>
            </div>
            <div className={messageText}>
              <ImageModal
                isOpen={imageModalOpen}
                src={message.image}
                onClose={() => setImageModalOpen(false)}
              />
              {message.type === "text" ? (
                message.body
              ) : message.type === "image" ? (
                <Image
                  onClick={() => setImageModalOpen(true)}
                  alt="Image"
                  height={288}
                  width={288}
                  src={message.image}
                  className="
                object-cover
                cursor-pointer
                hover:scale-105
                transition
                translate
                duration-200
                ease-in-out
                rounded-lg
               "
                />
              ) : message.type === "file" ? (
                "this is file"
              ) : (
                "Started a conversation"
              )}
              {translateText ? (
                <div className="text-blue">{`翻译:${translateText}`}</div>
              ) : null}
            </div>
            {islast && isOwnMessage && seenlist.length > 0 && (
              <div
                className="
              text-xs font-light text-gray-500
            "
              >
                {seen}
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Message Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem onClick={handleTranslate}>
            翻译
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Star Message</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MessageBox;
