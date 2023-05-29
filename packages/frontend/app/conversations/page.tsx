// "use client";

// import useConversation from "@/app/hooks/useConversation";
// import EmptyState from "@/app/components/EmptyState";
// import Layout from "./layout";
// import UserContext from "@/context/UserContext";
// import getCurrentUser from "@/apis/auth/getCurrentUser";
// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import { User } from "shared/types";
// import clsx from "clsx";
// import { useSession } from "next-auth/react";
// interface ConversationsProps {
//   user: User | null;
// }

// export const getServerSideProps: GetServerSideProps<
//   Partial<ConversationsProps>
// > = async ({ req, res }: any) => {
//   const user = await getCurrentUser(req, res);
//   return {
//     props: {
//       user,
//     },
//   };
// };

// const Conversations = ({
//   user,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   const { isOpen } = useConversation();
//   return (
//     <div
//       className={clsx(
//         "sm:block lg:block sm:pl-[14rem] lg:pl-80 h-full",
//         isOpen ? "hidden" : "block"
//       )}
//     >
//       <EmptyState />
//     </div>
//   );
// };
// export default Conversations;

"use client";

import clsx from "clsx";

import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
