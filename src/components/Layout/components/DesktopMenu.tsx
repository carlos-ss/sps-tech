import { USER_LINKS } from "./constants";
import { HeaderLink } from "./HeaderLink";
import { TextInput } from "flowbite-react";
import { HiSearch, HiShoppingCart } from "react-icons/hi";

export const DesktopMenu = ({ loggedIn }: { loggedIn: boolean }) => {
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
