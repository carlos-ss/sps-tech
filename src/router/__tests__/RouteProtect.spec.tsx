import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import RouteProtect from "../RouteProtect";
import { userStore } from "@/store";
import { vi } from "vitest";

const localRender = () => {
  render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route
          path="/protected"
          element={
            <RouteProtect>
              <div>Protected Content</div>
            </RouteProtect>
          }
        />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("RouteProtect", () => {
  it("redirects to /login if no token is present", () => {
    localStorage.removeItem("token");
    const setLoggedInSpy = vi.spyOn(userStore.getState(), "setLoggedIn");

    localRender();

    expect(setLoggedInSpy).toHaveBeenCalledWith(false);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders children if token is present", () => {
    localStorage.setItem("token", "test-token");
    const setLoggedInSpy = vi.spyOn(userStore.getState(), "setLoggedIn");
    localRender();

    expect(setLoggedInSpy).toHaveBeenCalledWith(true);
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
