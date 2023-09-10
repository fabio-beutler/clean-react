import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";

import { SurveyModel } from "@/domain/models";
import { mockSurveyModel } from "@/domain/test";
import { IconName } from "@/presentation/components";

import Item from "./Item";

vi.mock("next/image", () => ({
  default: (props: ComponentProps<"img">) => {
    return <img {...props} />;
  },
}));

const makeSut = (survey: SurveyModel = mockSurveyModel()) => {
  render(<Item survey={survey} />);
};

describe("Item Component", () => {
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

  test("Should render with correct values for icon and day", () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date("2010-10-03T00:00:00"),
    });
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "src",
      IconName.thumbDown,
    );
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("03");
    expect(screen.getByTestId("month")).toHaveTextContent(/^out$/);
    expect(screen.getByTestId("year")).toHaveTextContent("2010");
  });
});
