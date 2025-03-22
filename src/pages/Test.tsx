import { useStore } from "../store";

const Test = () => {
  const { someValue } = useStore((state) => state.temp);
  return <div className="bg-red-50">{someValue}</div>;
};
export default Test;
