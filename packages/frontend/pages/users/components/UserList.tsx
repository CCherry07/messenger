import { EntitiesTypes } from "shared/types";
import UserBox from "./UserBox";

interface UserListProps {
  items: EntitiesTypes["UserEntity"][];
}
const UserList = ({ items }: UserListProps) => {
  return (
    <aside
      className="
      fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-gray-200
      block
      w-full
      left-0
      sm:left-20
      sm:w-[14rem]
      sm:pb-0
    "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
            text-2xl
            font-bold
            text-gray-800
            py-4
          "
          >
            Friends 🐶
          </div>
          {items?.map((item, index) => (
            <UserBox key={index} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
