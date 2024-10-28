import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import GoogleMapComponent from "../../components/ui/GoogleMap";
import { enqueueSnackbar } from "notistack";
import { getTCDetails } from "../../api/tc-api";

export default function TrainingCenter() {
  const { courseId, districtId } = useParams<{
    courseId: string;
    districtId: string;
  }>();

  const params = useParams();
  console.log("These are the paramsasa", params.trainingCenterId);

  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: () => getTCDetails(params?.trainingCenterId!),
    queryKey: ["training_center", params?.trainingCenterId!],
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
        // enqueueSnackbar(data.message, {
        //   variant: "success",
        //   anchorOrigin: {
        //     vertical: "top",
        //     horizontal: "right",
        //   },
        // });
      }
    },
  });

  // useEffect(() => {}, []);
  function scrollWindowUp() {
    const scrollStep = -30;
    const scrollInterval = 5;

    const scrollIntervalId = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollIntervalId);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, scrollInterval);
  }

  scrollWindowUp();
  // window.location.reload();

  console.log("These are the training center data", data);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const locations = [
    {
      lat: parseFloat(data?.data.latitude),
      lng: parseFloat(data?.data.vsLongitude),
    },
  ];

  console.log("lat long", data?.data.latitude, data?.data.vsLongitude);

  if (isLoading) {
    return (
      <Stack height="70vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      <Container component="section" maxWidth="xl" sx={{ py: 2 }}>
        <Typography
          variant="h4"
          sx={{ mb: 2, py: 3, textAlign: "center" }}
          color="primary.main"
        >
          Training Center Details
        </Typography>
        <Grid
          container
          py={4}
          spacing={{
            xs: 2,
            sm: 4,
            md: 8,
          }}
        >
          <Grid item xs={12} sm={6}>
            <Stack justifyContent="center" height="100%" maxWidth="40rem">
              <div>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {data?.data.name}
                </Typography>
              </div>

              <Typography paragraph color="text.secondary"></Typography>

              <Stack direction="column" gap={0} mt={1} py={2}>
                <Typography
                  variant="h6"
                  align="left"
                  fontWeight={500}
                  gutterBottom
                >
                  Training Center Overview
                </Typography>

                <Typography align="left" py={1}>
                  1. Contact -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.mobile ? data?.data.mobile : "Not Available"}
                  </Typography>
                </Typography>

                <Typography align="left" py={1}>
                  2. Address -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.address ? data?.data.address : "Not Available"}
                  </Typography>
                </Typography>

                <Typography align="left" py={1}>
                  3. Area -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.area ? data?.data.area : "Not Available"}
                  </Typography>
                </Typography>

                <Typography align="left" py={1}>
                  4. District -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.district
                      ? data?.data.district
                      : "Not Available"}
                  </Typography>
                </Typography>

                <Typography align="left" py={1}>
                  5. PIN -{" "}
                  <Typography component="span" fontWeight={500}>
                    {data?.data.PIN ? data?.data.PIN : "Not Available"}
                  </Typography>
                </Typography>
              </Stack>

              <Box px={63}></Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            {locations ? (
              <GoogleMapComponent
                containerStyle={containerStyle}
                positions={locations!}
              />
            ) : (
              <p>No locations found.</p>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
