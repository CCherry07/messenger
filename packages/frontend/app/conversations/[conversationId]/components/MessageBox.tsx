"use client";

import Avater from "@/app/components/Avatar";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { EntitiesTypes } from "shared/types";
import useRelativeTimeText from "@/app/hooks/useRelativeTimeText";
import Image from "next/image";
interface MessageBoxProps {
  islast: boolean;
  message: EntitiesTypes["MessageEntity"];
}

const MessageBox = ({ islast, message }: MessageBoxProps) => {
  const session = useSession();
  const isOwnMessage = message.senderId === Number(session.data?.user.id);
  const seenlist = (message.seen || [])
    .filter((seen) => seen.id !== Number(session.data?.user.id))
    .map((user) => user.name)
    .join(", ");

  const seen = seenlist ? `Seen by ${seenlist}` : "";
  const container = clsx("flex gap-3 p-4", isOwnMessage && "justify-end");
  const avatar = clsx(isOwnMessage && "order-2");
  const body = clsx("flex flex-col gap-2", isOwnMessage && "items-end");
  const messageText = clsx(
    "text-sm w-fit overflow-hidden",
    isOwnMessage ? "bg-sky-500 text-white" : "bg-gray-100",
    message.type !== "text" ? "rounded-lg p-2" : "rounded-lg px-3 py-3"
  );
  const timeText = useRelativeTimeText(message.createdAt);
  return (
    <div className={container}>
      <div className={avatar}>
        <Avater user={message.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender?.name}</div>
          <div className="text-xs text-gray-400">{timeText}</div>
        </div>
        <div className={messageText}>
          {message.type === "text" ? (
            message.body
          ) : message.type === "image" ? (
            <Image
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
    </div>
  );
};

export default MessageBox;
