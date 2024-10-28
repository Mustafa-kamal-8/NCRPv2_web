import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCourse } from "../api/courses-api";
import CourseRegistration from "../components/forms/course-registration";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";

interface Props {
  courseId: string | number;
  districtId: string | number;
}

export default function ApplyCourse({ courseId, districtId }: Props) {
  const [open, setOpen] = useState(false);

  const { isLoading, data, mutate } = useMutation({
    mutationFn: fetchCourse,
    onSuccess() {
      handleClickOpen();
    },
    onError(error: AxiosError) {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <LoadingButton
        size="small"
        loading={isLoading}
        onClick={() =>
          mutate({
            courseId: courseId.toString(),
            districtId: districtId.toString(),
          })
        }
      >
        Apply Now
      </LoadingButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Registration Form for {data?.data.courseName}</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <DialogContentText>
                To enroll in this course, kindly complete the provided form with
                your information.
              </DialogContentText>
              <CourseRegistration
                onClose={handleClose}
                id={courseId?.toString()}
                districts={data?.district}
                qualifications={data?.qualification}
                genders={data?.gender}
                minQualification={data?.qualificationMin}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
