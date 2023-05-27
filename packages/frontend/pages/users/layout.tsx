import Sidebar from "@/components/sidebar/Sidebar";
import { User } from "@/shared/types";

interface UsersLayoutProps {
  children: React.ReactNode;
  user: User | null;
}

export default function UsersLayout({ children, user }: UsersLayoutProps) {
  return (
    <Sidebar user={user}>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
