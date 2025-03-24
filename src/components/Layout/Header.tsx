import { useStore } from "@/store";
import { MobileMenu } from "./components/MobileMenu";
import { DesktopMenu } from "./components/DesktopMenu";

const Header = ({ isMobile }: { isMobile: boolean }) => {
  const { loggedIn } = useStore();

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
