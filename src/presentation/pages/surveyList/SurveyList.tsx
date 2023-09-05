import { FC } from "react";

import { Footer, Logo } from "@/presentation/components";

import styles from "./surveyList.module.css";
const SurveyList: FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.userInfoWrap}>
            <span>Fabio</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
      <main className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          {Array.from({ length: 7 }).map((_, index) => (
            <li key={index}>
              <div className={styles.surveyContent}>
                <time>
                  <span className={styles.day}>22</span>
                  <span className={styles.month}>03</span>
                  <span className={styles.year}>2023</span>
                </time>
                <p>Qual é seu framework web favorito?</p>
              </div>
              <footer>Ver Resultado</footer>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;
