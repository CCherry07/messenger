import Link from "next/link";
import clsx from "clsx";
import { IconType } from "react-icons";

interface MobileItemProps {
  label: React.ReactNode;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem = ({ href, icon: Icon, active, onClick }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `
            group
            flex
            gap-x-3
            rounded-md
            justify-center
            p-4
            w-full
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-gray-900
            hover:bg-gray-100
          `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="w-6 h-6 shrink-0" />
    </Link>
  );
};

export default MobileItem;
