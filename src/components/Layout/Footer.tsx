import { userStore } from "@/store";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center">
      <div aria-label="footer left section">
        <img
          src="https://i0.wp.com/spsolutions.com.mx/wp-content/uploads/2022/11/Logo-300x150-Px.png?fit=300%2C150&ssl=1"
          alt="sps"
          width={100}
        />
      </div>

      <div aria-label="footer center section">
        <p className="text-center inline-flex items-center">
          <a href="https://github.com/carlos-ss">Carlos-SS © 2025</a>
          <img src="/clss-rls.png" alt="self-brand" width={100} />
        </p>
      </div>

      <div aria-label="footer right section">
        <img src="/logo.png" alt="logo" width={100} />
      </div>
    </footer>
  );
};
export default Footer;
