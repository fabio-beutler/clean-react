"use client";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { AccessDeniedError } from "@/domain/errors";
import { LoadSurveyList } from "@/domain/useCases";
import { Footer, Header } from "@/presentation/components";
import { useApiContext } from "@/presentation/contexts";

import { Error, List } from "./components";
import styles from "./surveyList.module.css";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  const router = useRouter();
  const apiContext = useApiContext();
  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>([]);
  const [loadingSurveysError, setLoadingSurveysError] = useState<string>("");

  function getSurveys() {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setSurveys(surveys);
        setLoadingSurveysError("");
      })
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          apiContext.setCurrentAccount(undefined);
          router.replace("/login").finally();
        } else {
          setLoadingSurveysError(error.message);
        }
        setSurveys([]);
      });
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
