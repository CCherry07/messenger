// import type { User } from "shared/types";
// import { EmptyState } from "@/app/components/EmptyState";
// import Layout from "./layout";
// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import getCurrentUser from "@/apis/auth/getCurrentUser";
// // import UserContext from "@/app/context/UserContext";
// interface UsersProps {
//   user: User | null;
// }
// export const getServerSideProps: GetServerSideProps<UsersProps> = async ({
//   req,
//   res,
// }: any) => {
//   const user = await getCurrentUser(req, res);
//   return {
//     props: {
//       user,
//     },
//   };
// };
// export const Users = ({
//   user,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   return (
//     <UserContext.Provider value={user!}>
//       <Layout>
//         <div className="sm:block lg:block sm:pl-[14rem] lg:pl-80 h-full">
//           <EmptyState />
//         </div>
//       </Layout>
//     </UserContext.Provider>
//   );
// };
// export default Users;

import EmptyState from "@/app/components/EmptyState";

const People = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default People;
