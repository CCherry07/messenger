import Image from "next/image";
import { EntitiesTypes } from "shared/types";

interface AvatarGroupProps {
  users: EntitiesTypes["UserEntity"][];
}

const AvatarGroup = ({ users }: AvatarGroupProps) => {
  const slice = users.slice(0, 3);
  const rest = users.length - 3;
  const positionMap: Record<number, string> = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {slice.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]
          ${positionMap[index]}
        `}
        >
          <Image
            src={
              user.image ||
              "https://avatars.githubusercontent.com/u/79909910?v=4"
            }
            fill
            alt="avatar"
          />
        </div>
      ))}
      {rest > 0 && (
        <div className="h-11 w-11 rounded-full absolute bottom-0 right-0 bg-gray-300 flex justify-center items-center">
          <span className="text-sm text-gray-600 font-semibold">+{rest}</span>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
