interface IHeaderLinkProps {
  name: string;
  path: string;
  children?: React.ReactNode;
}
export const HeaderLink = ({ name, path, children }: IHeaderLinkProps) => {
  return (
    <li className="font-bold text-lg lg:text-2xl mx-4 hover:text-blue-500">
      <a href={path} className="inline-flex items-center">
        <span>{name}</span>
        {children && <span className="ml-2">{children}</span>}
      </a>
    </li>
  );
};
