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
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

type Props = {
  tc: any;
  noAction?: boolean;
};

export default function HighlightedTCCard({ tc, noAction = false }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, border 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "#64B5F6",
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
            <ApartmentOutlinedIcon fontSize="small" />
          </Avatar>

          <Stack>
            <Typography variant="h6">{tc.name}</Typography>
          </Stack>
        </Stack>{" "}
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
        >
          <LocalPhoneOutlinedIcon fontSize="small" />
          {tc?.mobile ? tc?.mobile : "Not Available"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
        >
          <LocationOnIcon fontSize="small" />
          {tc?.district ? tc?.district : "Not Available"}
        </Typography>
        {/* <Stack>
          <Typography variant="h6">{tc.mobile}</Typography>
          <Typography variant="h6">{tc.address}</Typography>
          <Typography variant="h6">{tc.area}</Typography>
          <Typography variant="h6">{tc.latitude}</Typography>
          <Typography variant="h6">{tc.vsLongitude}</Typography>
          <Typography variant="h6">{tc.PIN}</Typography>
          <Typography variant="h6">{tc.district}</Typography>
        </Stack> */}
        {/* <Typography color="text.secondary" gutterBottom>
          {course.courseDescription}
        </Typography> */}
      </CardContent>
      <CardActions sx={{ px: 2, pb: 1, justifyContent: "space-between" }}>
        <Button
          size="small"
          component={Link}
          to={`/training-centers/${tc?.TCId}`}
        >
          Learn More
        </Button>
        {/* <ApplyCourse
            courseId={course.courseId}
            districtId={course.districtId}
          /> */}
      </CardActions>
    </Card>
  );
}
