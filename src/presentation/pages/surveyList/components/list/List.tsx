import { FC } from "react";

import { LoadSurveyList } from "@/domain/useCases";

import { Item } from "../";
import styles from "./list.module.css";

type Props = {
  surveys: LoadSurveyList.Model[];
};

export const List: FC<Props> = ({ surveys }) => {
  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {surveys.length
        ? surveys.map((survey) => <Item key={survey.id} survey={survey} />)
        : Array.from({ length: 4 }).map((_, index) => (
            <Item key={index} isEmpty />
          ))}
    </ul>
  );
};

export default List;
