// Pagination.test.js
import React from "react";
import {
  screen,
  render,
  fireEvent,
  spyOn,
  getByTestId,
  queryByTestId,
} from "@testing-library/react";
import Pagination from "../../src/widgets/ui/pagination";
//import { jest } from "@jest/globals";

describe("Pagination Component - Positive Test Cases", () => {
  it("renders pagination with correct page numbers", () => {
    render(<Pagination currentPage={3} totalPages={10} fetchData={() => {}} />);

    expect(screen.getByTestId("current-page")).toHaveTextContent(/^3$/);
    expect(screen.getByTestId("last-page")).toHaveTextContent(/^10$/);
  });

  it("calls fetchData with correct page number on previous button click", () => {
    let fetchDataCalls = 0;
    let destinationPage = 0;
    const fetchDataMock = (pageNumber) => {
      fetchDataCalls++;
      destinationPage = pageNumber;
    };
    const { getByText } = render(
      <Pagination currentPage={3} totalPages={10} fetchData={fetchDataMock} />,
    );

    fireEvent.click(getByText("Previous"));
    expect(fetchDataCalls).toBe(1);
    expect(destinationPage).toBe(2);
  });

  it("calls fetchData with correct page number on next button click", () => {
    let fetchDataCalls = 0;
    let destinationPage = 0;
    const fetchDataMock = (pageNumber) => {
      fetchDataCalls++;
      destinationPage = pageNumber;
    };
    const { getByText } = render(
      <Pagination currentPage={3} totalPages={10} fetchData={fetchDataMock} />,
    );

    fireEvent.click(getByText("Next"));
    expect(fetchDataCalls).toBe(1);
    expect(destinationPage).toBe(4);
  });

  it("disables previous button on first page", () => {
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={10} fetchData={() => {}} />,
    );
    expect(getByText("Previous")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    const { getByText } = render(
      <Pagination currentPage={10} totalPages={10} fetchData={() => {}} />,
    );
    expect(getByText("Next")).toBeDisabled();
  });
});

describe("Pagination Component - Edge Cases and Error Handling", () => {
  it("renders pagination with empty data", async () => {
    render(<Pagination currentPage={0} totalPages={0} fetchData={() => {}} />);

    expect(screen.getByTestId("current-page")).toHaveTextContent(/^0$/);
    expect(screen.getByTestId("last-page")).toHaveTextContent(/^0$/);
  });

  it("does not call fetchData on previous button click when on first page", () => {
    let fetchDataCalls = 0;
    const fetchDataMock = () => {
      fetchDataCalls++;
    };
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={5} fetchData={fetchDataMock} />,
    );
    fireEvent.click(getByText("Previous"));
    expect(fetchDataCalls).toBe(0);
  });

  it("does not call fetchData on next button click when on last page", () => {
    let fetchDataCalls = 0;
    const fetchDataMock = () => {
      fetchDataCalls++;
    };
    const { getByText } = render(
      <Pagination currentPage={5} totalPages={5} fetchData={fetchDataMock} />,
    );
    fireEvent.click(getByText("Next"));
    expect(fetchDataCalls).toBe(0);
  });
});
