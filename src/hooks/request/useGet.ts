import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/api";

export const useGet = <T>(key: string, url: string): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async (): Promise<T> => {
      const { data } = await api.get<T>(url);
      return data;
    },
  });
};
