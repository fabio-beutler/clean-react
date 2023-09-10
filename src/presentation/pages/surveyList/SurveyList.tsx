import { FC } from "react";

import { Footer, Header } from "@/presentation/components";

import { SurveyItem } from "./components";
import styles from "./surveyList.module.css";

const SurveyList: FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {Array.from({ length: 4 }).map((_, index) => (
            <SurveyItem isEmpty key={index} />
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;
