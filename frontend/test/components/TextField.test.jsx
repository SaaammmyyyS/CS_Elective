import { render, screen } from "@testing-library/react";
import TextField from "../../src/widgets/ui/textfield";
import React from "react";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
  render(<TextField />);

  return {
    textBox: screen.getByRole("textbox"),
  };
};

describe("TextField render tests", () => {
  it("should display with label if it is given", async () => {
    const inputLabel = "label";
    const { getByText } = render(<TextField inputLabel={inputLabel} />);
    const inputElement = getByText(inputLabel);

    expect(inputElement).toBeInTheDocument();
  });

  it("should display without label and should work with get by role query", () => {
    const { textBox } = renderComponent();

    expect(textBox).toBeInTheDocument();
  });

  it("should have an empty initial value", () => {
    const { textBox } = renderComponent();

    expect(textBox.value).toBe("");
  });
});

describe("TextField Validation", () => {
  it("should return correct inputted text", async () => {
    const { textBox } = renderComponent();
    const user = userEvent.setup();
    const inputValue = "hello";

    await user.type(textBox, inputValue);

    expect(textBox.value).toBe(inputValue);
  });
});
