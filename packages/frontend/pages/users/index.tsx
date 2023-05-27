import Head from "next/head";
import { EmptyState } from "@/components/EmptyState";
import Layout from "./layout";
import getCurrentUser from "@/hooks/getCurrentUser";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { User } from "@/shared/types";
interface UsersProps {
  user: User | null;
}
export const getServerSideProps: GetServerSideProps<UsersProps> = async ({
  req,
  res,
}: any) => {
  const user = await getCurrentUser(req, res);
  return {
    props: {
      user,
    },
  };
};
export const Users = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="lg:block sm:pl-80 h-full">
      <Head>
        <title>Users</title>
        <meta name="description" content="Users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <EmptyState />
      </Layout>
    </div>
  );
};
export default Users;
