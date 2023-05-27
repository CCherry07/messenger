import { User } from "@/shared/types";
import Image from "next/image";

interface AvaterProps {
  user: User;
}
const Avater = ({ user }: AvaterProps) => {
  return (
    <div className="relative">
      <div
        className="
        relative
        inline-block
        rounded-full
        overflow-hidden
        h-9
        w-9
        md:h-11
        md:w-11
      "
      >
        <img
          alt={user?.name}
          src={user?.image || "../public/images/logo.png"}
        />
      </div>
      <span
        className="
        absolute
        block
        h-2.5
        w-2.5
        rounded-full
        ring-2
        ring-white
        bg-green-400
        bottom-0.5
        right-0.5
        top-0
      "
      />
    </div>
  );
};

export default Avater;
