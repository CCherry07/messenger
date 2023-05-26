import Head from "next/head";
import Login from "@/components/login";
import type { GetStaticProps } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
type Props = {
  // Add custom props here
};
export default function Home() {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  // useEffect(() => {
  //   i18n.changeLanguage(window.navigator.language);
  //   router.replace(`/${i18n.language}`);
  // }, [i18n, router]);
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
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
