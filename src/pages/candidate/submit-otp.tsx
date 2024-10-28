import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
// import decode from "jwt-decode";
// import { decode } from "jwt-decode";
// import useSignIn from "react-auth-kit";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { sendOTP } from "../../api/candidate-api";
import Input from "../../components/ui/input";
import { ROUTE_PATHS } from "../../data/constants";
import AuthLayout from "../../layouts/auth-layout";
import { TextField, Box } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { submitOTP } from "../../api/candidate-api";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyIcon from "@mui/icons-material/Key";
import { enqueueSnackbar } from "notistack";
import { addCourse } from "../../api/courses-api";

const schema = z.object({
  phone: z
    .string()
    .min(10, { message: "Please check your number" })
    .max(10, { message: "Please check your number" }),
  password: z.string().min(1, { message: "Please check your password" }),
});

export default function SubmitOTP() {
  const location = useLocation();

  const otpData = location.state?.otpData || null;
  console.log("This is candidate mobile number", otpData?.mobile);

  const navigate = useNavigate();

  function clearAllCookies() {
    // Split the cookie string into an array of individual cookies
    const cookies = document.cookie.split(";");

    // Iterate through the cookies and remove each one
    cookies.forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }

  const { mutate: mutateAddCourse, data: courseData } = useMutation({
    mutationFn: addCourse,
    onSuccess(data: any) {
      enqueueSnackbar("Courses Added to My Profile", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    },
    onError() {
      enqueueSnackbar("Courses Already added to profile", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: sendOTP,
    onSuccess(data: any) {
      toast.success(data?.message);
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  const { mutate: mutateSubmitOTP, data: candidateData } = useMutation({
    mutationFn: submitOTP,
    onSuccess(data: any) {
      if (data.status == "error") {
        enqueueSnackbar(data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        // enqueueSnackbar(data.message, {
        //   variant: "success",
        //   anchorOrigin: {
        //     vertical: "bottom",
        //     horizontal: "right",
        //   },
        // });
        console.log("This is the candidate Id", data.candidateId);
        localStorage.setItem("candidateId", data.candidateId);
        localStorage.setItem("qualificationId", data.qualificationId);

        if (data.candidateId && document.cookie !== "") {
          let cookies = document.cookie.split(";");

          let values = cookies.map((cookie) => cookie.trim().split("=")[1]);

          console.log("These are the cookie values received now", values);

          const addToBasket = values.map((cookieValue) => {
            const [
              courseId,
              courseName,
              preferred_district1,
              preferred_district2,
              preferred_district3,
              preferred_district1Id,
              preferred_district2Id,
              preferred_district3Id,
              priorityLevel,
              hostelPreference,
              selfEmploy,
            ] = cookieValue.split(",");

            return {
              candidateId: data.candidateId,
              courseId,
              courseName,
              preferred_district1,
              preferred_district2,
              preferred_district3,
              preferred_district1Id,
              preferred_district2Id,
              preferred_district3Id,
              priorityLevel,
              hostelPreference,
              selfEmploy,
            };
          });
          console.log(
            "These are the cookie values to be added to database",
            addToBasket
          );

          const convertToNull = (value: any) =>
            value === "null" ? null : value;

          const filteredArray = addToBasket.map((item) => {
            const {
              courseId,
              preferred_district1Id,
              preferred_district2Id,
              preferred_district3Id,
              priorityLevel,
              hostelPreference,
              selfEmploy,
            } = item;

            return {
              candidateId: data.candidateId,
              courseId: convertToNull(courseId),
              preferred_district1Id: convertToNull(preferred_district1Id),
              preferred_district2Id: convertToNull(preferred_district2Id),
              preferred_district3Id: convertToNull(preferred_district3Id),
              priorityLevel: convertToNull(priorityLevel),
              hostelPreference: convertToNull(hostelPreference),
              selfEmploy: convertToNull(selfEmploy),
            };
          });

          console.log("thi is the unfiltered array", addToBasket);
          console.log("These is the filtered array", filteredArray);
          console.log("All courses are now added to my profile ");
          mutateAddCourse(filteredArray);
          console.log("function is working");
          clearAllCookies();
        } else {
          console.log("Function not called because conditions are not met");
        }
        console.log("these are the login data", data);
        navigate(`/${ROUTE_PATHS.CANDIDATE_PROFILE}`);
        window.location.reload();
      }
    },
    onError(error: any) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    },
  });

  // Save data to localStorage

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmitOTPButtonClick = () => {
    console.log("Text Input Value:", otp);
    const submitOTPData = {
      candidateId: otpData.candidateId,
      mobile: otpData.mobile,
      otp: otp,
    };
    mutateSubmitOTP(submitOTPData);
  };

  return (
    <AuthLayout
      title="Candidate Login"
      subTitle="Welcome back!"
      description="Please enter the OTP send to your mobile number to Login"
    >
      {" "}
      <Box
        sx={{
          paddingY: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack alignContent={"center"} pb={2}>
          <KeyIcon color="primary" />
        </Stack>
        <Stack direction="column" spacing={3}>
          <TextField
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button variant="contained" onClick={handleSubmitOTPButtonClick}>
            Submit
          </Button>
          <Button
            size="small"
            sx={{ mr: "auto" }}
            onClick={() => {
              const OTPData = {
                mobile: otpData?.mobile,
              };
              mutate(OTPData);
            }}
            startIcon={<RefreshIcon />}
          >
            Resend OTP
          </Button>
          {/* <Button>save to localStorage</Button>
          <Button
            onClick={() => {
              const candidateId = localStorage.getItem("candidateId");
              console.log("This is my candidate Id", candidateId);
            }}
          >
            retrieve from localStorage
          </Button> */}
        </Stack>
      </Box>
      <Stack gap={2} pt={4} component="form"></Stack>
      {/* <Typography align="center" py={2} color="GrayText" variant="body2">
        Don't have an Account?{" "}
        <Button
          component={Link}
          to={`/${ROUTE_PATHS.CANDIDATE_REGISTER}`}
          size="small"
          sx={{ fontWeight: 500 }}
        >
          Sign up
        </Button>
      </Typography> */}
    </AuthLayout>
  );
}
