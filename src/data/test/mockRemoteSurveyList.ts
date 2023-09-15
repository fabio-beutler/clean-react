import { faker } from "@faker-js/faker";

import { RemoteLoadSurveyList } from "@/data/useCases/loadSurveyList/remoteLoadSurveyList";

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.string.uuid(),
  question: faker.word.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];
