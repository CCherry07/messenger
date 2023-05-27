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
      <DesktopSidebar />
      <MobileFooter />
      <main className="h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
