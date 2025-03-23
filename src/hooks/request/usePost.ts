import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { api } from "@/api";

export const usePost = <TResponse, TError, TVariables>(
  url: string
): UseMutationResult<TResponse, TError, TVariables> => {
  return useMutation<TResponse, TError, TVariables>({
    mutationFn: async (variables: TVariables): Promise<TResponse> => {
      const { data } = await api.post<TResponse>(url, variables);
      return data;
    },
  });
};
