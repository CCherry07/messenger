import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();
  const conversationId = useMemo(
    () => params?.conversationId ?? "",
    [params?.conversationId]
  );
  const isOpen = useMemo(() => !!conversationId, [conversationId]);
  return useMemo(() => ({ conversationId, isOpen }), [conversationId, isOpen]);
};

export default useConversation;
