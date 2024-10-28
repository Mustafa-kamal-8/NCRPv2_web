import {
  Typography,
  Grid,
  Stack,
  Container,
  Button,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import BasketCourseCard from "../../components/cards/basket-course-card";
import { useEffect, useState } from "react";
import { addCourse } from "../../api/courses-api";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery ,  useQueryClient} from "@tanstack/react-query";
import { ViewCarousel } from "@mui/icons-material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { getCandidateCourses } from "../../api/candidate-api";
import MyProfileCourseCard from "../../components/cards/my-profile-card";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CookieData {
  courseId: number;
  courseName: string;
  preferred_district1: number;
  preferred_district2: number;
  preferred_district3: number;
  priorityLevel: number;
  hostelPreference: number;
  employementPreference: number;
}

export default function MyCourses() {
  const candidateId = localStorage.getItem("candidateId");
  const [cookieData, setCookieData] = useState<CookieData[]>([]);
  const [cookiesLength, setCookiesLength] = useState();

  const { enqueueSnackbar } = useSnackbar(); 
  const queryClient = useQueryClient();

  function clearAllCookies() {
    // Split the cookie string into an array of individual cookies
    const cookies = document.cookie.split(";");

    // Iterate through the cookies and remove each one
    cookies.forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }
  const {
    data: candidateCoursesData,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getCandidateCourses(candidateId!),
    queryKey: ["candidate_courses", candidateId!],
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
      } else {
      }
    },
  });

  console.log("These are the candidate data", candidateCoursesData);
  // Rest of your code

  console.log("These are the cookieData", cookieData);

  console.log(
    "These are the candidate Courses from basket",
    candidateCoursesData?.basket[0]
  );
  

  const handleSubmitCourses = async () => {
    const dataToSend = {
      candidateId :candidateId ,
      coursePreference: candidateCoursesData.basket.map((item) => {
        const districts = [];
  
        // Add district 1 if available
        if (item.preferred_district1) {
          districts.push({
            district: item.preferred_district1,
            priorityLevel: item.priorityLevel || null,
          });
        }
  
        // Add district 2 if available
        if (item.preferred_district2) {
          districts.push({
            district: item.preferred_district2,
            priorityLevel: item.priorityLevel || null,
          });
        }
  
        // Add district 3 if available
        if (item.preferred_district3) {
          districts.push({
            district: item.preferred_district3,
            priorityLevel: item.priorityLevel || null,
          });
        }
  
        return {
          course: item.courseId.toString(),
          districts: districts,
        };
      }),
    };
  
    console.log("Data to send:", dataToSend);
  
    // Send the transformed data to the backend API
    try {
      const response = await axios.post('https://ncrpv2.skillmissionassam.org/nw/cousre/add', dataToSend);
      console.log('Courses submitted successfully:', response.data);
      if (response.data.status === "success") {
        toast.success('Courses submitted successfully!');
        
        // Set a timeout for 5 seconds (5000 milliseconds) before reloading the page
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
        queryClient.invalidateQueries({
          queryKey: ["candidate_courses", candidateId!],
        });

       
      
      } else {

        toast.error('Failed to submit courses. Please try again.');
      }
      
    
    
    } catch (error) {
      console.error('Error submitting courses:', error);
      toast.error(error);
      
    }
  };










  function scrollWindowUp() {
    const scrollStep = -30;
    const scrollInterval = 10;

    const scrollIntervalId = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollIntervalId);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, scrollInterval);
  }

  scrollWindowUp();

  const getAllCookies = () => {
    function isCookieStorageEmpty() {
      return document.cookie === "";
    }
    if (isCookieStorageEmpty()) {
    } else {
      let cookies = document.cookie.split(";");
      let values = cookies.map((cookie) => cookie.trim().split("=")[1]);
      console.log("These are the cookie values from my-courses page", values);
      console.log("This is the length of the cookie array", values.length);

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
      setCookieData(addToBasket);

      console.log(
        " These are the gathered cookies from useEffect ",
        addToBasket
      );

      console.log("Cookies length", addToBasket.length);
      const cookiesLength = addToBasket.length;

      return cookiesLength;
    }
  };

  const [totalCoursesInBasket, setTotalCoursesInBaseket] = useState(0);
  useEffect(() => {
    let cookies = document.cookie.split(";");

    console.log("These are the cookies in an Array", cookies);
    if (cookies.length != 0) {
      const cookiesLengthValue = getAllCookies();
      // setCookiesLength(cookiesLengthValue);
      // console.log("these are cookies length", cookiesLength);
    } else {
      console.log("Cookie length is zero");
    }

    let values = cookies.map((cookie) => cookie.trim().split("=")[1]);

    console.log("These are my cookie values", values);

    console.log("These are my cookies length", cookies.length);
    const cookiesLengthValue = getAllCookies();

    setTotalCoursesInBaseket(cookiesLengthValue);
  }, []);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  const sortedCourses = candidateCoursesData?.basket?.sort((a, b) => {
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

  return (
    <>
      <ToastContainer   position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover/>
      <Container maxWidth="xl">
        <Stack pt={3} justifyContent="center" alignItems="center">
          <Stack position="relative" sx={{ display: "inline-block" }}>
            <AddShoppingCartOutlinedIcon color="primary" fontSize="large" />

            {totalCoursesInBasket > 0 && (
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 1,
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                }}
              >
                {totalCoursesInBasket}
              </Typography>
            )}
            {/* )} */}

            {candidateCoursesData?.basket?.length > 0 && (
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 1,
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                }}
              >
                {candidateCoursesData?.basket?.length}
              </Typography>
            )}
            {/* )} */}
          </Stack>
          {/* )} */}
          <Typography
            fontSize={18}
            fontWeight="600"
            color="primary"
            variant="h6"
          >
            My Courses Basket
          </Typography>
          {candidateCoursesData?.basket?.length !== 0 && candidateId ? (
            <Typography fontWeight="400" color="primary" variant="subtitle2">
              Total Number Courses Added to Basket:{" "}
              {candidateCoursesData?.basket?.length}
            </Typography>
          ) : (
            ""
          )}
          {totalCoursesInBasket > 0 ? (
            <Typography fontWeight="400" color="primary" variant="subtitle2">
              Total Number Courses Added to Basket: {totalCoursesInBasket}
            </Typography>
          ) : (
            ""
          )}
          {/* {totalCoursesInBasket && (
            <Typography fontWeight="400" color="primary" variant="subtitle2">
              Total Number Courses Added to Basket: {totalCoursesInBasket}
            </Typography>
          )} */}
        </Stack>
        <Stack pt={2} spacing={1}>
          {candidateId && (
            <Typography align="center" color="GrayText" variant="body2">
              Want to Apply Now? Go to My Profile and Apply for the Selected
              Courses{" "}
              <Button
                component={Link}
                to="/auth/candidate-profile"
                size="small"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              >
                Go to My Profile
              </Button>
            </Typography>
          )}
        </Stack>
        <Stack pt={2} spacing={1}>
          <Typography align="center" color="GrayText" variant="body2">
            <Box display="inline-flex" gap={1} alignItems="center">
              <Button
                component={Link}
                to="/courses"
                size="small"
                variant="contained"
                sx={{ fontWeight: 500 }}
              >
                Add Course{" "}
              </Button>
              {document.cookie && (
                <Button
                  sx={{ width: "100px" }}
                  variant="contained"
                  component={Link}
                  to={`/auth/candidate-register`}
                  size="small"
                  color="success"
                >
                  Register
                </Button>
              )}
            </Box>
          </Typography>
        </Stack>
        <Stack pb={7} justifyContent="center" alignItems="center"></Stack>
        {candidateId ? (
          candidateCoursesData?.basket[0] ? (
            <Grid container spacing={3} paddingY={3}>
              {sortedCourses?.map((course: any, index: number) => (
                <Grid item xs={12} md={12} key={course?.courseId}>
                  <MyProfileCourseCard
                    noAction
                    courses={course}
                    // districts={districts}
                    // cookieData={cookieData}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              pb={10}
            >
              <Stack direction="row">
                <CloseOutlinedIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2" color="error">
                  No courses added to basket yet
                </Typography>
              </Stack>
            </Grid>
          )
        ) : document.cookie !== "" ? (
          <Grid container spacing={3} paddingY={3}>
            {cookieData?.map((course) => (
              <Grid item xs={12} md={12} key={course.id}>
                <BasketCourseCard
                  noAction
                  cookieCourses={course}
                  // districts={districts}
                  cookieData={cookieData}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            pb={10}
          >
            <Stack direction="row">
              <CloseOutlinedIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" color="error">
                No courses added to basket yet
              </Typography>
            </Stack>
          </Grid>
      
          
        )}
  <Stack pt={2} spacing={1}>
          {candidateId && candidateCoursesData?.basket?.length > 0 && (
            <Typography align="center" color="GrayText" variant="body2">
            
          
              <Button
              color="success"
              size="large"
              variant="contained"
              onClick={handleSubmitCourses}
              sx={{ fontWeight: 1000 }}
          
              >
               Submit Courses
              </Button>
            </Typography>
          )}
        </Stack>
        
      </Container>
    

    </>
  );
}


