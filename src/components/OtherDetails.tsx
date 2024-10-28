import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const OtherDetails = ({ handleNext, handleBack, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleNextStep = () => {
  //     handleNext(formData);
  //   };

  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "white", borderRadius: 2, p: 4, mt: 4, boxShadow: 3 }}
    >
      <Typography
        variant="h4"
        color="primary"
        align="center"
        gutterBottom
      ></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box border={1} borderColor="black" p={2} borderRadius={2}>
            <Typography
              variant="h5"
              color="primary"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              Other Details
            </Typography>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Is BPL Card Holder?*</FormLabel>
              <RadioGroup
                row
                name="isBPLCardHolder"
                value={formData.isBPLCardHolder}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="1"
                  control={<Radio style={{ color: "black" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio style={{ color: "black" }} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Is Minority?*</FormLabel>
              <RadioGroup
                row
                name="isMinority"
                value={formData.isMinority}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="1"
                  control={<Radio style={{ color: "black" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio style={{ color: "black" }} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">
                Is Antodaya Card Holder?*
              </FormLabel>
              <RadioGroup
                row
                name="isAntodayaCardHolder"
                value={formData.isAntodayaCardHolder}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="1"
                  control={<Radio style={{ color: "black" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio style={{ color: "black" }} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">
                Is BoCW (Building And Construction Worker)?*
              </FormLabel>
              <RadioGroup
                row
                name="isBoCw"
                value={formData.isBoCw}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="1"
                  control={<Radio style={{ color: "black" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio style={{ color: "black" }} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Is MGNREGA Card Holder?*</FormLabel>
              <RadioGroup
                row
                name="isNregaCardHolder"
                value={formData.isNregaCardHolder}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="1"
                  control={<Radio style={{ color: "black" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio style={{ color: "black" }} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Is Tea Tribe Minority?*</FormLabel>
              <RadioGroup
                row
                name="isTeaTribeMinoriy"
                value={formData.isTeaTribeMinoriy}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="1"
                  control={<Radio style={{ color: "black" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio style={{ color: "black" }} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>

            <Box display="flex" alignItems="center" margin="normal">
              <Typography variant="h7">Employment Exchange Number</Typography>
              <TextField
                label="Employment Exchange Number"
                name="empExchangeNo"
                value={formData.empExchangeNo}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{ style: { borderColor: "black" } }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          {/* <Button variant="contained" color="primary" onClick={handleBack} sx={{ width: '150px' }}>
            Previous
          </Button> */}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          {/* <Button variant="contained" color="primary"
        //    onClick={handleNextStep} 
           sx={{ width: '150px' }}>
            Next
          </Button> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default OtherDetails;
