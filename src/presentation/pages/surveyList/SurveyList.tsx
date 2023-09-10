"use client";
import { FC, useEffect, useState } from "react";

import { SurveyModel } from "@/domain/models";
import { LoadSurveyList } from "@/domain/useCases";
import { Footer, Header } from "@/presentation/components";

import { SurveyItem } from "./components";
import styles from "./surveyList.module.css";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  const [surveys, setSurveys] = useState<SurveyModel[]>([]);
  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => {
      setSurveys(surveys);
    });
  }, []);

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {surveys.length
            ? surveys.map((survey) => (
                <SurveyItem key={survey.id} survey={survey} />
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <SurveyItem key={index} isEmpty />
              ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;
