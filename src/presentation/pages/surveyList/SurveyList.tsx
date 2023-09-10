"use client";
import { FC, useEffect } from "react";

import { LoadSurveyList } from "@/domain/useCases";
import { Footer, Header } from "@/presentation/components";

import { SurveyItem } from "./components";
import styles from "./surveyList.module.css";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  useEffect(() => {
    loadSurveyList.loadAll().finally();
  }, []);

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
