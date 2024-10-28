import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import CourseRegistration from "../components/forms/course-registration";
import GoogleMapComponent from "../components/ui/GoogleMap";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { QUERYKEY } from "../data/constants";
import { fetchCourse } from "../api/courses-api";
import AddCourseToBasketFromDetails from "../components/add-course-to-basket-from-details";

export default function Course() {
  const { courseId, districtId, courseName, districtName } = useParams<{
    courseId: string | number;
    districtId: string | number;
    courseName: string;
    districtName: string;
  }>();

  const params = useParams();

  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: [QUERYKEY.COURSE, courseId],
    queryFn: () =>
      fetchCourse({ courseId: courseId!, districtId: districtId! }),
    onError(err: AxiosError) {
      enqueueSnackbar(`${err.message}`, {
        variant: "error",
      });
    },
    refetchOnWindowFocus: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  if (isLoading) {
    return (
      <Stack height="70vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  console.log("These are the datas", data.location);

  // const coordinates = [{ lat: "38.8951", lng: "-77.0364" }];

  const coordinates = [
    {
      lat: 26.7704,
      lng: 94.2411,
    },
    // {
    //   lat: 27.136,
    //   lng: 94.7,
    // },
    // {
    //   lat: 27.136,
    //   lng: 94.7,
    // },
    // {
    //   lat: 27.48,
    //   lng: 94.58,
    // },
    // {
    //   lat: 27.48,
    //   lng: 94.58,
    // },
    // {
    //   lat: 24.8333,
    //   lng: 92.7789,
    // },
    // {
    //   lat: 26.3295,
    //   lng: 91.0061,
    // },
    // {
    //   lat: 26.3295,
    //   lng: 91.0061,
    // },
    // {
    //   lat: 26.2556,
    //   lng: 90.0332,
    // },
    // {
    //   lat: null,
    //   lng: null,
    // },
    // {
    //   lat: 26.1109,
    //   lng: 91.7696,
    // },
    // {
    //   lat: 26.2,
    //   lng: 91.7799,
    // },
  ];

  return (
    <>
      <Container component="section" maxWidth="xl" sx={{ py: 2 }}>
        <Typography
          variant="h4"
          sx={{ mb: 2, py: 3, textAlign: "center" }}
          color="primary.main"
        >
          Course Details
        </Typography>
        <Grid
          container
          py={4}
          spacing={{
            xs: 2,
            sm: 4,
            md: 8,
          }}
        >
          <Grid item xs={12} sm={6}>
            <Stack justifyContent="center" height="100%" maxWidth="40rem">
              <div>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {data?.data.courseName}
                </Typography>
              </div>

              <Typography paragraph color="text.secondary">
                {data?.data.courseDescription}
              </Typography>

              <Stack direction="column" gap={0} mt={1} py={2}>
                <Typography
                  variant="h6"
                  align="left"
                  fontWeight={500}
                  gutterBottom
                >
                  Course Overview
                </Typography>

                <Typography align="left" py={1}>
                  1. Course Level -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.courseLevel}
                  </Typography>
                </Typography>

                <Typography align="left" py={1}>
                  2. Course Mode -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.courseMode}
                  </Typography>
                </Typography>

                <Typography align="left" py={1}>
                  3. Course Duration -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.totalHours} Hours
                  </Typography>
                </Typography>

                <Typography align="left" py={1}>
                  4. Minimum Qualification -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.qualificationMin?.qualificationName}
                  </Typography>
                </Typography>

                <Typography align="left" py={1}>
                  5. District -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.district}
                  </Typography>
                </Typography>
              </Stack>

              <AddCourseToBasketFromDetails
                courseId={courseId!}
                districtId={districtId!}
                courseName={courseName!}
                districtName={districtName!}
                qualificationSelected={params.qualificationBool}
              />

              <Box px={63}></Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <GoogleMapComponent
              containerStyle={containerStyle}
              positions={data?.location!}
              // positions={coordinates}
            />
          </Grid>
        </Grid>

        {/* <Box pb={56} /> */}
      </Container>

      {/* Registration Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Registration Form for {data?.data.courseName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To enroll in this course, kindly complete the provided form with
            your information.
          </DialogContentText>

          <CourseRegistration
            onClose={handleClose}
            id={courseId!}
            districts={data?.district}
            qualifications={data?.qualification}
            genders={data?.gender}
            minQualification={data?.qualificationMin}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
