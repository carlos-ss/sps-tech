import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders the footer with the left section image", () => {
    render(<Footer />);

    const leftImage = screen.getByAltText("sps");
    expect(leftImage).toBeInTheDocument();
    expect(leftImage).toHaveAttribute(
      "src",
      "https://i0.wp.com/spsolutions.com.mx/wp-content/uploads/2022/11/Logo-300x150-Px.png?fit=300%2C150&ssl=1"
    );
  });

  it("renders the footer with the center section text and image", () => {
    render(<Footer />);

    const centerText = screen.getByText(/Carlos-SS © 2025/i);
    expect(centerText).toBeInTheDocument();
    expect(centerText.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/carlos-ss"
    );

    const centerImage = screen.getByAltText("self-brand");
    expect(centerImage).toBeInTheDocument();
    expect(centerImage).toHaveAttribute("src", "/clss-rls.png");
  });

  it("renders the footer with the right section image", () => {
    render(<Footer />);

    const rightImage = screen.getByAltText("logo");

    expect(rightImage).toBeInTheDocument();
    expect(rightImage).toHaveAttribute("src", "/logo.png");
  });
});
