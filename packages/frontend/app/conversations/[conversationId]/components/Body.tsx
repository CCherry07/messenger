"use client";
import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import { EntitiesTypes } from "shared/types";
import MessageBox from "./MessageBox";
import { useMutation } from "@tanstack/react-query";
import { updateSeenWithConversationId } from "@/apis/conversations";
import { useSession } from "next-auth/react";
interface BodyProps {
  messages: EntitiesTypes["MessageEntity"][];
}
const Body = (props: BodyProps) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<EntitiesTypes["MessageEntity"][]>(
    props.messages
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  const { mutate } = useMutation({
    mutationKey: ["seen", "conversation", conversationId],
    mutationFn: () =>
      updateSeenWithConversationId(+conversationId, session!.user.accessToken),
  });

  useEffect(() => mutate(), [conversationId, mutate]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, idx) => (
        <MessageBox
          key={message.id}
          islast={idx === messages.length - 1}
          message={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
