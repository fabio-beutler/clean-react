"use client";
import { FC, useEffect, useState } from "react";

import { SurveyModel } from "@/domain/models";
import { LoadSurveyList } from "@/domain/useCases";
import { Footer, Header } from "@/presentation/components";

import { Error, List } from "./components";
import styles from "./surveyList.module.css";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  const [surveys, setSurveys] = useState<SurveyModel[]>([]);
  const [loadingSurveysError, setLoadingSurveysError] = useState<string>("");

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setSurveys(surveys);
      })
      .catch((error) => {
        setLoadingSurveysError(error.message);
      });
  }, []);

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main className={styles.contentWrap}>
        <h2>Enquetes</h2>
        {loadingSurveysError ? (
          <Error errorMessage={loadingSurveysError} />
        ) : (
          <List surveys={surveys} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;
