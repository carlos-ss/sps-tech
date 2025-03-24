import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { Flowbite } from "flowbite-react";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  return (
    <Flowbite>
      <div className="min-h-screen flex flex-col justify-between">
        <Header isMobile={isMobile} />
        <main className="flex-grow flex items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
};

export default Layout;
