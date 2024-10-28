import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { submitOTP } from "../api/otp-api";

export default function useSubmitOTP() {
  const otp = useMutation({
    mutationFn: submitOTP,
    onSuccess(data) {
      enqueueSnackbar("Login Successfull!", {
        variant: "success",
      });
      enqueueSnackbar(`${data?.message}`, {
        variant: "default",
      });
    },
    onError(error: AxiosError) {
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
    },
  });

  return otp;
}
