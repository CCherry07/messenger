"use client";

import { User } from "shared/types";
import { useState } from "react";
import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import Avater from "../Avatar";
import SettingsModal from "./SettingsModal";
interface DesktopSidebarProps {
  user: User;
}
const DesktopSidebar = ({ user }: DesktopSidebarProps) => {
  const { routes } = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        user={user}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
      hidden 
      sm:fixed
      sm:inset-y-0
      sm:left-0
      sm:z-40
      sm:w-20
      sm:px-2
      sm:overflow-y-auto
      sm:border-r-[1px]
      sm:pb-4
      sm:flex
      sm:flex-col
      xl:px-6
      flex-col
      justify-between
    "
      >
        <nav
          className="
          mt-4
          flex
          flex-col
          justify-between
    "
        >
          <ul
            role="list"
            className="
            flex
            flex-col
            items-center
            space-y-1
          "
          >
            {routes.map((route) => (
              <DesktopItem {...route} key={route.name} label={route.name} />
            ))}
          </ul>
        </nav>

        <nav
          className="
        mt-4
        flex
        flex-col
        justify-between
        items-center
      "
        >
          <div
            onClick={() => setIsOpen(true)}
            className="
            cursor-pointer
            hover:opacity-75
            transition
          "
          >
            <Avater user={user} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
