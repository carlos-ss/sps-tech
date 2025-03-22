import { urls } from "@/api";
import { useStore } from "../store";
import { useGet } from "@/hooks/request/useGet";
import { IUser } from "@/types/Users";

const Test = () => {
  const { someValue } = useStore((state) => state.temp);

  const { data } = useGet<IUser[]>("getUsers", urls.users.all);

  return <div className="bg-red-50">{someValue}</div>;
};
export default Test;
