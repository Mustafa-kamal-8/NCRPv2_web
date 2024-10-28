import React, { useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchOTPCourses,
  getCandidate,
  updateOTPCourse,
} from "../../api/otp-api";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditPreference() {
  const [course, setCourse] = useState("");

  const { state } = useLocation();
  const { candidateId } = state;

  const navigate = useNavigate();

  // const candidateId = 173072;

  const {
    mutate,
    isLoading: districtLoading,
    data: coursesData,
  } = useMutation({
    mutationFn: fetchOTPCourses,
    onError(error: AxiosError) {
      enqueueSnackbar(error?.message, { variant: "error" });
    },
  });

  const { isLoading, data } = useQuery({
    queryFn: () => getCandidate(candidateId!),
    onSuccess(data) {
      if (data.status === "error") {
        enqueueSnackbar(data.message, {
          variant: "error",
        });
        return;
      }

      mutate({
        districtId: data.data.districtId,
        qualificationId: data?.data?.qualificationId,
      });
    },
    onError(err: AxiosError) {
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    },
  });

  const { isLoading: updating, mutate: updateCourse } = useMutation({
    mutationFn: updateOTPCourse,
    onSuccess() {
      enqueueSnackbar("Updated Successfully", {
        variant: "success",
      });

      navigate("/preference", {
        replace: true,
      });
    },
    onError(err: AxiosError) {
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    },
  });

  // const {mutate: updateCourse = useMutation({
  //   mutationFn: updateAdminCourses,
  //   onError(err: AxiosError) {
  //     enqueueSnackbar(err.message, {
  //       variant: "error",
  //     });
  //   },
  // });

  function changeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCourse(event.target.value);
  }

  if (isLoading || districtLoading) {
    return (
      <Stack
        justifyContent="center"
        alignContent="center"
        height="80vh"
        width="100%"
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container component="section" sx={{ my: 3 }}>
      <Card elevation={0}>
        <CardContent>
          <Typography variant="h6">Candidate Details</Typography>
          <Stack gap={2} pt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fullName"
                  label="Full Name"
                  variant="filled"
                  fullWidth
                  disabled
                  value={data?.data.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  variant="filled"
                  fullWidth
                  value={data?.data.mobile}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="District"
                  variant="filled"
                  fullWidth
                  value={data?.data.districtName}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PlaceIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Reference Number"
                  variant="filled"
                  fullWidth
                  value={data?.data.referenceNumber}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachFileIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Qualification"
                  variant="filled"
                  fullWidth
                  value={data?.data.qualification}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Course Selected"
                  variant="filled"
                  fullWidth
                  value={data?.data.courseName}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBalanceIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoFocus
                  select
                  value={course}
                  onChange={changeHandler}
                  helperText={
                    <Typography variant="caption" color="warning.main">
                      Select if you want to change course
                    </Typography>
                  }
                  id="gender"
                  label="Select Course"
                  variant="standard"
                >
                  {coursesData?.data.map((course) => (
                    <MenuItem
                      value={course.pklCourseId}
                      key={course.pklCourseId}
                    >
                      {course.vsCourseName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ pt: 3 }}>
              <LoadingButton
                loading={updating}
                size="large"
                variant="contained"
                color="primary"
                disabled={!course}
                onClick={() =>
                  updateCourse({
                    candidateId: candidateId!,
                    courseId: data?.data.courseId,
                  })
                }
              >
                Change Course
              </LoadingButton>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
