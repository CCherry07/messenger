import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

interface SidebarProps {
  children: React.ReactNode;
}

function Sidebar({ children }: SidebarProps) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileFooter />
      {/* main width */}
      <main className="h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
