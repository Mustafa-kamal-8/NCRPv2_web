import { useQuery } from "@tanstack/react-query";
import { getCandidate } from "../api/otp-api";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

export default function useCandidate(candidateId: number) {
  const data = useQuery({
    queryFn: () => getCandidate(candidateId),
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
