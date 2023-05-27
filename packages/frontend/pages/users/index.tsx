import Head from "next/head";
import { EmptyState } from "@/components/EmptyState";
import Layout from "./layout";
export const Users = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <Head>
        <title>Users</title>
        <meta name="description" content="Users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <EmptyState />
      </Layout>
    </div>
  );
};
export default Users;
