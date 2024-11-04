import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import Home from "./pages/home";
import AboutUs from "./pages/about-us";
import ErrorPage from "./pages/error-page";
import { ROUTE_PATHS } from "./data/constants";
import Acknowledge from "./pages/acknowledge";
import RegistrationStats from "./pages/registration-stats-dashboard";
import { CircularProgress, Stack } from "@mui/material";
// import Admin from "./pages/admin";
import PreferenceAuth from "./pages/preference/auth";
import Preference from "./pages/preference";
import MyCourses from "./pages/candidate/my-courses";
import CandidateLogin from "./pages/candidate/candidate-login";
import RegisterCandidate from "./pages/candidate/register-candidate";
import EditPreferences from "./components/cards/edit-preferences";
import SubmitOTP from "./pages/candidate/submit-otp";
import CandidateProfile from "./pages/candidate/candidate-profile";
import TrainingCenters from "./pages/tc/training-centers";
import TrainingCenter from "./pages/tc/training-center";
import Register from "./pages/Register";
import EditPreferencesFromDatabase from "./components/cards/edit-preferences-from-database";
import ChangePassword from "./pages/candidate/change-password";
import Acknowledgepage from "./pages/acknowlegepage";


const Courses = lazy(() => import("./pages/courses"));
const Course = lazy(() => import("./pages/course"));

// const candidateId = localStorage.getItem("candidateId");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: true,
        element: <Acknowledgepage />,
      },

      {
        path: "edit-preferences/:courseId/:courseName/:priority/:district1/:district2/:district3/:hostelAccomodations/:employment",
        element: <EditPreferences />,
      },
      {
        path: "/edit-preferences-from-database/:courseId/:courseName/:priority/:district1/:district2/:district3/:district1Id/:district2Id/:district3Id/:hostelAccomodations/:employment",
        element: <EditPreferencesFromDatabase />,
      },
      {
        path: "auth",
        children: [
          {
            path: "candidate-register",
            element: <RegisterCandidate />,
          },
          {
            path: "acknowledge-page",
            element: <Acknowledgepage />,
          },
          {
            path: "candidate-login",
            element: <CandidateLogin />,
          },
          {
            path: "submit-otp",
            element: <SubmitOTP />,
          },

          {
            path: "candidate-profile",
            element: <CandidateProfile />,
          },
          {
            path: "Register",
            element: <Register />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          }
        ],
      },
      {
        path: ROUTE_PATHS.COURSES,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={ <Loader /> }>
                <Courses />
              </Suspense>
            ),
          },
          {
            path: ":courseId/:districtId/:courseName/:districtName/:qualificationBool",
            element: (
              <Suspense fallback={ <Loader /> }>
                <Course />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: ROUTE_PATHS.MYCOURSES,
        element: <MyCourses />,
      },
      {
        path: ROUTE_PATHS.ABOUT_US,
        element: <AboutUs />,
      },

      {
        path: ROUTE_PATHS.TRAINING_CENTERS,
        children: [
          {
            index: true,
            element: <TrainingCenters />,
          },
          {
            path: ":trainingCenterId",
            element: <TrainingCenter />,
          },
        ],
      },

      {
        path: ROUTE_PATHS.PRFERENCE,
        children: [
          {
            index: true,
            element: <PreferenceAuth />,
          },
          {
            path: "edit",
            element: <Preference />,
          },
        ],
      },
      {
        path: ROUTE_PATHS.REGISTRATION_STATS,
        element: <RegistrationStats />,
      },
    ],
  },

  {
    path: ROUTE_PATHS.ACKNOWLEDGE,
    element: <Acknowledge />,
  },
  {
    path: ROUTE_PATHS.ACKNOWLEDGE,
    element: <Acknowledge />,
  },
]);

function Loader() {
  return (
    <Stack height="70vh" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );
}
