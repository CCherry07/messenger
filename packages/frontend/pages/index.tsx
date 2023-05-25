import Head from "next/head";
import Login from "@/components/login";
export default function Home() {
  return (
    <div className="dark text-black dark:text-white">
      <Head>
        <title> messenger </title>
        <meta name="description" content="messenger" />
        <link rel="icon" href="../public/images/logo.png" />
      </Head>
      <main>
        <Login />
      </main>
    </div>
  );
}
