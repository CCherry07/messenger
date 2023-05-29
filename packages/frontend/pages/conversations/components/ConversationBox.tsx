import { EntitiesTypes } from "shared/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
interface ConversationBoxProps {
  conversation: EntitiesTypes["ConversationEntity"];
  selected: boolean;
}
const ConversationBox = ({ conversation, selected }: ConversationBoxProps) => {
  return <div className={clsx(``)}>dada</div>;
};

export default ConversationBox;
