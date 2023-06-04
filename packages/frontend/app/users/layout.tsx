import { getUsers } from "@/apis/user";
import UserList from "./components/UserList";
import Sidebar from "@/app/components/sidebar/Sidebar";
import getSessionByServer from "@/utils/getSessionByServer";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionByServer();
  const users = await getUsers(
    session!.user?.email,
    session!.user?.accessToken
  );

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
