"use client";
import { NextPage } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";

import { Signup } from "@/presentation/pages";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const SignupPage: NextPage = () => {
  return (
    <div className={roboto.className}>
      <Head>
        <title>4Dev - Login</title>
        <meta name="description" content="Login" />
      </Head>
      <Signup />
    </div>
  );
};

export default SignupPage;
