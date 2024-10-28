import { useQuery } from "@tanstack/react-query";
import { fetchCourseWithDistricts } from "../api/courses-api";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

export default function useCourseWithDistricts(courseId: string) {
  const data = useQuery({
    queryFn: () => fetchCourseWithDistricts(courseId),
    onSuccess(data) {
      if (data.status === "error") {
        enqueueSnackbar(data.message, {
          variant: "error",
        });
      }
    },
    onError(err: AxiosError) {
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    },
  });

  return data;
}
