import { useState } from "react";
import { Drawer, TextInput } from "flowbite-react";
import { HiMenu, HiSearch, HiShoppingCart, HiX } from "react-icons/hi";
import { USER_LINKS } from "./constants";
import { HeaderLink } from "./HeaderLink";

export const MobileMenu = ({ loggedIn }: { loggedIn: boolean }) => {
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
