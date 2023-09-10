import { render, screen } from "@testing-library/react";

import { mockSurveyModel } from "@/domain/test";
import { IconName } from "@/presentation/components";

vi.mock("next/image", () => ({
  default: (props: ComponentProps<"img">) => {
    return <img {...props} />;
  },
}));

import { ComponentProps } from "react";

import SurveyItem from "./SurveyItem";
describe("SurveyItem Component", () => {
  test("Should render with correct values", () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    survey.date = new Date("2023-08-10T00:00:00");
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId("icon")).toHaveAttribute("src", IconName.thumbUp);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("10");
    expect(screen.getByTestId("month")).toHaveTextContent(/^ago$/);
    expect(screen.getByTestId("year")).toHaveTextContent("2023");
  });
});
