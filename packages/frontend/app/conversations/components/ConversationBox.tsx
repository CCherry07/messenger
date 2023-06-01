import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);
import { EntitiesTypes } from "shared/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avater from "@/app/components/Avatar";
interface ConversationBoxProps {
  conversation: EntitiesTypes["ConversationEntity"];
  selected: boolean;
}
const ConversationBox = ({ conversation, selected }: ConversationBoxProps) => {
  const { data: session } = useSession();
  const { users } = conversation;
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    if (!conversation.messages.length) return null;
    return conversation.messages.at(-1) as EntitiesTypes["MessageEntity"];
  }, [conversation.messages]);

  const userEmail = useMemo(() => session?.user?.email, [session?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArr = lastMessage.seen || [];
    if (!userEmail) return false;
    seenArr.filter((user) => user.email === userEmail).length > 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (!lastMessage) return null;
    if (lastMessage.type === "text") return lastMessage.body;
    if (lastMessage.type === "image") return "Sent an image";
    if (lastMessage.type === "file") return "Sent a file";
    return "Started a conversation";
  }, [lastMessage]);

  const lastMessageTimeText = useMemo(() => {
    if (!lastMessage) return null;
    const time = dayjs(lastMessage?.createdAt);
    const relativeTime = dayjs.updateLocale("en", {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years",
      },
    });
    // console.log(relativeTime);
    const messageYear = time.year();
    const messageMonth = time.month();
    const messageDate = time.date();

    const newTime = dayjs();
    const newYear = newTime.year();
    const newMonth = newTime.month();
    const newDate = newTime.date();

    if (
      messageYear === newYear &&
      messageMonth === newMonth &&
      messageDate === newDate
    ) {
      return time.format("HH:mm");
    } else if (
      messageYear === newYear &&
      messageMonth === newMonth &&
      messageDate === newDate - 1
    ) {
      return "yesterday";
    } else if (
      messageYear === newYear &&
      messageMonth === newMonth &&
      messageDate === newDate - 6
    ) {
      return time.format("ww");
    } else {
      return time.format("YYYY-MM-DD");
    }
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full
        relative
        flex items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-3
  `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avater user={users[0]} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">
              {conversation.name || users?.[0]?.name}
            </p>
            <p className="text-xs font-light text-gray-500">
              {lastMessageTimeText}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-normal text-gray-500 truncate">
              {lastMessageText}
            </p>
            {hasSeen && (
              <span className="flex-shrink-0 inline-block">
                <span className="inline-flex items-center justify-center h-2 w-2 rounded-full bg-green-400" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
