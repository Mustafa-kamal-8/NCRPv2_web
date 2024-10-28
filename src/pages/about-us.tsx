import { Container, Grid, Stack, Typography } from "@mui/material";

import About from "../assets/aboutUs.svg";

export default function AboutUs() {
  return (
    <>
      <Container component="section" maxWidth="xl" sx={{ py: 2 }}>
        <Typography
          variant="h4"
          sx={{ mb: 2, py: 3, textAlign: "center" }}
          color="primary.main"
        >
          About Us
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
          <Grid item xs={12} sm={5}>
            <About />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Stack justifyContent="center" height="100%" maxWidth="40rem">
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Who we are
              </Typography>
              <Typography paragraph color="text.secondary">
                Assam Skill Development Mission was set up under the aegis of
                Skill Employment and Entrepreneurship Department. The vision of
                the mission is capacity building of the unemployed youth and to
                deliver quality skill training leading to meaningful employment.
              </Typography>

              {/* <Stack direction="row" gap={3} mt={3}>
                <Box maxWidth="10rem">
                  <Typography variant="h4" fontWeight={700}>
                    1.02 K
                  </Typography>
                  <Typography variant="body2">
                    Actively registered as students
                  </Typography>
                </Box>
                <Box maxWidth="10rem">
                  <Typography variant="h4" fontWeight={700}>
                    776
                  </Typography>
                  <Typography variant="body2">Experienced Teachers</Typography>
                </Box>
              </Stack> */}
            </Stack>
          </Grid>
        </Grid>

        {/* <Grid
          container
          py={1}
          spacing={{
            xs: 2,
            sm: 4,
            md: 8,
          }}
        >
          <Grid item xs={12} sm={12} py={3}>
            <Stack justifyContent="center" height="100%">
              <Typography
                variant="h4"
                fontWeight={700}
                align="center"
                gutterBottom
              >
                Vision
              </Typography>
              <Typography paragraph color="text.secondary" align="center">
                Capacity Building of unemployed youth and to deliver quality
                skill training leading to meaningful employment.
              </Typography>
            </Stack>
          </Grid>
        </Grid> */}
        {/* <Box pb={56} /> */}
        {/* <SubmitButton /> */}
      </Container>
    </>
  );
}
