import { render, screen } from "@testing-library/react";
import TextField from "../../src/widgets/ui/textfield";
import React from "react";

describe("TextField", () => {
  it("should render the label when label is provided", () => {
    render(<TextField label="label" />);

    const textField = screen.getByRole("textbox");
    expect(textField).toBeInTheDocument();
  });
});
