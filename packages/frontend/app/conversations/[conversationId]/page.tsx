import EmptyState from "@/app/components/EmptyState";
import { getConversationById } from "@/apis/conversations";
import getSessionByServer from "@/utils/getSessionByServer";
import { getMessagesByConversationId } from "@/apis/message";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
interface ConversationIdProps {
  params: {
    conversationId: string;
  };
}

const ConversationIdPage = async ({
  params: { conversationId },
}: ConversationIdProps) => {
  const session = await getSessionByServer();
  const conversation = await getConversationById(
    conversationId,
    session!.user?.accessToken
  );
  const messages = await getMessagesByConversationId(
    conversationId,
    session!.user?.accessToken
  );
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-screen">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body messages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationIdPage;
