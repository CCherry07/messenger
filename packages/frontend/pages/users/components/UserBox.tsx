import { getSesssionConversation } from "@/apis/conversations";
import Avatar from "@/components/Avatar";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { EntitiesTypes } from "shared/types";
interface UserBoxProps {
  item: EntitiesTypes["UserEntity"];
}
const UserBox = ({ item }: UserBoxProps) => {
  const user = useUserContext();
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: "conversation",
    mutationFn: async () =>
      await getSesssionConversation(
        {
          userId: item.id,
          currentUserId: user.id,
        },
        user.accessToken
      ),
    onSuccess: (conversation) => {
      router.push(`/conversations/${conversation.id}`);
    },
  });
  return (
    <>
      <div
        onClick={() => mutate()}
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
