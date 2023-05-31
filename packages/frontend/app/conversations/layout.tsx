import Sidebar from "@/app/components/sidebar/Sidebar";
import { getConversationsByUserId } from "@/apis/conversations";

import ConversationList from "./components/ConversationList";
import getSessionByServer from "@/utils/getSessionByServer";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionByServer();

  const conversations = await getConversationsByUserId(
    session!.user.id,
    session!.user.accessToken
  );

  return (
    // @ts-expect-error
    <Sidebar>
      <ConversationList conversations={conversations!} />
      <div className="flex-1 overflow-auto">{children}</div>
    </Sidebar>
  );
}
