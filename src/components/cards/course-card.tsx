import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import BasicModal from "../modal/Modal";
import { useEffect, useState } from "react";
import EditCoursePreferences from "./edit-course-preference";
import { getCourseIdsFromCookies, getMissingPriorityLevels } from "../../utils";
import { checkExistPriority } from "../../api/courses-api";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";


type Props = {
  course: Course;
  noAction?: boolean;
  highestQualification: string;
  highestQualificationId: number | string;
};

export default function CourseCard({
  qualificationBool,
  course,
  noAction = false,
}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const candidateId = localStorage.getItem("candidateId");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [availablePriority, setAvailablePriority] = useState([]);

  const courseIdsFromCookies = getCourseIdsFromCookies();

  const { data: available, mutate: priorityMutate } = useMutation({
    mutationFn: checkExistPriority,
    onSuccess(available) {
      setAvailablePriority(available.availablePriority)
    },
    onError(error: AxiosError) {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    },
  });

  useEffect(() => {
    priorityMutate(candidateId!)
  }, [])

  return (
    <Card
      variant="outlined"
      sx={ {
        height: "100%",
        width: "100%",
        display: "flex",
        borderRadius: 4,
        flexDirection: "column",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, border 0.3s ease-in-out", // Add border to the transition
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "#64B5F6", // Add a slight blueish border color on hover
        },
      } }
    >
      <CardContent sx={ { flex: 1 } }>
        <Stack
          direction="row"
          justifyItems="flex-start"
          alignItems="flex-start"
          gap={ 2 }
          mb={ 2 }
        >
          <Avatar
            sx={ {
              width: 30,
              height: 30,
              bgcolor: (theme) => theme.palette.primary.dark,
            } }
          >
            <SchoolIcon fontSize="small" />
          </Avatar>

          <Stack>
            <Typography variant="h6">{ course.courseName }</Typography>
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={ { display: "flex", alignItems: "center", gap: 1, marginTop: 2 } }
        >
          <AccessTimeIcon fontSize="small" />
          { course.totalHours } hours
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={ { display: "flex", alignItems: "center", gap: 1, marginTop: 2 } }
        >
          <LocationOnIcon fontSize="small" />
          { course.districtName }
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={ { display: "flex", alignItems: "center", gap: 1, marginTop: 2 } }
        >
          <SchoolIcon fontSize="small" />
          { course.qualification ?? "No Qualification" }
        </Typography>
      </CardContent>
      { !noAction && (
        <CardActions sx={ { px: 2, pb: 1, justifyContent: "space-between" } }>
          <Button
            size="small"
            component={ Link }
            to={ `/courses/${course.courseId}/${course.districtId}/${course.courseName}/${course.districtName}/${qualificationBool}` }
          >
            Learn More
          </Button>
          {/* <ApplyCourse
            courseId={course.courseId}
            districtId={course.districtId}
          /> */}
          <LoadingButton
            color="primary"
            variant="contained"
            disabled={ !qualificationBool || courseIdsFromCookies.includes(String(course.courseId)) || courseIdsFromCookies.length === 3 }
            size="small"
            sx={ {
              padding: 1,
              borderRadius: 4,
            } }
            onClick={ handleModalOpen }
          >
            { courseIdsFromCookies.length === 3 ? "You have added 3 courses" : courseIdsFromCookies.includes(String(course.courseId)) ? "Already added" : "Add to Basket" }
          </LoadingButton>




          {/* <AddCourseToBasket
            qualificationSelectedOrNot={qualificationBool}
            courseId={course.courseId}
            districtId={course.districtId}
            courseName={course.courseName}
            districtName={course.districtName}
            highestQualificationName={highestQualification}
            highestQualificationId={highestQualificationId}
          /> */}
        </CardActions>
      )
      }
      {/* edit preference */ }
      <BasicModal open={ isModalOpen } onClose={ handleModalClose }>
        <EditCoursePreferences onClose={ handleModalClose } courseDetails={ course } />
      </BasicModal>
    </Card >
  );
}
