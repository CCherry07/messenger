import Head from "next/head";
import Login from "@/components/login";
import type { GetStaticProps } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
type Props = {
  // Add custom props here
};
export default function Home() {
  const { t, i18n } = useTranslation("common");
  useEffect(() => {
    invoke<string>("set_user_language", { language: i18n.language })
      .then((res) => {
        console.log("进程可通信", res);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="dark text-black dark:text-white">
      <Head>
        <title> messenger </title>
        <meta name="description" content={t("messenger") as string} />
        <link rel="icon" href="../public/images/logo.png" />
      </Head>
      <main>
        <Login />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "zh", ["common"])),
  },
});
