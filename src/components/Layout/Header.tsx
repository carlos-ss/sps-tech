import { userStore } from "@/store";

const Header = () => {
  const { loggedIn } = userStore();

  return (
    <header>
      {loggedIn ? <h1>Welcome to shop </h1> : <h1>Log in to shop</h1>}
    </header>
  );
};
export default Header;
