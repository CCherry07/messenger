"use client";
import useConversation from "@/app/hooks/useConversation";
import { useCallback, useEffect, useRef } from "react";
import { EntitiesTypes } from "shared/types";
import MessageBox from "./MessageBox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateSeenWithConversationId } from "@/apis/conversations";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash-es";
import { getMessagesByConversationId } from "@/apis/message";

interface PusherMessage {
  message: EntitiesTypes["MessageEntity"];
  conversationId: number;
}
const Body = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { conversationId } = useConversation();

  const { data: messages } = useQuery<EntitiesTypes["MessageEntity"][]>({
    queryKey: ["messages", conversationId],
    queryFn: () =>
      getMessagesByConversationId(conversationId, session!.user?.accessToken),
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const { mutate } = useMutation({
    mutationKey: ["seen", "conversation", conversationId],
    mutationFn: () =>
      updateSeenWithConversationId(+conversationId, session!.user.accessToken),
  });

  const messageHandler = useCallback(
    ({ message, conversationId }: PusherMessage) => {
      if (conversationId === conversationId) {
        queryClient.setQueryData(
          ["messages", conversationId],
          (currentMessage?: EntitiesTypes["MessageEntity"][]) => {
            if (!currentMessage) return [];
            mutate();
            if (find(currentMessage, { id: message.id })) {
              return currentMessage;
            }
            bottomRef?.current?.scrollIntoView();
            return [...currentMessage, message];
          }
        );
      }
    },
    [mutate, queryClient]
  );
  const messageUpdateHandler = useCallback(
    ({ message, conversationId }: PusherMessage) => {
      if (conversationId === conversationId) {
        queryClient.setQueryData(
          ["messages", conversationId],
          (currentMessage?: EntitiesTypes["MessageEntity"][]) => {
            if (!currentMessage) return [];
            const messageIndex = currentMessage.findIndex(
              (item) => item.id === message.id
            );
            if (messageIndex === -1) {
              return currentMessage;
            }
            currentMessage[messageIndex] = message;
            return [...currentMessage];
          }
        );
      }
    },
    [queryClient]
  );
  useEffect(() => {
    pusherClient.subscribe(`conversation-${conversationId}`);
    pusherClient.bind("message:new", messageHandler);
    pusherClient.bind("message:update", messageUpdateHandler);
    return () => {
      pusherClient.unsubscribe(`conversation-${conversationId}`);
      pusherClient.unbind("message:new", messageHandler);
      pusherClient.unbind("message:update", messageUpdateHandler);
    };
  }, [conversationId, messageHandler, messageUpdateHandler, mutate]);

  useEffect(() => mutate(), [conversationId, mutate]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.map((message, idx) => (
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
