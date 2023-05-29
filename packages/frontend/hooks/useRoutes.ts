import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        name: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        name: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        name: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [conversationId, pathname]
  );

  return useMemo(() => ({ routes }), [routes]);
};

export default useRoutes;
