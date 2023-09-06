"use client";
import { NextPage } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";

import {
  makeLocalUpdateCurrentAccount,
  makeLoginValidation,
  makeRemoteAuthentication,
} from "@/main/factories";
import { Login } from "@/presentation/pages";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const LoginPage: NextPage = () => {
  return (
    <div className={roboto.className}>
      <Head>
        <title>4Dev - Login</title>
        <meta name="description" content="Login" />
      </Head>
      <Login
        authentication={makeRemoteAuthentication()}
        updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        validation={makeLoginValidation()}
      />
    </div>
  );
};

export default LoginPage;
