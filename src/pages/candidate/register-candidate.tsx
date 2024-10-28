import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRef } from "react";

import {
  TextField,
  Button,
  Typography,
  Stack,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import AuthLayout from "../../layouts/auth-layout";
import { Link } from "react-router-dom";
import useFilters from "../../hooks/useFilters";
import { registerCandidate } from "../../api/candidate-api";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import asdmLogo from "../../assets/asdm-logo.jpg";
import Register from "../../assets/Register.jpg";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline"; // Example for Placement Preference icon
import { HouseOutlined } from "@mui/icons-material";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  middleName: yup.string(),
  lastName: yup.string().required("Last Name is required"),
  dob: yup
    .string()
    .required("Date of Birth is required in the YYYY-MM-DD format"),
  aadharNumber: yup
    .string()
    .required("Aadhar Number is required")
    .matches(/^\d{12}$/, "Invalid Aadhar Number"),
  mobile: yup.string(),
  qualification: yup.string().required("Qualification is required"),
  gender: yup.string().required("Gender is required"),
  caste: yup.string().required("Caste is required"),
});

// 340546281329 12 digist
const boxStyle = {
  backgroundColor: "white",
  padding: "20px",
  margin: "20px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  flex: "1",
  marginTop: "-40px",
  marginBottom: "40px",
};

type Props = {
  course: Course;
  districts: any;
  cookieData: any;
  cookieCourses: CookieCourses;
  // onDistrict1Change: any;
  // onDistrict2Change: any;
  // onDistrict3Change: any;
  noAction?: boolean;
};

// const courses = getAllCookies().value

