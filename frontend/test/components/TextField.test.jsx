import { fireEvent, getByText, render, screen } from "@testing-library/react";
import TextField from "../../src/widgets/ui/textfield";
import React from "react";

describe("TextField render tests", () => {
  it("should display with label", async () => {
    const inputLabel = "label";
    const { getByText } = render(<TextField inputLabel={inputLabel} />);
    const inputElement = getByText(inputLabel);
    expect(inputElement).toBeInTheDocument();
  });

  it("should display without label and should work with get by role query", () => {
    render(<TextField />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should", () => {});
});

describe("TextField Validation", () => {
  it("should", () => {});
});
