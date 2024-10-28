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
import ApplyCourse from "../apply-course";
import AddCourseToBasket from "../add-course-to-basket";

type Props = {
  course: Course;
  noAction?: boolean;
  highestQualification: string;
  highestQualificationId: number | string;
};

export default function CourseCard({
  qualificationBool,
  course,
  highestQualification,
  highestQualificationId,
  noAction = false,
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, border 0.3s ease-in-out", // Add border to the transition
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "#64B5F6", // Add a slight blueish border color on hover
        },
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
        {/* <Typography color="text.secondary" gutterBottom>
          {course.courseDescription}
        </Typography> */}
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
        >
          <AccessTimeIcon fontSize="small" />
          {course.totalHours} hours
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
        >
          <LocationOnIcon fontSize="small" />
          {course.districtName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
        >
          <SchoolIcon fontSize="small" />
          {course.qualification ?? "No Qualification"}
        </Typography>

        {/* <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
        >
          <ApartmentIcon fontSize="small" />
          {course.residential ? "Residential" : "Non Residential"}
        </Typography> */}

        {/* {!noAction && (
          <>
            <Typography
              variant="body2"
              color={
                course.seatsAvailable < 0 ? "warning.main" : "success.main"
              }
              pt={2}
            >
              {course.seatsAvailable < 0
                ? "Waiting List Candidates"
                : " Seats Available"}
              :{" "}
              <Typography
                component="span"
                variant="body2"
                fontWeight={500}
                // color="black"
              >
                {Math.abs(course.seatsAvailable)}
              </Typography>
            </Typography>
          </>
        )} */}
      </CardContent>
      {!noAction && (
        <CardActions sx={{ px: 2, pb: 1, justifyContent: "space-between" }}>
          <Button
            size="small"
            component={Link}
            to={`/courses/${course.courseId}/${course.districtId}/${course.courseName}/${course.districtName}/${qualificationBool}`}
          >
            Learn More
          </Button>
          {/* <ApplyCourse
            courseId={course.courseId}
            districtId={course.districtId}
          /> */}

          <AddCourseToBasket
            qualificationSelectedOrNot={qualificationBool}
            courseId={course.courseId}
            districtId={course.districtId}
            courseName={course.courseName}
            districtName={course.districtName}
            highestQualificationName={highestQualification}
            highestQualificationId={highestQualificationId}
          />
        </CardActions>
      )}
    </Card>
  );
}
