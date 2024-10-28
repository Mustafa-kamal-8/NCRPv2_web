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

interface Props {
  courseId: string | number;
  districtId: string | number;
  courseName: string;
  districtName: string;
  highestQualificationId: string | number;
  highestQualificationName: string;
  qualificationBool: boolean;
  qualificationSelected: string;
}

export default function AddCourseToBasketFromDetails({
  courseId,
  districtId,
  courseName,
  districtName,
  highestQualificationName,
  highestQualificationId,
  qualificationSelected,
}: Props) {
  const [open, setOpen] = useState(false);

  console.log(
    "This is the qualification selected value",
    qualificationSelected
  );

  function setCookie(name: string, value: any, time: any) {
    let d = new Date();
    d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000);

    let expires = "expires=" + d.toUTCString();

    document.cookie = `${name}=${value}; ${expires}; SameSite=None; Secure; path=/`;
  }

  const candidateId = localStorage.getItem("candidateId");

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

  const qualification = true;

  return (
    <>
      {candidateId ? (
        <LoadingButton
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          // disabled={qualificationSelectedOrNot == true ? false : true}
          color="success"
          variant="contained"
          size="small"
          onClick={() => {
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
          disabled={qualificationSelected == "true" ? false : true}
          color="primary"
          variant="contained"
          size="small"
          onClick={() => {
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
            // const qualification =

            // cookie data format

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
                // courseId, PreferredDistrict1Name, PreferredDistrict2Name, PreferredDistrict3Name, PreferredDistrict1Id, PreferredDistrict2Id, PreferredDistrict3Id, priorityLevel, hostelPreference, PlacementPreference, highestQualificationId, highestQualificationName
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
