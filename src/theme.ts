import { createTheme } from "@mui/material";

// const accent = "#E7531A";
// const primary = "#05507F";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
