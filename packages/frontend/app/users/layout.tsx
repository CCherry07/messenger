import getUsers from "@/apis/user/getUsers";
import UserList from "./components/UserList";
import Sidebar from "@/app/components/sidebar/Sidebar";
import getSession from "@/utils/getSession";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
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
