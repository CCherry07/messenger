import getUsers from "@/apis/user/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import { User, UserEntity } from "shared/types";
import { useQuery } from "react-query";
import UserList from "./components/UserList";
import UsersContext from "./context";

interface UsersLayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function UsersLayout({ children, user }: UsersLayoutProps) {
  const { data: users } = useQuery<UserEntity[]>({
    queryKey: "users",
    queryFn: () => getUsers(user.email, user.accessToken),
  });

  return (
    <UsersContext.Provider value={user}>
      <Sidebar user={user}>
        <UserList items={users!} />
        <div className="h-full">{children}</div>
      </Sidebar>
    </UsersContext.Provider>
  );
}
