import PeopleIcon from "@mui/icons-material/People";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { fetchDashboard } from "../api/dashboard-api";
import RegistrationStatsCard from "../components/cards/registeration-stats-card";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js/auto";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function RegistrationStats() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const { isLoading, data } = useQuery({
    queryFn: fetchDashboard,
    queryKey: ["dashboard"],
    // refetchInterval: 3000,
    onError(err: AxiosError) {
      enqueueSnackbar(`${err.message}`, {
        variant: "error",
      });
    },
  });

  // const datas = {
  //   labels: data?.district?.map((districts) => districts.district),
  //   datasets: [
  //     {
  //       labels: "Total Registration District-wise",
  //       data: data?.district?.map((districts) => districts.total),
  //       backgroundColor: "#56c1f9",
  //       borderColor: "white",
  //       pointBorderColor: "#285589",
  //       fill: true,
  //       tension: 0.5,
  //     },
  //   ],
  // };

  if (isLoading) {
    return (
      <Stack
        height="80vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      <Container component="section" maxWidth="xl" sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Ranking
        </Typography>
        <Grid container spacing={2} mb={4} mt={2}>
          {data?.ranking.map((district) => (
            <Grid item xs={12} sm={4} key={district?.id}>
              <Card
                sx={{ bgColor: "#ffd700", borderColor: "primary.main" }}
                variant="outlined"
              >
                <CardHeader
                  title={district?.district}
                  subheader="Total Registered Candidates"
                />
                <CardContent sx={{ flex: 1 }}>
                  <Stack direction="row" gap={2} alignItems="center" pt={2}>
                    <PeopleIcon
                      sx={{
                        fontSize: 40,
                      }}
                      color={"primary"}
                    ></PeopleIcon>
                    <Typography variant="h4">{district?.total}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" sx={{ pt: 4, pb: 3, textAlign: "center" }}>
          Total Number of Registered Candidates
        </Typography>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          mb={3}
        >
          <Grid item xs={12} sm={3}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
              }}
            >
              <CardHeader title="Mega Drive" subheader="&nbsp;" />
              <CardContent>
                <Typography
                  variant="h3"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <PeopleIcon fontSize="large" color="primary" />
                  {data?.new}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
              }}
            >
              <CardHeader title="Registration" subheader="Future Courses" />
              <CardContent>
                <Typography
                  variant="h3"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <PeopleIcon fontSize="large" color="primary" />
                  {data?.oldMega}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="large" onClick={openDrawer}>
                  More Information
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
              }}
            >
              <CardHeader
                title="Already Registered"
                subheader="Before Mega Drive"
              />

              <CardContent>
                <Typography
                  variant="h3"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <PeopleIcon fontSize="large" color="primary" />
                  {data?.old}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                height: "100%",
              }}
            >
              <CardHeader title="Total Registered" subheader="&nbsp;" />

              <CardContent>
                <Typography
                  variant="h3"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <PeopleIcon fontSize="large" color="primary" />
                  {data?.public}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          <Bar
            data={datas}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Total Registration District-wise",
                },
                legend: {
                  display: false,
                  position: "top",
                },
              },
              scales: {
                x: {
                  ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                  },
                },
              },
            }}
          ></Bar>
        </Box> */}
        <Typography variant="h4" sx={{ mb: 2, py: 4, textAlign: "center" }}>
          Total Candidates District-wise in New Registration Page
        </Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {data?.district?.map((districts) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={districts.id}>
              <RegistrationStatsCard registrationStatistics={districts} />
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h4"
          sx={{ mb: 2, paddingTop: 6, paddingBottom: 5, textAlign: "center" }}
          color="primary.main"
        >
          Total Candidates Registered in Offline Mode
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            gap={4}
          >
            {/* <Button startIcon={<PeopleIcon />}></Button> */}
          </Stack>
        </Box>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {/* {data?.district?.map((districts) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={districts.id}>
              <RegistrationStatsCard registrationStatistics={districts} />
            </Grid>
          ))} */}
          <TableContainer component={Paper} variant="outlined">
            <Table
              sx={{ minWidth: 100, fontSize: 16 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={500} sx={{ fontSize: 16 }}>
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500} sx={{ fontSize: 16 }}>
                      District
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500} sx={{ fontSize: 16 }}>
                      Total
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.offline.map((dist, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{dist.date}</TableCell>
                    <TableCell>{dist.district}</TableCell>
                    <TableCell>{dist.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Drawer
            open={open}
            anchor="bottom"
            onClose={closeDrawer}
            sx={{ height: "90vh !important", zIndex: 4000 }}
          >
            <Container maxWidth="xl">
              <Stack
                height="100vh"
                py={2}
                maxHeight="50%"
                sx={{
                  overflowY: "scroll",
                }}
              >
                <Typography variant="h5">Future Data in Mega</Typography>

                <Table>
                  <TableHead>
                    <TableCell>Date</TableCell>
                    <TableCell>District</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Total</TableCell>
                  </TableHead>

                  {data?.futureDataInMega?.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.date}</TableCell>
                      <TableCell>{data.districtName}</TableCell>
                      <TableCell>{data.courseName}</TableCell>
                      <TableCell>{data.total}</TableCell>
                    </TableRow>
                  ))}
                </Table>

                <Typography variant="h5" align="center" py={2}>
                  Future Data Not in Mega
                </Typography>

                <Table sx={{ pb: 16 }}>
                  <TableHead>
                    <TableCell>Date</TableCell>
                    <TableCell>District</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Total</TableCell>
                  </TableHead>

                  {data?.futureDataNotInMega?.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.date}</TableCell>
                      <TableCell>{data.districtName}</TableCell>
                      <TableCell>{data.courseName}</TableCell>
                      <TableCell>{data.total}</TableCell>
                    </TableRow>
                  ))}
                </Table>

                <div style={{ padding: 100 }}></div>
              </Stack>
            </Container>
          </Drawer>
        </Grid>
      </Container>
    </>
  );
}
