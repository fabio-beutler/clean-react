import { FC } from "react";

import { LoadSurveyList } from "@/domain/useCases";
import { Icon, IconName } from "@/presentation/components";

import styles from "./item.module.css";

type Props =
  | {
      survey: LoadSurveyList.Model;
      isEmpty?: false;
    }
  | {
      isEmpty: true;
    };

const Item: FC<Props> = (props) => {
  if (props.isEmpty) return <li className={styles.surveyItemWrap} />;

  const { survey } = props;
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;

  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName={iconName} className={styles.icon} />
        <time>
          <span data-testid="day" className={styles.day}>
            {survey.date.getDate().toString().padStart(2, "0")}
          </span>
          <span data-testid="month" className={styles.month}>
            {survey.date
              .toLocaleString("pt-BR", { month: "short" })
              .replace(".", "")}
          </span>
          <span data-testid="year" className={styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  );
};

export default Item;
