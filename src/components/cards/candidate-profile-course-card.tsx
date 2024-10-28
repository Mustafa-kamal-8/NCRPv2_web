import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { toast, ToastContainer } from 'react-toastify';

const loaderStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '16px solid #f3f3f3', /* Light grey */
  borderTop: '16px solid #3498db', /* Blue */
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  animation: 'spin 2s linear infinite',
};

const spinnerContainerStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', /* Semi-transparent white */
  zIndex: '9999',
};

/* Define the spinner animation */
const spinnerAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const style = document.createElement('style');
style.innerHTML = spinnerAnimation;
document.head.appendChild(style);

type Props = {
  course: Course;
  noAction?: boolean;
};

export default function CandidateProfileCourseCard({
  course,
  noAction = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const candidateId = localStorage.getItem("candidateId");
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: async (courseId: string) => {
      const response = await axios.post('https://ncrpv2.skillmissionassam.org/nw/course/delete', {
        candidateId: candidateId,
        courseId: courseId
      });
      if (response.data.status === "success") {
        console.log(`Course with id: ${courseId} deleted successfully`);
        toast.success('Course deleted successfully!');

        // Create and show loader
        const loader = document.createElement('div');
        Object.assign(loader.style, spinnerContainerStyle);

        const spinner = document.createElement('div');
        Object.assign(spinner.style, loaderStyle);
        loader.appendChild(spinner);

        document.body.appendChild(loader);

        setTimeout(() => {
          document.body.removeChild(loader)
          window.location.reload();
        }, 3000);
      } else {
        console.error('Failed to delete the course:', response.data.message);
        toast.error(response.data.message);
      }
      return response.data;
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data.message || 'Error deleting course.', { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar("Course deleted successfully.", { variant: "success" });
    },
  });
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleRemoveCourse = () => {
    mutate(course.courseId);
    handleCloseDialog();
  };

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
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Stack
            direction="row"
            justifyItems="flex-start"
            alignItems="flex-start"
            gap={2}
            mb={2}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: (theme) => theme.palette.primary.dark,
              }}
            >
              <SchoolIcon fontSize="small" />
            </Avatar>

            <Stack>
              <Typography variant="h6">{course.courseName}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={3}>
            <Typography variant="subtitle2">
              Preferred District 1:{" "}
              <Typography variant="caption" color="primary">
                {course?.districtName1 || "not selected"}
              </Typography>
            </Typography>
            <Typography variant="subtitle2">
              Preferred District 2:{" "}
              <Typography variant="caption" color="primary">
                {course?.districtName2 || "not selected"}
              </Typography>
            </Typography>
            <Typography variant="subtitle2">
              Preferred District 3:{" "}
              <Typography variant="caption" color="primary">
                {course?.districtName3 || "not selected"}
              </Typography>
            </Typography>
          </Stack>
        
          <Stack pt={1} direction="row" spacing={1}>
            <Typography variant="subtitle2" sx={{ color: "grey.600" }}>
              Course Priority Level:
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {course.priorityLevel || "not selected"}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            sx={{ mt: 2 }}
          >
            Remove
          </Button>
        </CardContent>
        {!noAction && (
          <CardActions
            sx={{ px: 2, pb: 1, justifyContent: "space-between" }}
          ></CardActions>
        )}
      </Card>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleRemoveCourse} variant="contained" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


