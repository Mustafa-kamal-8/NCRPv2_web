import {
  Autocomplete,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getInitialData } from "../api/loader";
import Banner from "../assets/Banner.svg";
import About from "../assets/aboutUs.svg";
import Nurture from "../assets/nurture.svg";
import CourseCard from "../components/cards/course-card";
import TestimonialCard from "../components/cards/testimonial-card";
import CoursesSkeleton from "../components/skeletons/courses-skeleton";
import TestimonialsSkeleton from "../components/skeletons/testimonials-skeleton";
import { QUERYKEY, STEPS_TO_FOLLOW } from "../data/constants";
import useFilters from "../hooks/useFilters";
import { districtState, qualificationState } from "../states/atoms";
import HighlightedTCCard from "../components/cards/highlighted-tc-card";

export default function Home() {
  const theme = useTheme();
  const navigaate = useNavigate();

  const qualificationId = localStorage.getItem("qualificationId");

  console.log("This is the candidate qualification Id", qualificationId);

  const candidateId = localStorage.getItem("candidateId");

  const [qualification, setQualification] = useRecoilState(qualificationState);
  const [district, setDistrict] = useRecoilState(districtState);

  const [open, setOpen] = useState(false);
  const { isLoading: filterLoading, data: filterData } = useFilters();

  const handleClickOpen = () => {
    navigaate("/courses");
  };

  const handleClose = () => {
    setOpen(false);
  };

  function submitCourseParam() {
    handleClose();
    navigaate("/courses");
  }

  const { isLoading, data } = useQuery({
    queryKey: [QUERYKEY.INITAL],
    queryFn: getInitialData,
    retry: 2,

    onError(err: AxiosError) {
      enqueueSnackbar(err.message, { variant: "error" });
    },
  });

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

  // useEffect(() => {
  //   if (candidateId) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // }, []);

  return (
    <div>
      <Container maxWidth="xl" component="section" sx={{ paddingY: 4 }}>
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 3,
            md: 4,
          }}
        >
          <Grid item xs={12} sm={5}>
            <Stack justifyContent="center" height="100%">
              <Typography variant="h5" gutterBottom>
                Skills for Life.
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  mb: 2,
                }}
              >
                Nurturing Growth, Inspiring Success
              </Typography>

              {/* <Stack direction="row" gap={3} mt={3}>
                <Box maxWidth="10rem">
                  <Typography variant="h4" fontWeight={700}>
                    1.02 K
                  </Typography>
                  <Typography variant="body2">
                    Actively registered as students
                  </Typography>
                </Box>
                <Box maxWidth="10rem">
                  <Typography variant="h4" fontWeight={700}>
                    776
                  </Typography>
                  <Typography variant="body2">Experienced Teachers</Typography>
                </Box>
              </Stack> */}

              <Stack
                gap={2}
                mt={3}
                direction={{
                  xs: "column",
                  sm: "row",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  size="large"
                  color="warning"
                >
                  Find a Course
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={7}>
            <Nurture />
          </Grid>
        </Grid>
      </Container>

      {/* About US */}
      <Container maxWidth="xl" component="section">
        <Grid
          container
          py={4}
          spacing={{
            xs: 2,
            sm: 4,
            md: 8,
          }}
        >
          <Grid item xs={12} sm={5}>
            <About />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Stack justifyContent="center" height="100%" maxWidth="40rem">
              <Typography
                variant="h6"
                textTransform="uppercase"
                color="primary"
                fontWeight={400}
              >
                ABOUT US
              </Typography>

              <Typography variant="h4" fontWeight={700} gutterBottom>
                Who we are
              </Typography>
              <Typography paragraph color="text.secondary">
                Assam Skill Development Mission was set up under the aegis of
                Skill Employment and Entrepreneurship Department. The vision of
                the mission is capacity building of the unemployed youth and to
                deliver quality skill training leading to meaningful employment.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Steps to follow*/}
      <Container
        maxWidth="xl"
        component="section"
        sx={{
          py: 8,
        }}
      >
        <Typography
          align="center"
          textTransform="uppercase"
          variant="h6"
          color="primary"
          fontWeight={400}
        >
          STEPS TO FOLLOW
        </Typography>
        <Typography
          align="center"
          variant="h4"
          fontWeight={700}
          gutterBottom
          maxWidth={1200}
          mx="auto"
        >
          Propel your professional growth with our specialized learning programs
          tailored to advance your career trajectory
        </Typography>

        <Grid
          container
          gap={0}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          {STEPS_TO_FOLLOW.map((step) => (
            <Grid item key={step.id} pt={6} xs={6} sm={4} md={2}>
              <Paper
                elevation={1}
                sx={{
                  paddingX: 2,
                  paddingTop: 3,
                  margin: 1,
                  height: "100%",
                }}
                key={step.id}
              >
                <Avatar
                  variant="square"
                  sx={{
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.main,
                    width: 35,
                    height: 35,
                  }}
                >
                  <step.icon fontSize="small" />
                </Avatar>

                <Typography variant="body1" pt={2} pb={1} fontWeight={500}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Courses */}

      <Container
        maxWidth="xl"
        component="section"
        sx={{
          paddingY: 8,
        }}
      >
        <Stack direction="row" pb={1} justifyContent="center">
          <Typography
            align="center"
            textTransform="uppercase"
            variant="h6"
            color="primary"
            fontWeight={400}
          >
            COURSES
          </Typography>
        </Stack>
        <Stack direction="row" pb={1} justifyContent="center">
          <Typography variant="h4" fontWeight={700}>
            Unlock Your Potential,
          </Typography>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Expand Your Knowledge
          </Typography>
        </Stack>

        <Stack direction="row" pb={1} justifyContent="flex-end">
          <Button size="small" component={Link} to="/courses">
            See All
          </Button>
        </Stack>

        <Grid
          spacing={2}
          container
          gap={0}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          {isLoading ? (
            <CoursesSkeleton numberOfCourses={8} />
          ) : (
            data?.data?.highlightedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <CourseCard noAction course={course} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Training centers */}
      <Container
        maxWidth="xl"
        component="section"
        sx={{
          paddingY: 8,
        }}
      >
        {" "}
        <Stack direction="row" pb={1} justifyContent="center">
          <Typography
            align="center"
            textTransform="uppercase"
            variant="h6"
            color="primary"
            fontWeight={400}
          >
            Training Centers
          </Typography>
        </Stack>
        <Stack direction="row" pb={1} justifyContent="center">
          <Typography variant="h4" fontWeight={700}>
            Foster Growth, Ignite Wisdom:{" "}
          </Typography>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Training Centers, a Hub for Skill Expansion.
          </Typography>
        </Stack>
        <Stack direction="row" pb={1} justifyContent="flex-end">
          <Button size="small" component={Link} to="/training-centers">
            See All
          </Button>
        </Stack>
        <Grid
          spacing={2}
          container
          gap={0}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          {isLoading ? (
            <CoursesSkeleton numberOfCourses={8} />
          ) : (
            data?.data?.highlightedTC.map((training_center) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={training_center.id}>
                <HighlightedTCCard noAction tc={training_center} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Join &  Learn */}
      <Container
        maxWidth="xl"
        component="section"
        sx={{
          py: 8,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Stack
              p={2}
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h5" gutterBottom>
                Join & Learn
              </Typography>
              <Typography
                variant="h1"
                align="center"
                sx={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  maxWidth: 400,
                  // mb: 2,
                }}
              >
                From the best in the business
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} sx={{ maxWidth: 500 }}>
            <Banner />
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials */}
      <Container
        maxWidth="xl"
        component="section"
        sx={{
          paddingY: 12,
        }}
      >
        <Typography
          align="center"
          textTransform="uppercase"
          variant="h6"
          color="primary"
          fontWeight={400}
        >
          TESTIMONIALS
        </Typography>
        <Typography
          variant="h4"
          fontWeight={700}
          align="center"
          maxWidth={500}
          mx="auto"
        >
          Don't believe us? Check what our students say
        </Typography>

        <Stack
          direction={{ sm: "row", md: "row" }}
          gap={2}
          justifyContent="center"
          alignItems="center"
          pt={6}
        >
          {isLoading ? (
            <TestimonialsSkeleton />
          ) : (
            data?.data?.testimonials?.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))
          )}
        </Stack>
      </Container>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Preferences</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            <Typography variant="body2" color="black">
              Please Select your District and Highest Educational Qualification.
            </Typography>
          </DialogContentText>
          {!filterLoading && (
            <Stack gap={3} pt={2}>
              <Autocomplete
                value={district}
                onChange={(_, newValue) => {
                  setDistrict(newValue!);
                }}
                id="combo-box-demo"
                options={filterData?.district!}
                getOptionLabel={(option) => option.districtName}
                renderInput={(params) => (
                  <TextField {...params} label="Select District" size="small" />
                )}
                fullWidth
              />

              <Autocomplete
                fullWidth
                value={qualification}
                onChange={(_, newValue) => {
                  setQualification(newValue!);
                }}
                id="combo-box-demo"
                options={filterData?.qualification!}
                getOptionLabel={(option) => option.qualificationName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Qualification"
                    size="small"
                  />
                )}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={submitCourseParam}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
