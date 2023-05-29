import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getSession from "@/utils/getSession";
interface SidebarProps {
  children: React.ReactNode;
}

async function Sidebar({ children }: SidebarProps) {
  const session = await getSession();
  return (
    <div className="h-full">
      <DesktopSidebar user={session!.user} />
      <MobileFooter />
      <main className="sm:pl-20 lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
