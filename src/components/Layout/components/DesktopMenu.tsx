import { useStore } from "@/store";
import { USER_LINKS } from "./constants";
import { HeaderLink } from "./HeaderLink";
import { TextInput } from "flowbite-react";
import { HiSearch, HiShoppingCart } from "react-icons/hi";

export const DesktopMenu = ({ loggedIn }: { loggedIn: boolean }) => {
  const { cart } = useStore();
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
                <div className="relative">
                  <HiShoppingCart />
                  {(cart?.products.length ?? 0) > 0 && (
                    <span
                      aria-label={`items in cart ${cart?.products.length}`}
                      className="absolute -top-3 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
                    >
                      {cart?.products.length}
                    </span>
                  )}
                </div>
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
