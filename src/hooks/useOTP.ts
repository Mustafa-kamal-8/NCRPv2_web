import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { sendOTP } from "../api/otp-api";

export default function useOTP() {
  const otp = useMutation({
    mutationFn: sendOTP,
    onSuccess(data) {
      enqueueSnackbar("OTP sent Successfully!", {
        variant: "success",
      });
      // enqueueSnackbar(`${data?.message}`, {
      //   variant: "default",
      // });
    },
    onError(error: AxiosError) {
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
    },
  });

  return otp;
}
