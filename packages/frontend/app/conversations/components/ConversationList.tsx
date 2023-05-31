"use client";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
// import { useRouter } from "next/navigation";
import { EntitiesTypes } from "shared/types";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
interface ConversationListProps {
  conversations: EntitiesTypes["ConversationEntity"][];
  setConversations?: (
    conversations: EntitiesTypes["ConversationEntity"][]
  ) => void;
}

const ConversationList = ({ conversations }: ConversationListProps) => {
  // const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        block
        w-full
        left-0
        sm:left-20
        sm:w-[14rem]
        sm:pb-0
    `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Massages</div>
          <div
            className="
              rounded-full
              p-2
              bg-gray-100
              text-gray-600
              cursor-pointer
              hover:opacity-80
              transition-opacity
            "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>

        {conversations?.map((conversation) => (
          <ConversationBox
            key={conversation.id}
            conversation={conversation}
            selected={+conversationId === conversation.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
