import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { api } from "@/api";

export const usePut = <TResponse, TError, TVariables>(
  url: string
): UseMutationResult<TResponse, TError, TVariables> => {
  return useMutation<TResponse, TError, TVariables>({
    mutationFn: async (variables: TVariables): Promise<TResponse> => {
      const { data } = await api.put<TResponse>(url, variables);
      return data;
    },
  });
};
