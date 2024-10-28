import * as React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box, InputAdornment } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import useOTP from "../../hooks/useOTP";
import { submitOTP } from "../../api/otp-api";
import { Phone } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useSubmitOTP from "../../hooks/submitOTP";

interface FormValues {
  mobile: string;
  otp: string | undefined;
}

const schema = yup.object({
  mobile: yup
    .string()
    .required("Mobile number is required!")
    .length(10, "Invalid Mobile Number"),
  otp: yup
    .string()
    .optional()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),
});

export default function PreferenceAuth() {
  const [isOTPExpired, setIsOTPExpired] = React.useState(false);
  const [isOtpSent, setIsOtpSent] = React.useState(false);

  const navigate = useNavigate();
  const { isLoading, mutate, isSuccess, data } = useOTP();
  const {
    isLoading: submitOTPLoading,
    mutate: mutateSubmitOTP,
    isSuccess: submitOTPSuccess,
    data: otpDdata,
  } = useSubmitOTP();

  const otpVerify = () => {
    if (data?.otp.toString() === getValues("otp")) {
      navigate("edit", {
        state: {
          candidateId: data?.candidateId,
        },
        replace: true,
      });
      return;
    }
    enqueueSnackbar("Invalid OTP", {
      variant: "error",
    });
  };

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      mobile: "",
      otp: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    setIsOtpSent(true);
    mutate(data.mobile);
    // mutateSubmitOTP(data.otp);
    console.log(data);
  };

  const onOTPSubmit = (data: any) => {
    console.log(data);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOTPExpired(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            paddingY: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Authentication
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Controller
              control={control}
              name="mobile"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="mobile"
                  margin="normal"
                  type="number"
                  label="Mobile*"
                  fullWidth
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              )}
            />
            {isOtpSent && (
              <>
                <Controller
                  control={control}
                  name="otp"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      id="otp"
                      label="OTP*"
                      fullWidth
                      type="number"
                      error={!!errors.otp}
                      helperText={errors.otp?.message}
                      inputProps={{
                        maxLength: 6,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Button
                  size="small"
                  sx={{ mr: "auto" }}
                  onClick={() => mutate(getValues("mobile"))}
                  startIcon={<RefreshIcon />}
                >
                  Resend OTP
                </Button>
              </>
            )}{" "}
            <LoadingButton
              loading={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}
