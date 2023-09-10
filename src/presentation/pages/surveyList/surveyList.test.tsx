import { render, screen } from "@testing-library/react";

import { SurveyModel } from "@/domain/models";
import { LoadSurveyList } from "@/domain/useCases";

import SurveyList from "./SurveyList";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return [];
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
  return { loadSurveyListSpy };
};

describe("SurveyList Component", () => {
  test("Should present 4 empty items on start", () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
  });

  test("Should cal LoadSurveyList", () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});