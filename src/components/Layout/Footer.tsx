import { userStore } from "@/store";

const Footer = () => {
  const { loggedIn } = userStore((state) => state);

  return (
    <footer>
      {loggedIn ? (
        <h1>Shop links</h1>
      ) : (
        <h1>Login link or create account link</h1>
      )}
    </footer>
  );
};
export default Footer;
