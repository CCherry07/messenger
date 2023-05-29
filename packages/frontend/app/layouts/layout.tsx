import Sidebar from "@/app/components/sidebar/Sidebar";
import Head from "next/head";
import { useUserContext } from "@/context/UserContext";

interface LayoutProps {
  children: React.ReactNode;
  ListHolder: React.ReactNode;
  headconfig: {
    title: string;
    description: string;
    icon: string;
  };
}

export default function Layout({
  children,
  ListHolder,
  headconfig,
}: LayoutProps) {
  const user = useUserContext();
  const { title, description, icon } = headconfig;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={icon} />
      </Head>
      <Sidebar user={user}>
        {ListHolder}
        <div className="h-full">{children}</div>
      </Sidebar>
    </>
  );
}
