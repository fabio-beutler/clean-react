"use client";
import { NextPage } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";

import {
  makeLocalSaveAccessToken,
  makeRemoteAddAccount,
  makeSignupValidation,
} from "@/main/factories";
import { Signup } from "@/presentation/pages";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const SignupPage: NextPage = () => {
  return (
    <div className={roboto.className}>
      <Head>
        <title>4Dev - SignUp</title>
        <meta name="description" content="SignUp" />
      </Head>
      <Signup
        validation={makeSignupValidation()}
        addAccount={makeRemoteAddAccount()}
        saveAccessToken={makeLocalSaveAccessToken()}
      />
    </div>
  );
};

export default SignupPage;
