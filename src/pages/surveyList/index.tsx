"use client";
import { NextPage } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";

import PrivateRoute from "@/presentation/components/privateRoute/PrivateRoute";
import { SurveyList } from "@/presentation/pages";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const SurveyListPage: NextPage = () => {
  return (
    <PrivateRoute>
      <div className={roboto.className}>
        <Head>
          <title>4Dev - Survey List</title>
          <meta name="description" content="Survey List" />
        </Head>
        <SurveyList />
      </div>
    </PrivateRoute>
  );
};

export default SurveyListPage;
