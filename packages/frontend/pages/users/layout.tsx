import getUsers from "@/apis/user/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import { User } from "@/shared/types";
import { useQuery } from "react-query";
import UserList from "./components/UserList";

interface UsersLayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function UsersLayout({ children, user }: UsersLayoutProps) {
  const { data: users } = useQuery({
    queryKey: "users",
    queryFn: () => getUsers(user.email, user.accessToken),
  });

  return (
    <Sidebar user={user}>
      <UserList items={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
