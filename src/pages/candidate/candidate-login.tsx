import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
// import decode from "jwt-decode";
// import { decode } from "jwt-decode";
// import useSignIn from "react-auth-kit";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as z from "zod";
import { sendOTP } from "../../api/candidate-api";
import Input from "../../components/ui/input";
import { ROUTE_PATHS } from "../../data/constants";
import AuthLayout from "../../layouts/auth-layout";
import { TextField, Box,IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { submitOTP } from "../../api/candidate-api";
import { Phone } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { addCourse } from "../../api/courses-api";
import { useEffect } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const schema = z.object({
  phone: z
    .string()
    .min(10, { message: "Please check your number" })
    .max(10, { message: "Please check your number" }),
  password: z.string().min(1, { message: "Please check your password" }),
});

export default function CandidateLogin() {
  const navigate = useNavigate();
  //   const signIn = useSignIn();

  const { handleSubmit, control, register, formState, setValue, watch } =
    useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        phone: "",
        password: "",
      },
    });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [mutationData, setMutationData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const { mutate, data } = useMutation({
    mutationFn: sendOTP,
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
        enqueueSnackbar(data.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });

        navigate("/auth/submit-otp", { state: { otpData: data } });
      }
    },
  });

  console.log("this is the sent OTP data from outside", data?.candidateId);

  const { mutate: mutateSubmitOTP, data: candidateData } = useMutation({
    mutationFn: submitOTP,
    onSuccess(data: any) {
      if(data.status=="error"){
        toast.error(data?.message || 'No Candidate Found')
       return
      }
      if(data.status == "success"){
        
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
      else{
        toast.error('No Candidate Found')
      }
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message );

    },
  });

  const [otp, setOtp] = useState("");

  const handleButtonClick = () => {
    console.log("Text Input Value:", phoneNumber);

    const otpData = {
      mobile: phoneNumber,
    };
    mutate(otpData);
  };

  const handleSubmitOTPButtonClick = () => {
    console.log("Text Input Value:",phoneNumber.length );
  
    if (!phoneNumber) {
      toast.error(" Phone Number is Required");
       return; // Stop further execution
     }
     if (phoneNumber.length !== 10) {
      toast.error(" Phone Number must be 10 digit");
       return; // Stop further execution
     }
    if (!password) {
      toast.error("Password is Required"); // Open the dialog if the password is missing
      return; // Stop further execution
    }
   
    const submitOTPData = {
      mobile: phoneNumber,
      password: password,
    };
    mutateSubmitOTP(submitOTPData);

    console.log("These are the candidate Data", candidateData.candidateId);
  };

  useEffect(() => {
    function scrollWindowUp() {
      const scrollStep = -30;
      const scrollInterval = 5;

      const scrollIntervalId = setInterval(() => {
        if (window.scrollY === 0) {
          clearInterval(scrollIntervalId);
        } else {
          window.scrollBy(0, scrollStep);
        }
      }, scrollInterval);
    }

    scrollWindowUp();
  }, []);

 

  return (
    <>
    <h1  style={{display:"flex" ,marginTop:"20px",marginBottom:"-40px",justifyContent:"center",color:"#3498db", alignItems:"center"}}>Welcome Back !</h1>
    <AuthLayout
  
      title="Candidate Login"
     
    
     
      // description="An OTP will be sent to your mobile number for verification"
    >
   
      {" "}
      <Toaster />
      <Box
        sx={{
          paddingY: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          
        }}
      >
        {/* <Stack alignContent={"center"} pb={2}>
          <Phone color="primary" />
        </Stack> */}
        <Stack direction="column" spacing={3}>
          <TextField
            label="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              const newValue = e.target.value;
              // Allow only numbers and restrict to 10 digits
              if (/^\d*$/.test(newValue) && newValue.length <= 10) {
                setPhoneNumber(newValue);
              }
            }}
            sx={{ width: '400px' }} 
          
          />

<TextField
      label="Enter Password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />




          <Button variant="contained" onClick={handleSubmitOTPButtonClick}>
            Login
          </Button>
        </Stack>
      </Box>
      <Stack
        gap={2}
        pt={4}
        component="form"
        // onSubmit={handleSubmit(onSubmit)}
      ></Stack>

<Typography align="center" py={1} color="GrayText" variant="body2">
        Reset Password{" "}
        <Button
          component={Link}
          to={`/auth/change-password`}
          size="large"
          sx={{ fontWeight: 1500 }}
        >
          Reset
        </Button>
      </Typography>


      <Typography align="center" py={1} color="GrayText" variant="body2">
        Don't have an Account?{" "}
        <Button
          component={Link}
          to={`/${ROUTE_PATHS.CANDIDATE_REGISTER}`}
          size="large"
          sx={{ fontWeight: 1500 }}
        >
          Sign up
        </Button>
      </Typography>

    </AuthLayout>
    </>
  );
}
