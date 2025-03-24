import { userStore } from "@/store";
import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Drawer } from "flowbite-react";

import { HiMenu, HiSearch, HiShoppingCart, HiX } from "react-icons/hi";

const USER_LINKS = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

interface IHeaderLinkProps {
  name: string;
  path: string;
  children?: React.ReactNode;
}
const HeaderLink = ({ name, path, children }: IHeaderLinkProps) => {
  return (
    <li className="font-bold text-lg lg:text-2xl mx-4 hover:text-blue-500">
      <a href={path} className="inline-flex items-center">
        <span>{name}</span>
        {children && <span className="ml-2">{children}</span>}
      </a>
    </li>
  );
};
const MobileMenu = ({ loggedIn }: { loggedIn: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        aria-label="mobile hamburger menu"
        className="flex items-center md:hidden mr-6"
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu outside drawer"
        >
          {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>
      {menuOpen && (
        <Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          position="right"
        >
          <nav>
            <div className="flex items-center justify-between">
              <div
                aria-label="mobile hamburger menu"
                className="flex items-center md:hidden mr-6"
              >
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu inside drawer"
                >
                  {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
                </button>
              </div>

              <span className="flex items-center">
                <TextInput
                  id="search"
                  placeholder="Search"
                  aria-label="Search input"
                  inputMode="search"
                  className="w-11/12"
                />
                <HiSearch className=" text-gray-500" size={20} />
              </span>
            </div>
            <div className="mt-4 ">
              <ul className="flex flex-col justify-between gap-y-4">
                {USER_LINKS.map((link) => (
                  <HeaderLink key={link.name} {...link} />
                ))}
                {loggedIn ? (
                  <>
                    <HeaderLink name="Cart" path="/cart">
                      <HiShoppingCart />
                    </HeaderLink>
                    <HeaderLink name="Logout" path="/logout" />
                  </>
                ) : (
                  <HeaderLink name="Login" path="/login" />
                )}
              </ul>
            </div>
          </nav>
        </Drawer>
      )}
    </>
  );
};

const DesktopMenu = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <nav className="flex grow justify-between">
      <div
        aria-label="Header center section"
        className="w-3/4 flex justify-between items-center"
      >
        {loggedIn && (
          <>
            <ul className="inline-flex">
              {USER_LINKS.map((link) => (
                <HeaderLink key={link.name} {...link} />
              ))}
            </ul>
            <div className="relative flex items-center">
              <HiSearch className="absolute right-3 text-gray-500" size={20} />
              <TextInput
                id="search"
                placeholder="Search"
                aria-label="Search input"
                className="pr-10"
                inputMode="search"
              />
            </div>
          </>
        )}
      </div>

      <div aria-label="Header right section" className="flex  items-center">
        <ul className="inline-flex  ">
          {loggedIn ? (
            <>
              <HeaderLink name="Cart" path="/cart">
                <HiShoppingCart />
              </HeaderLink>
              <HeaderLink name="Logout" path="/logout" />
            </>
          ) : (
            <HeaderLink name="Login" path="/login" />
          )}
        </ul>
      </div>
    </nav>
  );
};

const Header = ({ isMobile }: { isMobile: boolean }) => {
  const { loggedIn } = userStore();

  return (
    <header className="flex items-center justify-between md:justify-normal">
      <div aria-label="Header left section">
        <img src="/branding.png" alt="branding" className="w-72" />
      </div>
      {isMobile ? (
        <MobileMenu loggedIn={loggedIn} />
      ) : (
        <DesktopMenu loggedIn={loggedIn} />
      )}
    </header>
  );
};
export default Header;
