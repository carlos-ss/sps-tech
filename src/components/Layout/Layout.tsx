import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { Flowbite } from "flowbite-react";

const Layout = () => {
  return (
    <Flowbite>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
};

export default Layout;
