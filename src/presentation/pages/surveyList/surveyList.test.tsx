import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { UnexpectedError } from "@/domain/errors";
import { SurveyModel } from "@/domain/models";
import { mockSurveyListModel } from "@/domain/test";
import { LoadSurveyList } from "@/domain/useCases";

import SurveyList from "./SurveyList";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0;
  surveys: SurveyModel[] = mockSurveyListModel();
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
  return { loadSurveyListSpy };
};

describe("SurveyList Component", () => {
  test("Should present 4 empty items on start", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty")).toHaveLength(4);
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    await waitFor(() => surveyList);
  });

  test("Should call LoadSurveyList", async () => {
    const { loadSurveyListSpy } = makeSut();
    await waitFor(() => loadSurveyListSpy);
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });

  test("Should render SurveyItems on success", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    await waitFor(() => surveyList);
    expect(surveyList.querySelectorAll("li:not(:empty)")).toHaveLength(3);
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  test("Should render error on failure", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    vi.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.queryByTestId("error"));
    expect(screen.queryByTestId("survey-list")).not.toBeInTheDocument();
    expect(screen.getByTestId("error")).toHaveTextContent(error.message);
  });

  test("Should call LoadSurveyList on reload", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    vi.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(
      new UnexpectedError(),
    );
    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.queryByTestId("error"));
    fireEvent.click(screen.getByTestId("reload"));
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.queryByTestId("error"));
  });
});