export default function RegisterCandidate() {
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [districtsArrayValues, setDistrictArrayValues] = useState([]);
  const [qualificationArrayValues, setQualificationArrayValues] = useState([]);
  const [qulificationIdArrayValues, setQualificationIdArrayValues] = useState(
    []
  );
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const qualificationName = localStorage.getItem("qualificationName");

  const qualificationId = localStorage.getItem("qualificationId");
  const [referenceIdValue, setReferenceIdValue] = useState();
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus the next input field
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  console.log({
    qualificationId,
    qualificationName,
  });

  const handleOpenSuccessDialog = () => {
    setSuccessDialogOpen(true);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const { isLoading: filterLoading, data: filterData } = useFilters();

  console.log("These are the dropdown filters", filterData);
  console.log("These are the states", filterData?.state);

  const qualification = "";

  // getAll Cookies is used here to display all the unique districts selected when selected from course

  const getAllCookies = () => {
    function isCookieStorageEmpty() {
      return document.cookie === ""; // if cookie is empty this function is run
    }

    if (!isCookieStorageEmpty()) {
      let cookies = document.cookie.split(";");
      let values = cookies.map((cookie) => cookie.trim().split("=")[1]);

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
          employementPreference,
        ] = cookieValue.split(",");

        return {
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
          employementPreference,
        };
      });

      const preferredDistrict1Array = addToBasket.map(
        (obj) => obj.preferred_district1
      );

      const uniqueDistrictsArray = [...new Set(preferredDistrict1Array)];

      setDistrictArrayValues(uniqueDistrictsArray);
      setCourses(addToBasket);
      console.log("slkmlsdl", setCourses(addToBasket));
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobile: "",
      adharNumber: "",
      dob: "",
    },
  });

  const handleQualificationChange = (selectedValue: any) => {
    if (selectedValue === "") {
      setValue("qualification", "");
    } else {
      setValue("qualification", selectedValue);
    }
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [mobile, setMobile] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [dob, setDob] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    const body = {
      firstName,
      middleName,
      lastName,
      mobile,
      adharNumber,
      dob,
    };
    try {
      const response = await axios.post(
        "https://ncrpv2.skillmissionassam.org/nw/verify",
        body
      );
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setSuccess(response.data);
        console.log("jjj------>", response.data);

        toast.success("OTP Send Successfully!");
        // navigate("/auth/Register", { state: { data: body } });
      } else if (
        response.data.message === "Your are already Enrolled in a Batch"
      ) {
        toast.error(
          response?.data?.message || "An error occurred. Please try again."
        );
        setTimeout(() => {
          navigate("/auth/candidate-login");
        }, 500);
      } else {
        toast.error(
          response?.data?.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  console.log("sucesssss", success);

  const handleOTPSubmit = async () => {
    const bodyy = {
      mobile,
      otp,
    };
    const body = {
      mobile,
      dob,
      adharNumber,
    };
    try {
      const response = await axios.post(
        "https://ncrpv2.skillmissionassam.org/nw/verifyOTP",
        bodyy
      );
      if (response.data.status === "success") {
        setSuccess(response.data.messege);
        toast.success("Login successful!");
        console.log("bodyyyyyyyyy", body);
        navigate("/auth/Register", { state: { data: body } });
      } else if (response.data.message === "Invalid OTP") {
        toast.error(
          response?.data?.message || "An error occurred. Please try again."
        );
        // setTimeout(() => {
        //   navigate("/auth/candidate-login");
        // }, 500);
      } else {
        toast.error(
          response?.data?.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const onSubmit = (data) => {
    let candidateData = {
      mobile: data.mobile,
      adharNumber: data.adharNumber,
    };

    mutate(candidateData);
  };

  const { mutate } = useMutation({
    mutationFn: registerCandidate,
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
        handleOpenSuccessDialog();
      }
      setReferenceIdValue(data.ref);
    },
  });

  useEffect(() => {
    getAllCookies();
  }, []);

  useEffect(() => {
    courses.forEach((course) => {
      console.log("Displayed Course ID:", course.courseId);
    });
  }, [courses]);

  console.log("courses---------->", courses);

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

  useEffect(() => {
    const defaultQualificationName = qualificationName;

    setValue("qualification", defaultQualificationName);
  }, [setValue, qualificationName]);

  useEffect(() => {
    let cookies = document.cookie.split(";");

    console.log("These are the cookies in an Array", cookies);
    if (cookies.length != 0) {
      getAllCookies();
    } else {
      console.log("Cookie length is zero");
    }

    let values = cookies.map((cookie) => cookie.trim().split("=")[1]);

    console.log("These are my cookie values", values);

    console.log("These are my cookies length", cookies.length);

    // setTotalCoursesInBaseket(cookies.length);
  }, []);

  useEffect(() => {
    console.log("These are the district Array values", districtsArrayValues);
    console.log(
      "These are the qualification Array values",
      qualificationArrayValues
    );
    console.log(
      "These are the qualification Id Array values",
      qulificationIdArrayValues
    );
  }, [
    districtsArrayValues,
    qualificationArrayValues,
    qulificationIdArrayValues,
  ]);

  const boxStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "8px",
    minHeight: "400px", // Adjust as per your design
  };

  const today = dayjs();

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  return (
    <>
      <AuthLayout title="" subTitle="" description="">
        <Toaster />
 
          
        <form onSubmit={handleSubmit(onSubmit)}>
      

        <Card sx={{padding:"10px"}}>
       
            <CardContent>
    
              <Grid container spacing={6}>
                
                
                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "200%",
                  }}
                  item
                  xs={12}
                  sm={5}
                >
                   
                  
                   <div style={{ maxHeight: "500px", overflowY: "auto", width: "100%" }}>
                   <Stack
                      direction="column"
                      alignItems="center"
                    
                    >
                        <Typography variant="h5" gutterBottom>
                        Selected Courses :
                      </Typography>
                    </Stack>
                  
                  <Grid container item spacing={2} direction="column">
                
              
                  
                    {courses.map((course) => (
                      <Grid item xs={12} sm={4} key={course.courseId}>
                        <div style={boxStyle}>
                       
                          
                          <Typography
                            variant="h6"
                            align="center"
                            style={{ marginBottom: "5px", color: "blue" }}
                          >
                            Priority: {course.priorityLevel}
                          </Typography>
                          <Typography
                            variant="h6"
                            align="center"
                            style={{ marginBottom: "20px", fontSize: "1.3rem" }}
                          >
                            {course.courseName}
                          </Typography>
                          <Typography
                            variant="h6"
                            align="center"
                            style={{ fontSize: "1rem" }}
                          >
                            <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />{" "}
                            Preferred District 1: {course.preferred_district1}
                          </Typography>
                          {course.preferred_district2 !== "null" && (
                            <Typography
                              variant="h6"
                              align="center"
                              style={{ fontSize: "1rem" }}
                            >
                              <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />{" "}
                              Preferred District 2: {course.preferred_district2}
                            </Typography>
                          )}
                          {course.preferred_district3 !== "null" && (
                            <Typography
                              variant="h6"
                              align="center"
                              style={{ fontSize: "1rem" }}
                            >
                              <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />{" "}
                              Preferred District 3: {course.preferred_district3}
                            </Typography>
                          )}
                          <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="h6"
                                align="center"
                                style={{
                                  fontSize: "1rem",
                                  display: "inline-flex",
                                  alignItems: "center",
                                }}
                              >
                                <HouseOutlined sx={{ fontSize: 20 }} />
                                Hostel Accommodations:
                                {course.hostelPreference === "1" ? "Yes" : "No"}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="h6"
                                align="center"
                                style={{
                                  fontSize: "1rem",
                                  display: "inline-flex",
                                  alignItems: "center",
                                }}
                              >
                                <WorkOutlineIcon sx={{ fontSize: 20 }} />
                                Placement Preference:{" "}
                                {course.employementPreference === "1" ? "Yes" : "No"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </Grid>
                

                <Grid item xs={12} sm={7}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <Stack
                      direction="column"
                      alignItems="center"
                      marginBottom={"20px"}
                    >
                      <Typography variant="h5" gutterBottom>
                        Register Now
                      </Typography>
                    </Stack>
                    {!success && (
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1" fontWeight={500}>
                              First Name
                            </Typography>
                            <TextField
                              size="small"
                              placeholder="Your First Name"
                              // error={!!errors.firstName}
                              // helperText={errors.firstName?.message}
                              fullWidth
                              margin="none"
                              value={firstName}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(value)) {
                                  // Only letters and spaces
                                  setFirstName(value);
                                }
                              }}
                              InputLabelProps={{
                                style: { color: "black" },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1" fontWeight={500}>
                              Middle Name
                            </Typography>
                            <TextField
                              size="small"
                              placeholder="Your Middle Name"
                              // error={!!errors.middleName}
                              // helperText={errors.middleName?.message}
                              fullWidth
                              margin="none"
                              value={middleName}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(value)) {
                                  // Only letters and spaces
                                  setMiddleName(value);
                                }
                              }}
                              InputLabelProps={{
                                style: { color: "black" },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1" fontWeight={500}>
                              Last Name
                            </Typography>
                            <TextField
                              size="small"
                              placeholder="Your Last Name"
                              // error={!!errors.lastName}
                              // helperText={errors.lastName?.message}
                              fullWidth
                              margin="none"
                              value={lastName}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(value)) {
                                  // Only letters and spaces
                                  setLastName(value);
                                }
                              }}
                              InputLabelProps={{
                                style: { color: "black" },
                              }}
                            />
                          </Grid>
                        </Grid>

                        <Stack pb={1.5}></Stack>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight={500}>
                              Phone Number
                            </Typography>
                            <TextField
                              size="small"
                              placeholder="Your Phone Number"
                              inputProps={{ maxLength: 10, minLength: 10 }}
                              error={!!errors.mobile}
                              helperText={errors.mobile?.message}
                              fullWidth
                              margin="none"
                              value={mobile}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) {
                                  setMobile(value);
                                }
                              }}
                              InputLabelProps={{
                                style: { color: "black" },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight={500}>
                              Aadhar Number
                            </Typography>
                            <TextField
                              size="small"
                              style={{ marginBottom: "15px" }}
                              inputProps={{ maxLength: 12 }}
                              placeholder="Your Adhar Number"
                              // {...Register("adharNumber")}
                              error={!!errors.adharNumber}
                              helperText={errors.adharNumber?.message}
                              fullWidth
                              margin="none"
                              value={adharNumber}
                              onChange={(e) => setAdharNumber(e.target.value)}
                              InputLabelProps={{
                                style: { color: "black" },
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Typography variant="body1" fontWeight={500}>
                          Date Of Birth
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <Controller
                              name="dob"
                              control={control}
                              render={({
                                field: { onChange, value },
                                fieldState: { error },
                              }) => (
                                <DatePicker
                                  label="dob (MM-DD-YYYY)"
                                  value={dob ? dayjs(dob, "YYYY-MM-DD") : null}
                                  onChange={(date) => {
                                    const formattedDate = date
                                      ? formatDate(date)
                                      : null;
                                    setDob(formattedDate);
                                    onChange(formattedDate);
                                  }}
                                  maxDate={today}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={!!error}
                                      helperText={error ? error.message : null}
                                      fullWidth
                                      margin="none"
                                      InputLabelProps={{
                                        style: { color: "black" },
                                      }}
                                    />
                                  )}
                                />
                              )}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </>
                    )}
                    {/* <TextField
                      size="small"
                      style={{ marginBottom: "25px" }}
                      inputProps={{ maxLength: 12 }}
                      placeholder=" Date Of Birth"
                      {...register("DOB")}
                      error={!!errors.DOB}
                      helperText={errors.DOB?.message}
                      fullWidth
                      margin="none"
                      value={DOB}
                      onChange={(e) => setDob(e.target.value)}
                      InputLabelProps={{
                        style: { color: "black" },
                      }}
                    /> */}

                    {/* Include other TextField components similarly with icons */}

                    {success && (
                      <>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          style={{ marginTop: "15px" }}
                        >
                          Enter OTP
                        </Typography>
                        <Grid container spacing={1} justifyContent="center">
                          <Grid item>
                            <TextField
                              size="small"
                              inputProps={{
                                maxLength: 6, // Adjust this number based on the length of your OTP
                                style: {
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                  letterSpacing: "0.5rem",
                                },
                              }}
                              value={otp} // otp will be a single string
                              onChange={(e) => setOtp(e.target.value)} // Directly set the OTP value
                              sx={{
                                width: "15rem",
                                height: "3rem",
                                marginRight: "5px",
                              }}
                            />
                          </Grid>
                        </Grid>

                        <Button
                          type="submit"
                          // disabled={qualificationId ? false : true}
                          variant="contained"
                          onClick={handleOTPSubmit}
                          fullWidth
                          style={{ marginTop: "20px" }}
                        >
                          Submit
                        </Button>
                      </>
                    )}

                    {!success && (
                      <Button
                        type="submit"
                        disabled={qualificationId ? false : true}
                        variant="contained"
                        onClick={handleRegister}
                        fullWidth
                        style={{ marginTop: "20px" }}
                      >
                        Register
                      </Button>
                    )}
                    <Typography variant="caption" color="darkred">
                      {qualificationId ? (
                        " "
                      ) : (
                        <ErrorOutlineOutlinedIcon
                          style={{ fontSize: 15, paddingTop: 3 }}
                        />
                      )}
                      {qualificationId
                        ? " "
                        : " Please Add a Course to Basket First"}
                    </Typography>
                    <Typography
                      align="center"
                      py={2}
                      color="GrayText"
                      variant="body2"
                    >
                      Add Courses to Basket!{" "}
                      <Button
                        component={Link}
                        to="/courses"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      >
                        Add Course
                      </Button>
                    </Typography>
                    <Typography align="center" color="GrayText" variant="body2">
                      Already have an Account?{" "}
                      <Button
                        component={Link}
                        to="/auth/candidate-login"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      >
                        Login
                      </Button>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
        <Dialog open={isSuccessDialogOpen}>
          <DialogContent>
            <Stack alignItems="center">
              <img
                // src="../src/assets/green_double_circle_check_mark.jpg"
                // src="../src/assets/asdm-logo.jpg"
                src={asdmLogo}
                alt="Success"
                style={{ width: "30%", height: "auto" }}
              />
              <Typography variant="h6" align="center" gutterBottom>
                Registration Successful!
              </Typography>
            </Stack>
            <Typography variant="body1" align="center" paragraph>
              Thank you for registering. Your registration was successful.
            </Typography>
            <Typography variant="subtitle2" align="center" paragraph>
              Your Reference Id is {referenceIdValue}
            </Typography>
            <Stack alignItems="center">
              <Button
                component={Link}
                to="/auth/candidate-login"
                size="medium"
                sx={{ fontWeight: 500, width: "100px" }}
                variant="contained"
              >
                Login
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccessDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </AuthLayout>
    </>
  );
}
