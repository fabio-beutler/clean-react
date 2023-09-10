import { FC } from "react";

import { Icon, IconName } from "@/presentation/components";

import styles from "./surveyItem.module.css";

type Props = {
  isEmpty?: boolean;
};

const SurveyItem: FC<Props> = ({ isEmpty = false }) => {
  if (isEmpty) return <li className={styles.surveyItemWrap} />;
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName={IconName.thumbUp} className={styles.icon} />
        <time>
          <span className={styles.day}>22</span>
          <span className={styles.month}>03</span>
          <span className={styles.year}>2023</span>
        </time>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque magnam
          nisi perferendis ci, ullam!
        </p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  );
};

export default SurveyItem;
