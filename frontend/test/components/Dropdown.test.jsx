import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "../../src/widgets/ui/dropdown";
import React from "react";

const mockOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const user = userEvent.setup();

describe("Rendering", () => {
  it("renders dropdown with options", async () => {
    render(
      <Dropdown
        options={mockOptions}
        label="Select an option"
        value="option1"
        onChange={() => {}}
      />,
    );
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    await user.click(selectElement);

    let option = screen.queryAllByTestId("select-option");
    expect(option[1]).toHaveTextContent(mockOptions[0].label);
    expect(option[2]).toHaveTextContent(mockOptions[1].label);
    expect(option[3]).toHaveTextContent(mockOptions[2].label);
  });

  it("should render with default option as first option", () => {
    render(
      <Dropdown
        options={mockOptions}
        label="Select an option"
        value="option1"
        onChange={() => {}}
      />,
    );

    let option = screen.getAllByTestId("select-option");
    expect(option[0].getAttribute("value")).toBe(mockOptions[0].value);
  });
});

describe("Interactions", () => {
  it("calls onChange function when an option is selected", async () => {
    let changeCall = 0;
    const onChangeMock = () => {
      changeCall++;
    };
    render(
      <Dropdown
        options={mockOptions}
        label="Select an option"
        value="option1"
        onChange={onChangeMock}
      />,
    );

    const dropdown = screen.getByRole("combobox");

    await user.click(dropdown);
    await user.click(screen.getByText("Option 2"));

    let option = screen.getAllByTestId("select-option");

    expect(changeCall).toBe(1);
    expect(option[0].getAttribute("value")).toBe(mockOptions[1].value);
  });
});
