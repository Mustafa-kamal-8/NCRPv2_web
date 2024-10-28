import { Box, Button, Container, Stack, Typography } from "@mui/material";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Logo from "../components/ui/logo";
import { Link, useLocation } from "react-router-dom";

export default function Acknowledge() {
  const location = useLocation();

  const acknowledgementData = location.state?.acknowledgementData || null;
  console.log("This is candidate mobile number", acknowledgementData?.message);

  function print() {
    window.print();
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box ml={-2}>
        <Logo />
      </Box>

      <Typography variant="h4">ACKNOWLEDGE</Typography>

      <Typography color="GrayText" py={3}>
        {acknowledgementData?.message}
      </Typography>

      <Stack direction="row" gap={4}>
        <Button startIcon={<PrintRoundedIcon />} onClick={print}>
          Print
        </Button>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          component={Link}
          to="/courses"
        >
          Back to Courses
        </Button>
      </Stack>
    </Container>
  );
}
