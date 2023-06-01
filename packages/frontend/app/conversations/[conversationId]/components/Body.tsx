"use client";
import { EntitiesTypes } from "shared/types";
interface BodyProps {
  messages: EntitiesTypes["MessageEntity"][];
}
const Body = ({ messages }: BodyProps) => {
  console.log(messages);

  return <div className="flex-1 overflow-y-auto">Body</div>;
};

export default Body;
