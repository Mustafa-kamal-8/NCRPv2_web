import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import { Avatar, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SwipeableEdgeDrawer from "../drawer/course-wise-registration-stats-drawer";

export default function RegistrationStatsCard({ registrationStatistics }: any) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        titleTypographyProps={{
          fontWeight: 700,
          fontSize: "18px",
        }}
        title={`${registrationStatistics?.district} | Target:  ${registrationStatistics.target}`}
        subheader="Total Registered Candidates"
        avatar={
          <Avatar sx={{ bgcolor: "transparent" }} aria-label="recipe">
            <LocationOnIcon fontSize="large" color="error" />
          </Avatar>
        }
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" display="flex" alignItems="center" gap={2}>
          <PeopleIcon
            sx={{
              fontSize: "30px",
            }}
            color={"primary"}
          ></PeopleIcon>{" "}
          {registrationStatistics?.total}
        </Typography>
      </CardContent>

      <SwipeableEdgeDrawer districtId={registrationStatistics} />
    </Card>
  );
}
