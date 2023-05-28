import { getSesssionConversation } from "@/apis/conversation";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { UserEntity } from "shared/types";
interface UserBoxProps {
  item: UserEntity;
}
const UserBox = ({ item }: UserBoxProps) => {
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: "conversation",
    mutationFn: () => getSesssionConversation(item.id),
  });
  const handleClick = () => {
    mutateAsync().then((res) => {
      router.push(`/conversation/${res.data.id}`);
    });
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        bg-white 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
      "
      >
        <Avatar user={item} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
