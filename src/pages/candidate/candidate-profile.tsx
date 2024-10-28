import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { getCandidate, modifyCandidate } from "../../api/candidate-api";
import useFilters from "../../hooks/useFilters";
import AuthLayout from "../../layouts/auth-layout";
import CandidateProfileCourseCard from "../../components/cards/candidate-profile-course-card";
import { getCandidateCourses } from "../../api/candidate-api";
import { addCourse } from "../../api/courses-api";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Modal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = yup.object({
  // firstName: yup.string().required("First Name is required"),
  //   lastName: yup.string().required("Last Name is required"),
  //   dob: yup.date().required("Date of Birth is required"),
  //   aadharNumber: yup.string().required("Aadhar Number is required"),
  // .matches(/^\d{12}$/, "Invalid Aadhar Number"),
  //   phoneNumber: yup.string().required("Phone Number is required"),
  // .matches(/^\d{10}$/, "Invalid Phone Number"),
  //   qualification: yup.string().required("Qualification is required"),
  //   gender: yup.string().required("Gender is required"),
  //   caste: yup.string().required("Caste is required"),
  //   district1: yup.string().required("District 1 is required"),
  //   district2: yup.string().required("District 2 is required"),
  //   district3: yup.string().required("District 3 is required"),
  //   state1: yup.string().required("State 1 is required"),
  //   state2: yup.string().required("State 2 is required"),
  //   state3: yup.string().required("State 3 is required"),
  //   country: yup.string().required("Country is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 14,
  p: 3,
};

export default function CandidateProfile() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const course = [
    {
      courseName: "EV Driver",
      courseId: 1,
    },
    {
      courseName: "EV Driver",
      courseId: 2,
    },
    {
      courseName: "EV Driver",
      courseId: 3,
    },
  ];

  const candidateId = localStorage.getItem("candidateId");

  const { isLoading: filterLoading, data: filterData } = useFilters();

  console.log("filterData", filterData);

  console.log("These are the dropdown filters", filterData);
  console.log("These are the states", filterData?.state);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);

  const { data: candidateCourses } = useQuery({
    queryFn: () => getCandidateCourses(candidateId!),
    queryKey: ["candidate_courses"],
    onSuccess(data: any) {
      if (data.status == "error") {
        enqueueSnackbar(data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (data?.isAccess === "denied edit") {
        toast("You are already in a course");
        // setModal(true);
        setShow(false);
      } else {
        setShow(true);
      }
    },
  });


  // const [showTranig, setShowTraning] = useState(false);
  const { data: candidateData, isLoading } = useQuery({
    queryFn: () => getCandidate(candidateId!),
    queryKey: ["candidate", candidateId!],
    enabled: !!candidateId,
    onSuccess(data: any) {
      if (data.status == "error") {
        enqueueSnackbar(data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        // } else if (data.candidateData.trainingData === []) {
        //   setShowTraning(true);
      } else {
        enqueueSnackbar(data.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    },
  });

  // console.log("These are the candidate courses", candidateCourses?.basket);

  const { mutate } = useMutation({
    mutationFn: modifyCandidate,
    onSuccess(data: any) {
      if (data.status == "error") {
        enqueueSnackbar(data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (data.status == "success") {
        navigate("/acknowledge", { state: { acknowledgementData: data } });
      }
    },
  });

  const { mutate: mutateCourses } = useMutation({
    mutationFn: addCourse,
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
      }
    },
  });

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

  function clearAllCookies() {
    // Split the cookie string into an array of individual cookies
    const cookies = document.cookie.split(";");

    // Iterate through the cookies and remove each one
    cookies.forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }

 

  const { control, handleSubmit, formState, setValue, register, watch } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        dob: null,
        aadharNumber: "",
        phoneNumber: "",
        qualification: "",
        gender: "",
        caste: "",
        district1: "",
        district2: "",
        district3: "",
        state1: "",
        state2: "",
        state3: "",
        country: "",
      },
    });

  const [filteredDistricts1, setFilteredDistricts1] = useState([]);
  const [filteredDistricts2, setFilteredDistricts2] = useState([]);
  const [filteredDistricts3, setFilteredDistricts3] = useState([]);

  const state1 = watch("state1");
  const state2 = watch("state2");
  const state3 = watch("state3");

  useEffect(() => {
    if (state1) {
      setFilteredDistricts1(
        filterData.district.filter((district) => district.stateId === state1)
      );
    } else {
      setFilteredDistricts1([]);
    }
  }, [state1]);

  useEffect(() => {
    if (state2) {
      setFilteredDistricts2(
        filterData.district.filter((district) => district.stateId === state2)
      );
    } else {
      setFilteredDistricts2([]);
    }
  }, [state2]);

  useEffect(() => {
    if (state3) {
      setFilteredDistricts3(
        filterData.district.filter((district) => district.stateId === state3)
      );
    } else {
      setFilteredDistricts3([]);
    }
  }, [state3]);

  const onSubmit = (data: any) => {
    console.warn("These are submitted data", data);
    let CandidateData = {
      firstName: candidateData?.basic[0].firstName,
      lastName: candidateData?.basic[0].lastName,
      mobile: candidateData?.basic[0].phoneNo,
      referenceNo: candidateData?.basic[0].referenceNumber,
      candidateId: candidateId,
      districtId1: data.district1 === "" ? null : data.district1,
      districtId2: data.district2 === "" ? null : data.district2,
      districtId3: data.district3 === "" ? null : data.district3,
      stateId1: data.state1 === "" ? null : data.state1,
      stateId2: data.state2 === "" ? null : data.state2,
      stateId3: data.state3 === "" ? null : data.state3,
      country: data.country == null ? 0 : parseInt(data.country, 10),
    };

    mutate(CandidateData);
  };

  // console.log("These are the candidate data", candidateCourses?.basket);

  const sortedCourses = candidateData?.coursePreference.sort((a, b) => {
    if (a.priorityLevel === null && b.priorityLevel === null) {
      return 0;
    }
    if (a.priorityLevel === null) {
      return 1;
    }
    if (b.priorityLevel === null) {
      return -1;
    }
    return a.priorityLevel - b.priorityLevel;
  });

  const [hasScrolledValue, setHasScrolledValue] = useState(false);
  let hasScrolled = false;

  const [isOutOfCountry, setIsOutOfCountry] = useState(false);

  const handleCountryChange = (event) => {
    const value = event.target.value === "1";
    setIsOutOfCountry(value);
    if (value) {
      reset();
    }
  };


  

  return (
    <>
      <Toaster />
      <AuthLayout title="My Profile" subTitle="" description="">
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={handleOpenDialog}>

        <Container maxWidth="lg" sx={{ bgcolor: 'white', borderRadius: 2, p: 4, boxShadow: 3, marginBottom: '50px' }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Basic Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                First Name: <strong>{candidateData?.basic[0].firstName}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Middle Name: <strong>{candidateData?.basic[0].middleName}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Last Name: <strong>{candidateData?.basic[0].lastName}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Full Name: <strong>{candidateData?.basic[0].firstName} {candidateData?.basic[0].middleName} {candidateData?.basic[0].lastName}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Date of Birth: <strong>{candidateData?.basic[0].DOB}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Gender: <strong>{candidateData?.basic[0].gender}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Is BPL Card Holder: <strong>{candidateData?.basic[0].isBPLCardHolder}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Is Antodaya Card Holder: <strong>{candidateData?.basic[0].isAntodayaCardHolder}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Is Nrega Card Holder: <strong>{candidateData?.basic[0].isNregaCardHolder}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Is Minority: <strong>{candidateData?.basic[0].isMinority}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Is BoCw: <strong>{candidateData?.basic[0].isBoCw}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Is Tea Tribe Minority: <strong>{candidateData?.basic[0].isTeaTribeMinority}</strong>
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ my: 2, height: 1 }} />

          <Typography variant="h5" color="primary" gutterBottom>
            Personal Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Phone Number: <strong>{candidateData?.basic[0].phoneNo}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Email: <strong>{candidateData?.basic[0].vsPrimaryEmail}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Adhaar Number: <strong>{candidateData?.basic[0].aadharNo}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Religion: <strong>{candidateData?.basic[0].religion}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Caste: <strong>{candidateData?.basic[0].caste}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Gender: <strong>{candidateData?.basic[0].gender}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Qualification: <strong>{candidateData?.basic[0].qualification}</strong>
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ my: 2, height: 1 }} />
          <Typography variant="h5" color="primary" gutterBottom>
            Current Address Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Address: <strong>{candidateData?.basic[0].residentialAddress}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Police Station: <strong>{candidateData?.basic[0].residentialPoliceStation}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                City: <strong>{candidateData?.basic[0].residentialCity}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                PIN Code: <strong>{candidateData?.basic[0].residentialPinCode}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Post Office: <strong>{candidateData?.basic[0].residentialPostOffice}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                District: <strong>{candidateData?.basic[0].residentialDistrict}</strong>
              </Typography>
            </Grid>
        
          </Grid>
          <Box sx={{ my: 2, height: 1 }} />
          <Typography variant="h5" color="primary" gutterBottom>
            Permanent Address Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Address: <strong>{candidateData?.basic[0].permanentAddress	}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Police Station: <strong>{candidateData?.basic[0].permanentPoliceStation	}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                City: <strong>{candidateData?.basic[0].permanentCity}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                PIN Code: <strong>{candidateData?.basic[0].permanentPinCode	}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                Post Office: <strong>{candidateData?.basic[0].permanentPostOffice}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">
                District: <strong>{candidateData?.basic[0].permanentDistrict	}</strong>
              </Typography>
            </Grid>
        
          </Grid>

        </Container>


      

          {/* {showTranig && (
            <Box>
              <Grid container spacing={3} pt={3}>
                <Grid item sm={4}></Grid>
                <Grid item xs={12} sm={4}>
                  <Card elevation={3} square={false}>
                    {" "}
                    <CardContent>
                      <Typography variant="h6" component="div" color="primary">
                        Training Details
                      </Typography>
                      <Divider></Divider>
                      <Stack
                        direction="row"
                        spacing={6}
                        py={1}
                        alignItems="flex-start"
                      >
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          textAlign="right"
                        >
                          Center name:
                        </Typography>
                        {isLoading ? (
                          <CircularProgress color="primary" />
                        ) : (
                          <Typography variant="body2" textAlign="left" flex={1}>
                            {candidateData?.trainingData[0]?.centerName}
                          </Typography>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={6}
                        py={1}
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          textAlign="right"
                        >
                          Batch Code:
                        </Typography>

                        {isLoading ? (
                          <CircularProgress color="primary" />
                        ) : (
                          <Typography variant="body2" textAlign="left" flex={1}>
                            {candidateData?.trainingData[0]?.batchCode}
                          </Typography>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={3}
                        py={1}
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          textAlign="right"
                        >
                          Start Date:
                        </Typography>

                        {isLoading ? (
                          <CircularProgress color="primary" />
                        ) : (
                          <Typography variant="body2" textAlign="left" flex={1}>
                            {candidateData?.trainingData[0]?.startDate}
                          </Typography>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={4.6}
                        py={1}
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          textAlign="right"
                        >
                          End Date:
                        </Typography>
                        {isLoading ? (
                          <CircularProgress color="primary" />
                        ) : (
                          <Typography variant="body2" textAlign="left" flex={1}>
                            {candidateData?.trainingData?.endDate}{" "}
                          </Typography>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={4.5}
                        py={1}
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          textAlign="right"
                        >
                          Sector:
                        </Typography>
                        {isLoading ? (
                          <CircularProgress color="primary" />
                        ) : (
                          <Typography variant="body2" textAlign="left" flex={1}>
                            {candidateData?.trainingData?.sectorName}
                          </Typography>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={4.5}
                        py={1}
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          textAlign="right"
                        >
                          Course:
                        </Typography>
                        {isLoading ? (
                          <CircularProgress color="primary" />
                        ) : (
                          <Typography variant="body2" textAlign="left" flex={1}>
                            {candidateData?.trainingData?.courseName}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4}></Grid>
              </Grid>
            </Box>
          )} */}

          <Stack pt={1}></Stack>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={12} alignContent="center">
              <Stack pt={2}></Stack>{" "}
              <Stack alignItems="flex-start" justifyContent="center" pb={1}>
                <Typography variant="h6" component="div" color="primary">
                  My Selected Courses
                </Typography>
              </Stack>
              {/* <Stack pt={2}></Stack> */}
              <Box
                maxHeight="300px"
                overflow="auto"
                borderRadius={2}
                boxShadow={3}
                border="1px solid #B0E0E6"
              >
                {" "}
                <Stack pt={2}></Stack>
                {candidateData?.coursePreference[0] ? (
                  <Stack spacing={1}>
                    {sortedCourses?.map((course) => (
                      
                      <CandidateProfileCourseCard
                        key={course.id}
                        course={course}
                      />
                      
                      
                    ))}
                  </Stack>
                  
                ) : (
                  <Stack
                    direction="row"
                    justifyItems="center"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CloseOutlinedIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2" color="error">
                      No courses Found!
                    </Typography>
                  </Stack>
                )}
                <Stack pt={2}></Stack>
              </Box>
              <Stack pt={2}></Stack>
              {show && (
                <Box
                  id="hide"
                  sx={{
                    border: "1px solid #ddd",
                    padding: "16px",
                    borderRadius: "8px",
                  }}
                >
                  <Stack alignItems="flex-start" justifyContent="center" pb={1}>
                    <Typography variant="h6" component="div" color="primary">
                      My Placement Preference
                    </Typography>
                  </Stack>

                  {!isOutOfCountry && (
                    <form onSubmit={handleSubmit((data) => console.log(data))}>
                      <Stack direction="row" spacing={3} pt={3}>
                        <FormControl fullWidth margin="normal">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontStyle="italic"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              marginTop: 2,
                            }}
                          >
                            <LocationOnIcon fontSize="small" />
                            Preferred State 1:
                          </Typography>
                          <Select {...register("state1")} displayEmpty>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {filterData?.state?.map((item) => (
                              <MenuItem
                                key={item?.stateId}
                                value={item?.stateId}
                              >
                                {item?.stateName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontStyle="italic"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              marginTop: 2,
                            }}
                          >
                            <LocationOnIcon fontSize="small" />
                            Preferred State 2:
                          </Typography>
                          <Select {...register("state2")} displayEmpty>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {filterData?.state?.map((item) => (
                              <MenuItem
                                key={item?.stateId}
                                value={item?.stateId}
                              >
                                {item?.stateName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontStyle="italic"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              marginTop: 2,
                            }}
                          >
                            <LocationOnIcon fontSize="small" />
                            Preferred State 3:
                          </Typography>
                          <Select {...register("state3")} displayEmpty>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {filterData?.state?.map((item) => (
                              <MenuItem
                                key={item?.stateId}
                                value={item?.stateId}
                              >
                                {item?.stateName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>

                      <Stack direction="row" spacing={3}>
                        <FormControl
                          fullWidth
                          margin="none"
                          sx={{ width: "100%", marginBottom: "10px" }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontStyle="italic"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              marginTop: 2,
                            }}
                          >
                            <LocationOnIcon fontSize="small" />
                            Preferred District 1:
                          </Typography>
                          <Select {...register("district1")} displayEmpty>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {filteredDistricts1.map((district) => (
                              <MenuItem
                                key={district.districtID}
                                value={district.districtID}
                              >
                                {district.districtName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontStyle="italic"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              marginTop: 2,
                            }}
                          >
                            <LocationOnIcon fontSize="small" />
                            Preferred District 2:
                          </Typography>
                          <Select {...register("district2")} displayEmpty>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {filteredDistricts2.map((district) => (
                              <MenuItem
                                key={district.districtID}
                                value={district.districtID}
                              >
                                {district.districtName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontStyle="italic"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              marginTop: 2,
                            }}
                          >
                            <LocationOnIcon fontSize="small" />
                            Preferred District 3:
                          </Typography>

                          <Select {...register("district3")} displayEmpty>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {filteredDistricts3.map((district) => (
                              <MenuItem
                                key={district.districtID}
                                value={district.districtID}
                              >
                                {district.districtName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                    </form>
                  )}

                  {/* Place your out of country FormControl outside of the form if it's not form-related */}
                  <FormControl component="fieldset" margin="normal">
                    <Typography color="black">Out of Country</Typography>
                    <RadioGroup
                      {...register("country")}
                      row
                      onChange={handleCountryChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
              <Stack pt={2}></Stack>
            </Grid>
          </Grid>
          {show && (
            <Box>
              {candidateData?.basic[0].applied === 1 ||
              candidateCourses?.basket.length == 0 ? (
                <Button
                  variant="contained"
                  // disabled={true}
                  fullWidth
                  onClick={handleOpenDialog}
                >
                  Apply
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleOpenDialog}
                >
                  Apply
                </Button>
              )}
            </Box>
          )}
          <Stack
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            justifyItems="center"
          >
            <Typography variant="caption" color="darkred">
              {candidateCourses?.basket.length != 0 ? (
                " "
              ) : (
                <ErrorOutlineOutlinedIcon
                  style={{ fontSize: 15, paddingTop: 3 }}
                />
              )}
              {candidateCourses?.basket.length != 0
                ? " "
                : " Please Add a Course to Basket First to Apply"}
            </Typography>
          </Stack>

          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Application</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to Apply?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                type="submit"
                disabled={formState.isSubmitting}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </AuthLayout>

      {modal && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              already in a course
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You are already in a course
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
}
