import type { User } from "@/shared/types";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
interface SidebarProps {
  children: React.ReactNode;
  user: User | null;
}
function Sidebar({ children, user }: SidebarProps) {
  return (
    <div className="h-full">
      <DesktopSidebar user={user!} />
      <MobileFooter />
      <main className="sm:pl-20 lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
