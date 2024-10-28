import { useQuery } from "@tanstack/react-query";
import { QUERYKEY } from "../data/constants";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { getAdminCourses } from "../api/admin-api";

export default function useAdminCourse({
  courseId,
  districtId,
}: {
  courseId: string;
  districtId: string;
}) {
  const data = useQuery({
    queryKey: [QUERYKEY.ADMINCOURSE],
    queryFn: () =>
      getAdminCourses({
        courseId,
        districtId,
      }),
    onError(err: AxiosError) {
      enqueueSnackbar(`${err.message}`, {
        variant: "error",
      });
    },
  });

  return data;
}
