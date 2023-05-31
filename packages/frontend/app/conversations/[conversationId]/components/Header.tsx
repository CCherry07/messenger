"use client";

import Avater from "@/app/components/Avatar";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import { EntitiesTypes } from "shared/types";
interface HeaderProps {
  conversation: EntitiesTypes["ConversationEntity"] & {
    users: EntitiesTypes["UserEntity"][];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return ` ${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation.isGroup, conversation.users.length]);

  return (
    <div
      className="
      bg-white
      w-full
      flex border-b-[1px]
      sm:px-4
      py-3
      px-4
      lg:px-6
      justify-center
      items-center
      shadow-sm
    "
    >
      <div className=" flex gap-3 items-center ">
        <Link
          className="lg:hidden block
            hover:bg-sky-500
            hover:text-sky-600
            transition
            cursor-pointer
          "
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>

        <Avater user={conversation.users[0]} />

        <div className="flex flex-col">
          <div>{conversation.name || conversation.users[0].name}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        className="ml-auto cursor-pointer text-sky-500 hover:text-sky-600 transition"
      />
    </div>
  );
};

export default Header;
