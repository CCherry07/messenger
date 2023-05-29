import Sidebar from "@/components/sidebar/Sidebar";
import { useUserContext } from "@/context/UserContext";
import ConversationList from "./components/ConversationList";
import { getConversationsByUserId } from "@/apis/conversations";
import { useQuery } from "react-query";
import { EntitiesTypes } from "shared/types";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const user = useUserContext();
  const { data: conversations, isLoading } = useQuery<
    EntitiesTypes["ConversationEntity"][]
  >({
    queryKey: "conversations",
    queryFn: () => getConversationsByUserId(user.id, user.accessToken),
  });

  return (
    <div className="flex flex-col h-screen">
      <Sidebar user={user}>
        <ConversationList conversations={conversations!} />
        <div className="flex-1 overflow-auto">{children}</div>
      </Sidebar>
    </div>
  );
};

export default Layout;
