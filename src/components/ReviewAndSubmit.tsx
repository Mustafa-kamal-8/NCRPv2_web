import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

interface ReviewAndSubmitProps {
  handleBack: () => void;
  agreed: boolean;
  setAgreed: (value: boolean) => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  handleBack,
  agreed,
  setAgreed,
}) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "white", borderRadius: 2, p: 4, mt: 4, boxShadow: 3 }}
    >
      <Typography
        variant="h5"
        color="primary"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold" }}
      >
        Review and Submit
      </Typography>
      <Box border={1} borderColor="black" p={2} borderRadius={2} mt={4}>
        <Typography variant="h6" color="primary" gutterBottom>
          Basic Details
        </Typography>
      </Box>
      <Box border={1} borderColor="black" p={2} borderRadius={2} mt={4}>
        <Typography variant="h6" color="primary" gutterBottom>
          Personal Details
        </Typography>
      </Box>
      <Box border={1} borderColor="black" p={2} borderRadius={2} mt={4}>
        <Typography variant="h6" color="primary" gutterBottom>
          Address Details
        </Typography>
      </Box>
      <Box border={1} borderColor="black" p={2} borderRadius={2} mt={4}>
        <Typography variant="h6" color="primary" gutterBottom>
          Other Details
        </Typography>
      </Box>

      <Box mt={2} textAlign="center" style={{ marginTop: "100px" }}>
        <Typography variant="body1" color="textPrimary">
          <h2 style={{ color: "red", marginTop: "-50px" }}>Declaration</h2>
          I hereby declare that the information submitted by me is correct and
          true to the best of my knowledge.
          <br />
          I shall be liable for any Disciplinary/Punitive action in case the
          details are found to be incorrect.
          <br />
          Information Provided will be the proprietary of ASDM for different
          enrollment purposes.
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                color="primary"
              />
            }
            label="I Agree to the terms and conditions"
          />
        </Box>
        {agreed && (
          <Box mt={2}>
            <Typography variant="body1" color="textSecondary">
              Thank you for agreeing to the terms and conditions.
            </Typography>
          </Box>
        )}
      </Box>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}></Grid>
    </Container>
  );
};

export default ReviewAndSubmit;
