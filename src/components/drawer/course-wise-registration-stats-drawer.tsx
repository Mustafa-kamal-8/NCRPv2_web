import { Global } from "@emotion/react";
import { CardActions, CircularProgress, Grid, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import { fetchDistrictData } from "../../api/dashboard-api";
import CourseWiseCandidateCard from "../cards/course-wise-candidates";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer({ districtId }: any) {
  // const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [_, setDistrictName] = useState(null);
  const [courseWiseData, setCourseWiseData] = useState([]);

  const { isLoading: isLoadingDistrictData, mutate: mutateDistrictData } =
    useMutation({
      mutationFn: fetchDistrictData,
      onSuccess(data) {
        console.log("This is the course data", data);
        console.log("This is the course data", data.course[0].courseName);
        setCourseWiseData(data.course);
        setDistrictName(data.course[0].districtName);
      },
      onError(error: any) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      },
    });

  function clickHandler() {
    mutateDistrictData(districtId.id);

    setOpen(true);
  }

  if (isLoadingDistrictData) {
    return (
      <Stack height="80vh">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <CardActions>
        <Button onClick={() => clickHandler()}>
          View Total Registered Candidates Course-wise{" "}
        </Button>
      </CardActions>
      <SwipeableDrawer
        // container={container}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Grid
            sx={{ pt: 2 }}
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            {courseWiseData?.map((courses) => (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <CourseWiseCandidateCard registrationStatistics={courses} />
              </Grid>
            ))}
          </Grid>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}
