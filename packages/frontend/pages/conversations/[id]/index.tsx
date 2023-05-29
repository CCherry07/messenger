"use client";

import useConversation from "@/hooks/useConversation";
import EmptyState from "@/components/EmptyState";
interface ConversationsProps {
  children: React.ReactNode;
}
const Conversations = (props: ConversationsProps) => {
  const { isOpen } = useConversation();
  return (
    <div>
      {isOpen ? <div className="h-full">{props.children}</div> : <EmptyState />}
    </div>
  );
};

export default Conversations;
