import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../../src/widgets/ui/Button";

describe('Renders correctly', () => {
  it('renders button with text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });
});

describe('Button onClick handler', () => {
  it('calls onClick handler when clicked', () => {
    const { getByText } = render(<Button>Click me</Button>);
    fireEvent.click(getByText('Click me'));
  });
});
