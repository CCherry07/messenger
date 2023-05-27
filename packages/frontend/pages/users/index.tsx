import Head from "next/head";
import { EmptyState } from "@/components/EmptyState";
import Layout from "./layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { User } from "@/shared/types";
import getCurrentUser from "@/apis/auth/getCurrentUser";
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
    <>
      <Head>
        <title>Users</title>
        <meta name="description" content="Users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user!}>
        <div className="sm:block sm:pl-60 lg:pl-80 h-full">
          <EmptyState />
        </div>
      </Layout>
    </>
  );
};
export default Users;
