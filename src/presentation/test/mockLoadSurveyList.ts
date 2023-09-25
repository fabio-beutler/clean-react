import { mockSurveyListModel } from "@/domain/test";
import { LoadSurveyList } from "@/domain/useCases";

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0;
  surveys: LoadSurveyList.Model[] = mockSurveyListModel();
  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}
