import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCourses } from "../api/courses-api";
import { QUERYKEY } from "../data/constants";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { districtState, qualificationState } from "../states/atoms";

const LIMIT = 9;

export default function useCourses(filters: any) {
  const district = useRecoilValue(districtState);
  const qualification = useRecoilValue(qualificationState);

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
      fetchCourses({
        lowLim: (page - 1) * LIMIT,
        hiLim: LIMIT,
        districtId: district?.districtID,
        qualificationId: qualification?.qualificationID,
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
  }, [district, qualification]);

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
