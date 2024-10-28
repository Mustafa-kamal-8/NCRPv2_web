import { useInfiniteQuery } from "@tanstack/react-query";
import { fecthTrainingCenters } from "../api/tc-api";
import { QUERYKEY } from "../data/constants";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { districtState } from "../states/atoms";

const LIMIT = 9;

export default function useTrainingCenters(filters: any) {
  const district = useRecoilValue(districtState);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [QUERYKEY.COURSES],
    queryFn: ({ pageParam: page = 1 }) =>
      fecthTrainingCenters({
        lowLim: (page - 1) * LIMIT,
        hiLim: LIMIT,
        districtId: district?.districtID,
        ...filters,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.length / LIMIT);

      if (totalPages === 0) return undefined;
      if (allPages.length === totalPages) return undefined;

      return allPages.length + 1;
    },

    onError(error: AxiosError) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [district]);

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  };
}
