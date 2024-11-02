import { FacebookRounded } from "@mui/icons-material";
import { Container, Grid, Stack, Typography } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Divider } from "@mui/material";
// import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        bgcolor: "#272727",
        color: "#fff",
        marginTop: "80px",
        position: "relative",
        // zIndex: zIndex.drawer + 1,
        paddingY: 2, // Reduces vertical padding for a shorter height
        paddingX: 3, // Optional: adjust horizontal padding if needed paddingY: 2, // Reduces vertical padding for a shorter height
     
      }}
    >
      <Container maxWidth="xl">
        <Grid container >
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              {/* <Stack direction="row" spacing={2}>
                <Asdm_logo />
                <Typography sx={{ py: 1 }}>
                  {" "}
                  ASSAM SKILL DEVELOPMENT MISSION
                </Typography>
              </Stack> */}

              <Stack>
                <Typography
                  variant="h7"
                  sx={{
                    marginTop: 2, 
              marginBottom: 1, 
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1, 
              fontSize: "0.875rem",
                  }}
                >
                  Our Address
                </Typography>
                <Divider
                  sx={{
                    backgroundColor: "white",
              
                    width: "110px",
                    margin: "5px 0",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 2,
                    marginBottom: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Mission Director
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                   
                  }}
                >
                  Assam Skill Development Mission
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
              
                  }}
                >
                  Katabari, DPS Road, NH-37
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
              
                  }}
                >
                  Gorchuk, Guwahati
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
            
                  }}
                >
                  Assam 781035
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
          
                  }}
                >
                  Phone: +91 361 - 227 9745
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
            
                  }}
                >
                  Email: missiondirector.asdm@gmail.com
                </Typography>
                <Typography mt={6} mb={2} variant="body2"></Typography>
                <Stack>{/* <FacebookRounded /> */}</Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Stack>
                <Typography
                  variant="h6"
                  sx={{
                  
                    marginBottom: 2,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.900rem",
                    marginLeft: "11px",
                  }}
                >
                  Important Links
                </Typography>
                <Divider
                  sx={{
                    backgroundColor: "white",
                  
                    width: "145px",
                    margin: "5px 0",
                    marginLeft: "11px",
                  
                  }}
                />
                {/* <Typography
                  variant="body2"
                  sx={{
                    marginTop: 2,
                    marginBottom: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />

                  <Link
                    to="/registration-stats"
                    style={{ color: "#fff" }}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Dashboard
                  </Link>
                </Typography> */}
                <Typography
                  variant="body2"
                  sx={{
                  
                  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://assam.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  
                  >
                    Government Department of Assam{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                   
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://asdm.assam.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    ASDM Portal{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://www.nsdcindia.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    National Skill Development Corporation{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://www.skilldevelopment.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    Ministry of Skill Development And Entrepreneurship{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="http://smart.nsdcindia.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    SMART Portal{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                   
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://statesdms.nsdcindia.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    SDMS Portal{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://admin.skillindiadigital.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    Skill India Portal{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                   
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://sdms.symphonysummit.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    NSDC Ticket Support Symphony{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                   
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://www.nsdcindia.org/nos"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    National Occupational Standards (NOS){" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://skillmission.assam.gov.in/contact-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    Contact Us{" "}
                  </a>{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "0.700rem",
                  }}
                >
                  <ChevronRightIcon sx={{ color: "white" }} />
                  <a
                    href="https://skillmission.assam.gov.in/sitemap"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white" }}
                  >
                    Sitemap{" "}
                  </a>{" "}
                </Typography>

                <Stack py={2} direction="row" spacing={2}>
                  <a
                    href="https://www.facebook.com/asdmskill/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookRounded style={{ color: "white" }} />
                  </a>
                  <a
                    href="https://skillmission.assam.gov.in/#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTubeIcon style={{ color: "white" }} />
                  </a>
                  <a
                    href="https://twitter.com/asdm_social"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon style={{ color: "white" }} />
                  </a>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Typography
              variant="body2"
              color="primary.light"
              fontWeight={500}
            ></Typography>

            <List sx={{ pt: 4 }}>
              {NAVITEMS?.map((link) => (
                <ListItem key={link.id} disablePadding>
                  <ListItemButton component={Link} to={link.path}>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                      }}
                      primary={link.label}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid> */}
        </Grid>
      </Container>
    </Stack>
  );
}
