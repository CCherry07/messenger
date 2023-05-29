"use client";

import useConversation from "@/app/hooks/useConversation";
import EmptyState from "@/app/components/EmptyState";
import { getConversationById } from "@/apis/conversations";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
interface ConversationIdProps {
  children: React.ReactNode;
}

const ConversationIdPage = (props: ConversationIdProps) => {
  const { data: session } = useSession();
  const { isOpen, conversationId } = useConversation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: conversation } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () =>
      getConversationById(conversationId, session!.user?.accessToken),
    onSuccess(data) {
      console.log(data);
    },
  });
  return (
    <div>
      {isOpen ? <div className="h-full">{props.children}</div> : <EmptyState />}
    </div>
  );
};

export default ConversationIdPage;
