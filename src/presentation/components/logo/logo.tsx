import Image from "next/image";
import { FC } from "react";

const Logo: FC = () => {
  return <Image src={"/logo.svg"} alt={"4dev"} width={120} height={87} />;
};

export default Logo;
