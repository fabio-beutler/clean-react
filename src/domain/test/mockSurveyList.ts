import { faker } from "@faker-js/faker";

import { SurveyModel } from "@/domain/models";

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.string.uuid(),
  question: faker.word.words(10),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
  answers: [
    {
      image: faker.image.url(),
      answer: faker.word.words(5),
    },
    {
      answer: faker.word.words(4),
    },
  ],
});

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];
