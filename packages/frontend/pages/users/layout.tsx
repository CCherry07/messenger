import getUsers from "@/apis/user/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import { EntitiesTypes } from "shared/types";
import { useQuery } from "react-query";
import UserList from "./components/UserList";
import Head from "next/head";
import { useUserContext } from "@/context/UserContext";

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  const user = useUserContext();
  const { data: users } = useQuery<EntitiesTypes["UserEntity"][]>({
    queryKey: "users",
    queryFn: () => getUsers(user.email, user.accessToken),
  });

  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="description" content="Users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar user={user}>
        <UserList items={users!} />
        <div className="h-full">{children}</div>
      </Sidebar>
    </>
  );
}
