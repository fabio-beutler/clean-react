import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";

import { SurveyModel } from "@/domain/models";
import { mockSurveyModel } from "@/domain/test";
import { IconName } from "@/presentation/components";

import SurveyItem from "./SurveyItem";

vi.mock("next/image", () => ({
  default: (props: ComponentProps<"img">) => {
    return <img {...props} />;
  },
}));

const makeSut = (survey: SurveyModel = mockSurveyModel()) => {
  render(<SurveyItem survey={survey} />);
};

describe("SurveyItem Component", () => {
  test("Should render with correct values", () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date("2023-08-10T00:00:00"),
    });
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveAttribute("src", IconName.thumbUp);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("10");
    expect(screen.getByTestId("month")).toHaveTextContent(/^ago$/);
    expect(screen.getByTestId("year")).toHaveTextContent("2023");
  });
});
