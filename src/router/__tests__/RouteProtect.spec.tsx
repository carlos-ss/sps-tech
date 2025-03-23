import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import RouteProtect from "../RouteProtect";
import { userStore } from "@/store";
import { vi } from "vitest";
import Cookies from "js-cookie";

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
    // no token has been set into js-cookie
    const setLoggedInSpy = vi.spyOn(userStore.getState(), "setLoggedIn");

    // render
    localRender();

    // validate that store has been called and redirected to login page
    expect(setLoggedInSpy).toHaveBeenCalledWith(false);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders children if token is present", () => {
    // set token into js-cookie
    Cookies.set("token", "test-token");
    const setLoggedInSpy = vi.spyOn(userStore.getState(), "setLoggedIn");

    // render
    localRender();

    // validate that store has been called and protected content is rendered
    expect(setLoggedInSpy).toHaveBeenCalledWith(true);
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
