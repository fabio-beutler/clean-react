"use client";
import { FC, useEffect, useState } from "react";

import { LoadSurveyList } from "@/domain/useCases";
import { Footer, Header } from "@/presentation/components";
import { useErrorHandler } from "@/presentation/hooks";

import { Error, List } from "./components";
import styles from "./surveyList.module.css";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>([]);
  const [loadingSurveysError, setLoadingSurveysError] = useState<string>("");
  const handleError = useErrorHandler((error: Error) => {
    setLoadingSurveysError(error.message);
  });

  function getSurveys() {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setSurveys(surveys);
        setLoadingSurveysError("");
      })
      .catch(handleError);
  }

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main className={styles.contentWrap}>
        <h2>Enquetes</h2>
        {loadingSurveysError ? (
          <Error errorMessage={loadingSurveysError} onReload={getSurveys} />
        ) : (
          <List surveys={surveys} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;
