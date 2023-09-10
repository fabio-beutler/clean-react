"use client";
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
        <ul>
          {Array.from({ length: 1 }).map((_, index) => (
            <SurveyItem key={index} />
          ))}
          {Array.from({ length: 3 }).map((_, index) => (
            <SurveyItem isEmpty key={index} />
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;
