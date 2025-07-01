import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { BaseSchema } from "valibot";
import { getPublicRequest } from "../services/fetchingService";

type UsePublicQueryProps = {
  key: any;
  url: string;
  schema: BaseSchema<any, any, any>;
  options?: Partial<UseQueryOptions<any, any>>;
};

export const usePublicQuery = <T>({
  key,
  url,
  schema,
  options = {},
}: UsePublicQueryProps) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () =>
      await getPublicRequest<T>({
        url,
        schema,
      }),
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
    retry: 3,
    structuralSharing: false,
    ...options,
  });
};
