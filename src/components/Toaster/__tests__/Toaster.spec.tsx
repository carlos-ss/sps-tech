import { render, screen } from "@testing-library/react";
import { Toaster } from "../Toaster";

describe("Toaster", () => {
  it("should render error toaster", () => {
    render(<Toaster message="Error" type="error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByLabelText("error-x")).toBeInTheDocument();
  });
  it("should render success toaster", () => {
    render(<Toaster message="Success" type="success" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByLabelText("success-check")).toBeInTheDocument();
  });
  it("should render warning toaster", () => {
    render(<Toaster message="Warning" type="warning" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByLabelText("warning-exclamation")).toBeInTheDocument();
  });
  it("should render info toaster", () => {
    render(<Toaster message="Info" type="info" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByLabelText("info-i")).toBeInTheDocument();
  });
  it("should not render toaster", () => {
    render(<Toaster message="None" type="none" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
