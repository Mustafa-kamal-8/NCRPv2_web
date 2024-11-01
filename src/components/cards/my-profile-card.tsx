import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import {
  Avatar,
  Stack,
  Container,
  Box,
  Divider,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ApplyCourse from "../apply-course";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import DistrictDropdown from "../ui/districtDropdown";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dialog from "@mui/material/Dialog";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { deleteCourse } from "../../api/courses-api";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type Props = {
  course: Course;
  districts: any;
  cookieData: any;
  courses: Courses;
  // onDistrict1Change: any;
  // onDistrict2Change: any;
  // onDistrict3Change: any;
  noAction?: boolean;
};

export default function MyProfileCourseCard({
  course,
  noAction = false,
  districts,
  cookieData,
  courses,
}: // onDistrict1Change,
  // onDistrict2Change,
  // onDistrict3Change,
  Props) {
  const candidateId = localStorage.getItem("candidateId");
  let cookies = document.cookie.split(";");
  let values = cookies.map((cookie) => cookie.trim().split("=")[1]);
  const numberOptions = Array.from(
    { length: values.length },
    (_, index) => index + 1
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  const queryClient = useQueryClient();

  const { mutate, data, isLoading } = useMutation({
    mutationFn: deleteCourse,
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
        // window.location.reload();
        queryClient.invalidateQueries({
          queryKey: ["candidate_courses", candidateId!],
        });

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

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleRemoveCourse = () => {
    // Your logic to remove the course goes here
    const courseData = {
      candidateId: candidateId,
      courseId: courses.courseId,
    };
    mutate(courseData);

    handleCloseDialog();
  };

  // Example usage
  // removeCookie("yourCookieName"); // Replace with the actual name of your cookie
  // function getCookie(cookieName: any) {
  //   const cookies = document.cookie.split(";");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].trim();
  //     if (cookie.startsWith(cookieName + "=")) {
  //       return cookie.substring(cookieName.length + 1);
  //     }
  //   }
  //   return null; // Cookie not found
  // }

  console.log(
    "These are the cookie data send from the cookie storage",
    cookieData
  );

  console.log("These are the cookie values gathered", values);
  const [open, setOpen] = useState(false);

  const hostelPreference = courses?.hostelPreference === "Yes" ? 1 : 0;
  // const employmentPrefernce = courses?.selfEmploye === "Yes" ? 1 : 0;

  const employmentPrefernce =
    courses?.selfEmploye === "Yes"
      ? 1
      : courses?.selfEmploye === "No"
        ? 0
        : null;

  return (
    <>
      <Container maxWidth="xl">
        <Card
          variant="outlined"
          sx={ {
            height: "100%",
            // width: { xs: "100%", sm: "200%", md: "400%" },
            width: "100%",
            // width: "342%",
            display: "flex",
            flexDirection: "row",
            paddingTop: "1px",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "1px 6px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "ghostwhite",
            },
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          } }
        >
          <CardContent sx={ { flex: 1 } }>
            <Stack
              direction="row"
              justifyItems="center"
              alignItems="center"
              justifyContent="center"
              alignContent="center"
              gap={ 2 }
              mb={ 2 }
            >
              <Stack
                direction="column"
                // alignContent={"space-evenly"}
                justifyItems="center"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
                spacing={ 1 }
              >
                { courses.priorityLevel !== "null" &&
                  courses.priorityLevel !== null ? (
                  <Avatar
                    sx={ {
                      width: 23,
                      height: 23,
                      bgcolor: (theme) => theme.palette.primary.light,
                    } }
                  >
                    { courses.priorityLevel }
                  </Avatar>
                ) : (
                  ""
                ) }
                <Divider color="primary"></Divider>
                <Stack direction="row" spacing={ 1 }>
                  <Avatar
                    sx={ {
                      width: 30,
                      height: 30,
                      bgcolor: (theme) => theme.palette.primary.dark,
                    } }
                  >
                    <SchoolIcon fontSize="small" />
                  </Avatar>

                  <Typography variant="h6">{ courses?.courseName }</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Divider></Divider>
            <CardContent>
              {/* <Stack direction="row" pb={3} spacing={1}>
                <StarBorderOutlinedIcon fontSize="small" />
                <Typography>
                  <Stack direction="row" spacing={1}>
                    <Typography>Priority Level: </Typography>
                    <Typography color="primary">
                      {courses.priorityLevel}
                    </Typography>
                  </Stack>
                </Typography>
              </Stack> */}
              <Stack
                direction="row"
                spacing={ 3 }
                justifyItems="center"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
              >
                <Typography variant="subtitle2">
                  Preferred District 1: <br />
                  <Typography variant="caption" color="primary">
                    { courses?.districtName1 != null
                      ? courses?.districtName1
                      : "not selected" }
                  </Typography>
                </Typography>
                <Typography variant="subtitle2">
                  Preferred District 2: <br />
                  <Typography variant="caption" color="primary">
                    { courses?.districtName2 != null
                      ? courses?.districtName2
                      : "not selected" }{ " " }
                  </Typography>
                </Typography>
                <Typography variant="subtitle2">
                  Preferred District 3: <br />
                  <Typography variant="caption" color="primary">
                    { courses?.districtName3 != null
                      ? courses?.districtName3
                      : "not selected" }{ " " }
                  </Typography>
                </Typography>
              </Stack>
            </CardContent>
            <CardContent>
              <Stack
                direction="column"
                spacing={ 2 }
                justifyItems="center"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
              >
                { courses?.hostelPreference == "Yes" ? (
                  <>
                    <Stack direction="row" spacing={ 0.3 }>
                      { " " }
                      <Checkbox
                        checked={ courses?.hostelPreference === "Yes" }
                        icon={ <CheckCircleOutlineIcon /> }
                        checkedIcon={ <CheckCircleIcon /> }
                        color="primary"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        I prefer Hostel Accommodations
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={ 0.3 }>
                      <Checkbox
                        checked={ courses?.hostelPreference === "Yes" }
                        icon={ <CheckBoxOutlineBlankIcon /> }
                        checkedIcon={ <CheckCircleIcon /> }
                        color="primary"
                      />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        fontStyle="oblique"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        I prefer Hostel Accommodations
                      </Typography>
                    </Stack>
                  </>
                ) }
                {/* {courses?.selfEmploye == "Yes" ? (
                  <>
                    <Stack direction="row" spacing={0.3}>
                      {" "}
                      <Checkbox
                        checked={courses?.selfEmploye === "Yes"}
                        icon={<CheckCircleOutlineIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        color="primary"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        }}
                      >
                        I prefer Placement/Self-employment
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={0.3}>
                      <Checkbox
                        checked={courses?.selfEmploye === "Yes"}
                        icon={<CheckBoxOutlineBlankIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        color="primary"
                      />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        fontStyle="oblique"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        }}
                      >
                        I prefer Placement/Self-employment
                      </Typography>
                    </Stack>
                  </>
                )} */}

                { courses.selfEmploye === "Yes" ? (
                  <>
                    <Stack direction="row" spacing={ 0.3 }>
                      { " " }
                      <Checkbox
                        checked={ courses.selfEmploye === "Yes" }
                        icon={ <CheckCircleOutlineIcon /> }
                        checkedIcon={ <CheckCircleIcon /> }
                        color="primary"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        I prefer Self Employment
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={ 0.3 }>
                      <Checkbox
                        checked={ courses.selfEmploye === "Yes" }
                        icon={ <CheckBoxOutlineBlankIcon /> }
                        checkedIcon={ <CheckCircleIcon /> }
                        color="primary"
                      />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        fontStyle="oblique"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        I prefer Self Employment
                      </Typography>
                    </Stack>
                  </>
                ) }

                { courses.selfEmploye === "No" ? (
                  <>
                    <Stack direction="row" spacing={ 0.3 }>
                      { " " }
                      <Checkbox
                        checked={ courses.selfEmploye === "No" }
                        icon={ <CheckCircleOutlineIcon /> }
                        checkedIcon={ <CheckCircleIcon /> }
                        color="primary"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        I prefer Placement
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={ 0.3 }>
                      <Checkbox
                        checked={ courses.selfEmploye === "No" }
                        icon={ <CheckBoxOutlineBlankIcon /> }
                        checkedIcon={ <CheckCircleIcon /> }
                        color="primary"
                      />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        fontStyle="oblique"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        I prefer Placement
                      </Typography>
                    </Stack>
                  </>
                ) }
              </Stack>
            </CardContent>
            <Divider></Divider>
            <Stack py={ 1 }></Stack>
            <CardActions
              style={ {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              } }
            >
              {/* <Typography variant="inherit">
                <Button
                  component={ Link }
                  to={ `/edit-preferences-from-database/${courses?.courseId}/${courses?.courseName}/${courses?.priorityLevel}/${courses?.districtName1}/${courses?.districtName2}/${courses?.districtName3}/${courses?.preferred_district1}/${courses?.preferred_district2}/${courses?.preferred_district3}/${hostelPreference}/${employmentPrefernce}` }
                  size="small"
                >
                  Edit your Preferences
                </Button>
              </Typography> */}
              <Typography variant="inherit">
                <Button variant="text" size="small" onClick={ handleOpenDialog }>
                  Remove Course
                </Button>
              </Typography>
            </CardActions>
          </CardContent>
        </Card>
        <Dialog open={ open } onClose={ handleCloseDialog }>
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this course?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleCloseDialog }>Cancel</Button>
            <Button onClick={ handleRemoveCourse } variant="contained" autoFocus>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
