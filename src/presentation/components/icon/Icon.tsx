import Image from "next/image";
import { ComponentProps, FC } from "react";

import styles from "./icon.module.css";

export enum IconName {
  thumbDown = "/icon-thumb-down.webp",
  thumbUp = "/icon-thumb-up.webp",
}

type Props = ComponentProps<"div"> & {
  iconName: IconName;
  alt?: string;
};

const Icon: FC<Props> = ({ iconName, className, alt, ...props }) => {
  const iconColor = iconName === IconName.thumbUp ? styles.green : styles.red;
  const iconAlt = iconName === IconName.thumbUp ? "thumb up" : "thumb down";
  return (
    <div className={`${styles.iconWrap} ${iconColor} ${className}`} {...props}>
      <Image
        data-testid="icon"
        src={iconName}
        width={20}
        height={18}
        alt={alt ?? iconAlt}
      />
    </div>
  );
};

export default Icon;
