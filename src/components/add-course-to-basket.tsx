import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCourse } from "../api/courses-api";
import CourseRegistration from "../components/forms/course-registration";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { enqueueSnackbar } from "notistack";
import { addCourse } from "../api/courses-api";
import { Button } from "@mui/material";
import EditPreference from "../pages/preference";

interface Props {
  courseId: string | number;
  districtId: string | number;
  courseName: string;
  districtName: string;
  highestQualificationId: string | number;
  highestQualificationName: string;
  qualificationSelectedOrNot: boolean;
  qualificationBool: boolean;
}

export default function AddCourseToBasket({
  courseId,
  districtId,
  courseName,
  districtName,
  highestQualificationName,
  highestQualificationId,
  qualificationSelectedOrNot,
  qualificationBool,
}: Props) {
  const [open, setOpen] = useState(false);

  console.log(
    "these are the qualification bool propsssss",
    qualificationSelectedOrNot
  );

  function setCookie(name: string, value: any, time: any) {
    let d = new Date();
    d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000);

    let expires = "expires=" + d.toUTCString();

    document.cookie = `${name}=${value}; ${expires}; SameSite=None; Secure; path=/`;
  }

  // function setCookie(name: string, value: any, time: any) {
  //   let d = new Date();
  //   d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000);

  //   let expires = "expires=" + d.toUTCString();

  //   document.cookie = `${name}=${value}; ${expires}; SameSite=None; Secure; path=/`;
  // }

  const getCookies = () => {
    return document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, ...rest] = cookie.split("=");
      cookies[name.trim()] = rest.join("=");
      return cookies;
    }, {});
  };



  const canAddMoreCourses = () => {
    const cookies = getCookies();
    const courseKeys = Object.keys(cookies).filter((cookieName) =>
      cookieName.match(/^\#\d+Course$/)
    );
    console.log("{coursessss",courseKeys[0])
    return courseKeys.length < 3;
  };
  const candidateId = localStorage.getItem("candidateId");

  


  
  

  // const sameCourse = () => {

  // }

  console.log("This is the courseId", courseId);

  const { mutate, data, isLoading } = useMutation({
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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
    {/* <EditPreference/> */}
      {candidateId ? (
        <LoadingButton
          color="success"
          variant="contained"
          size="small"
          onClick={() => {
            if (!canAddMoreCourses()) {
              enqueueSnackbar("You can add only up to 3 courses.", {
                variant: "warning",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
              return;
            }

            const convertToNull = (value: any) =>
              value === "null" ? null : value;

            const district2Id = "null";
            const district3Id = "null";
            const priorityLevel = "null";
            const hostelPreference = "null";
            const employementPreference = "null";

            const courseDataToBasket = {
              candidateId: candidateId,
              courseId: convertToNull(courseId),
              preferred_district1Id: convertToNull(districtId),
              preferred_district2Id: convertToNull(district2Id),
              preferred_district3Id: convertToNull(district3Id),
              priorityLevel: convertToNull(priorityLevel),
              hostelPreference: convertToNull(hostelPreference),
              selfEmploy: convertToNull(employementPreference),
            };

            console.log(
              "These are data to be sent to database now",
              courseDataToBasket
            );

            mutate(courseDataToBasket);
          }}
        >
          Add to Basket
        </LoadingButton>
      ) : (
        <LoadingButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={qualificationSelectedOrNot == true ? false : true}
          color="primary"
          variant="contained"
          size="small"
          onClick={() => {
            if (!canAddMoreCourses()) {
              enqueueSnackbar("You can add only up to 3 courses.", {
                variant: "warning",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
              return;
            }

            setOpen(true);
            const qualificationId =
              highestQualificationId !== undefined
                ? highestQualificationId
                : null;
            const qualificationName =
              highestQualificationName !== undefined
                ? highestQualificationName
                : null;
            const district1Name = districtName;
            const district1Id = districtId;

            const district2Name = null;
            const district3Name = null;
            const district2Id = null;
            const district3Id = null;
            const priorityLevel = null;
            const hostelPreference = null;
            const employementPreference = null;

            try {
              setCookie(
                `#${courseId}Course`,
                `${courseId},${courseName},${district1Name},${district2Name},${district3Name},${district1Id},${district2Id},${district3Id},${priorityLevel},${hostelPreference},${employementPreference}`,
                1000
              );
              console.log("course added successfully to basket");
              enqueueSnackbar("Course added to your basket successfully", {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
            } catch (error) {
              console.error("An error occurred:", error);
              enqueueSnackbar("Error setting cookie", {
                variant: "error",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
            }

            localStorage.setItem("qualificationName", highestQualificationName);
            localStorage.setItem("qualificationId", highestQualificationId);
          }}
        >
          Add to Basket
        </LoadingButton>
      )}{" "}
    </>
  );
}
