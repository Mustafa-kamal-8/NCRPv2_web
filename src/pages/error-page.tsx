import { Button, Stack, Typography } from "@mui/material";
import {
  Link,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import ReplayIcon from "@mui/icons-material/Replay";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;

  // If the error is a RouteErrorResponse, we can extract the error message
  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={2}
      height="100vh"
      px={3}
    >
      <PetsIcon
        sx={{
          fontSize: "10rem",
          color: (theme) => theme.palette.grey[700],
        }}
      />
      <Typography variant="h2" fontWeight={500} align="center">
        Oops!
      </Typography>
      <Typography align="center" color="text.secondary" variant="h5">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="h6" fontWeight={500} pb={2} align="center">
        {errorMessage}
      </Typography>

      <Stack direction="row" gap={2}>
        <Button
          startIcon={<CottageRoundedIcon />}
          size="large"
          variant="contained"
          component={Link}
          to="/"
        >
          GO HOME
        </Button>

        <Button
          startIcon={<ReplayIcon />}
          size="large"
          // variant="contained"
          // component={Link}
          // to="/"
          onClick={() => navigate(0)}
        >
          RELOAD
        </Button>
      </Stack>
    </Stack>
  );
}
