import { Roboto } from "next/font/google";
import Head from "next/head";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
export default function Home() {
  return (
    <div className={roboto.className}>
      <Head>
        <title>4Dev - Enquetes para programadores</title>
        <meta name="description" content="Enquetes para programadores" />
      </Head>
      <h1>hello</h1>
    </div>
  );
}
