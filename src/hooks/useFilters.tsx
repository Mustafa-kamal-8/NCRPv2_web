import { useQuery } from "@tanstack/react-query";
import { QUERYKEY } from "../data/constants";
import { courseLoad } from "../api/courses-api";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { casteState } from "../states/atoms";

export default function useFilters() {
  const setCaste = useSetRecoilState(casteState);

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: [QUERYKEY.COURSELOAD],
    queryFn: courseLoad,
    onSuccess(data) {
      if (!data.caste) {
        enqueueSnackbar("No caste data found from server!");
        return;
      }
      setCaste(data.caste);
    },
    onError(err: AxiosError) {
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    },
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, isSuccess };
}
