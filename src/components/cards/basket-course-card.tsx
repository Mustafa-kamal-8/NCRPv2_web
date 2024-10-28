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

type Props = {
  course: Course;
  districts: any;
  cookieData: any;
  cookieCourses: CookieCourses;
  // onDistrict1Change: any;
  // onDistrict2Change: any;
  // onDistrict3Change: any;
  noAction?: boolean;
};

export default function BasketCourseCard({
  course,
  noAction = false,
  districts,
  cookieData,
  cookieCourses,
}: // onDistrict1Change,
// onDistrict2Change,
// onDistrict3Change,
Props) {
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

  // remove cookie function
  // function removeCookie(cookieName: any) {
  //   // Retrieve the cookie by name
  //   const cookieValue = getCookie(cookieName);

  //   if (cookieValue !== null) {
  //     // Set the expiration date to the past to remove the cookie
  //     document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  //     console.log(`Cookie '${cookieName}' removed.`);
  //   } else {
  //     console.log(`Cookie '${cookieName}' not found.`);
  //   }
  // }

  function removeCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 20 Aug 1920 11:53:42 GMT; path=/;`;
    window.location.reload();
  }

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

  return (
    <>
      <Container maxWidth="xl">
        <Card
          variant="outlined"
          sx={{
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
          }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Stack
              direction="row"
              justifyItems="center"
              alignItems="center"
              justifyContent="center"
              alignContent="center"
              gap={2}
              mb={2}
            >
              <Stack
                direction="column"
                alignContent={"space-evenly"}
                spacing={1}
              >
                {cookieCourses.priorityLevel != "null" &&
                cookieCourses.priorityLevel != null ? (
                  <Avatar
                    sx={{
                      width: 23,
                      height: 23,
                      bgcolor: (theme) => theme.palette.primary.light,
                    }}
                  >
                    {cookieCourses.priorityLevel}
                  </Avatar>
                ) : (
                  ""
                )}
                {/* <Divider color="primary"></Divider> */}
                <Stack direction="row" spacing={1}>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: (theme) => theme.palette.primary.dark,
                    }}
                  >
                    <SchoolIcon fontSize="small" />
                  </Avatar>

                  <Typography variant="h6">
                    {cookieCourses?.courseName}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Divider></Divider>
            <CardContent>
              <Stack
                direction="row"
                justifyItems="center"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
                gap={3}
                mb={2}
              >
                {" "}
                <Typography variant="subtitle2">
                  Preferred District 1: <br />
                  {/* <Typography variant="caption" color="primary">
                    {cookieCourses?.preferred_district1}
                  </Typography> */}
                  <Typography variant="caption" color="primary">
                    {cookieCourses?.preferred_district1 != "null"
                      ? cookieCourses?.preferred_district1
                      : "not selected"}
                  </Typography>
                </Typography>
                <Typography variant="subtitle2">
                  Preferred District 2: <br />
                  {/* <Typography variant="caption" color="primary">
                    {cookieCourses?.preferred_district2}
                  </Typography> */}
                  <Typography variant="caption" color="primary">
                    {cookieCourses?.preferred_district2 != "null"
                      ? cookieCourses?.preferred_district2
                      : "not selected"}
                  </Typography>
                </Typography>
                <Typography variant="subtitle2">
                  Preferred District 3: <br />
                  {/* <Typography variant="caption" color="primary">
                    {cookieCourses?.preferred_district3}
                  </Typography> */}
                  <Typography variant="caption" color="primary">
                    {cookieCourses?.preferred_district2 != "null"
                      ? cookieCourses?.preferred_district3
                      : "not selected"}
                  </Typography>
                </Typography>
              </Stack>
            </CardContent>
            <CardContent>
              <Stack
                direction="column"
                spacing={2}
                justifyItems="center"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
              >
                {" "}
                {cookieCourses.hostelPreference == 1 ? (
                  <>
                    <Stack direction="row" spacing={0.3}>
                      {" "}
                      <Checkbox
                        checked={cookieCourses.hostelPreference === 1}
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
                        I prefer Hostel Accommodations
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={0.3}>
                      <Checkbox
                        checked={cookieCourses.hostelPreference === 1}
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
                        I prefer Hostel Accommodations
                      </Typography>
                    </Stack>
                  </>
                )}
                {cookieCourses.employementPreference == 1 ? (
                  <>
                    <Stack direction="row" spacing={0.3}>
                      {" "}
                      <Checkbox
                        checked={cookieCourses.employementPreference === 1}
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
                        I prefer Self Employment
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={0.3}>
                      <Checkbox
                        checked={cookieCourses.employementPreference === 1}
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
                        I prefer Self Employment
                      </Typography>
                    </Stack>
                  </>
                )}
                {cookieCourses.employementPreference == 0 ? (
                  <>
                    <Stack direction="row" spacing={0.3}>
                      {" "}
                      <Checkbox
                        checked={cookieCourses.employementPreference === 0}
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
                        I prefer Placement
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={0.3}>
                      <Checkbox
                        checked={cookieCourses.employementPreference === 0}
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
                        I prefer Placement
                      </Typography>
                    </Stack>
                  </>
                )}
              </Stack>
            </CardContent>

            <Divider></Divider>
            <Stack py={1}></Stack>
            <CardActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <Typography variant="inherit">
                <Button
                  style={{ marginRight: "10px" }}
                  component={Link}
                  to={`/edit-preferences/${cookieCourses?.courseId}/${cookieCourses?.courseName}/${cookieCourses.priorityLevel}/${cookieCourses.preferred_district1}/${cookieCourses.preferred_district2}/${cookieCourses.preferred_district3}/${cookieCourses.hostelPreference}/${cookieCourses.employementPreference}`}
                  size="small"
                >
                  Edit your Preferences
                </Button>
              </Typography>
              <Typography variant="inherit">
                <Button
                  component={Link}
                  to={`/my-courses`}
                  variant="text"
                  size="small"
                  onClick={() => {
                    const dataString =
                      "48,Quality Seed Grower,Kamrup Metropolitan,Nalbari,null,1124,380,null,1,1,0";

                    const dataArray = dataString.split(",");

                    let cookies = document.cookie.split(";");
                    console.log("These are the cookie values", cookies);
                    let values = cookies.map(
                      (cookie) => cookie.trim().split("=")[1]
                    );

                    console.log(
                      "These are the elements of the cookie Array",
                      values
                    );

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

                    console.log(
                      "These are the cookie basket values to work on",
                      addToBasket
                    );

                    const firstElement = dataArray[0];
                    const cookieName = `#${cookieCourses.courseId}Course`;
                    console.log(firstElement);
                    removeCookie(cookieName);

                    console.log("Company Id");

                    try {
                      removeCookie(cookieName);

                      console.log(
                        "This is the selected course Id",
                        cookieCourses.courseId
                      );

                      enqueueSnackbar(
                        "Cookie Removed from basket successfully",
                        {
                          variant: "success",
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                          },
                        }
                      );
                    } catch {
                      enqueueSnackbar("Cookie not removed", {
                        variant: "error",
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "right",
                        },
                      });
                    }
                  }}
                  style={{ marginRight: "20px" }}
                >
                  Remove Course
                </Button>
              </Typography>
            </CardActions>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
