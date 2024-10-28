import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Box, CardHeader, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function CourseWiseCandidateCard({
  registrationStatistics,
}: any) {
  return (
    <>
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
          // title={`${registrationStatistics?.courseName} | Target:  ${
          //   registrationStatistics.target ?? 0
          // }`}
          title={registrationStatistics?.courseName}
          subheader="Total Registered Candidates"
          avatar={
            <Avatar sx={{ bgcolor: "transparent" }} aria-label="recipe">
              <SchoolIcon fontSize="large" color="success" />
            </Avatar>
          }
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontStyle="italic"
            sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}
          ></Typography>

          <Stack direction={"row"} spacing={10}>
            <Box>
              <Stack direction="column" pl={3}>
                {registrationStatistics?.date && (
                  <Typography
                    variant="h6"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <CalendarTodayIcon fontSize="small" />
                    {registrationStatistics?.date}
                  </Typography>
                )}
                <Typography
                  variant="h5"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <PeopleIcon fontSize="medium" />
                  {registrationStatistics?.total}
                  {/* <Typography variant="caption" color="GrayText">
                    (Total Registration/Available Target)
                  </Typography> */}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
