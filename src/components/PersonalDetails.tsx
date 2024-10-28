import React, { useEffect } from "react";
import {
  TextField,
  MenuItem,
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

const idCardTypes = ["Aadhar Card"];
const religions = [
  { label: "Hinduism", value: 1 },
  { label: "Sikhism", value: 2 },
  { label: "Islam", value: 3 },
  { label: "Other", value: 4 },
  { label: "Christianity", value: 5 },
];
const categories = [
  { label: "General", value: 5 },
  { label: "MOBC", value: 10 },
  { label: "Other Backward Classes", value: 9 },
  { label: "Scheduled Caste", value: 1 },
  { label: "Scheduled Tribe(H)", value: 4 },
  { label: "Scheduled Tribe(P)", value: 8 },
];
const qualifications = [
  { label: "5th Pass", value: 2 },
  { label: "8th Pass", value: 3 },
  { label: "Diploma/ITI", value: 10 },
  { label: "Graduate/Equivalent", value: 7 },
  { label: "High School/10th/Matric/Equivalent", value: 5 },
  { label: "Higher Secondary/12th/Intermediate/Equivalent", value: 6 },
  { label: "Post Graduate/Equivalent", value: 8 },
  { label: "Other", value: 9 },
  { label: "Uneducated/No Formal Education", value: 1 },
];

const PersonalDetails = ({ handleNext, handleBack, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const qualificationId = localStorage.getItem('qualificationId');
  const qualificationName = localStorage.getItem('qualificationName');

  useEffect(() => {
    if (qualificationId) {
      setFormData((prevData) => ({
        ...prevData,
        qualification: qualificationId, // Set qualificationId in formData
      }));
    }
  }, [qualificationId]);

  const handleChangee = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        Personal Details
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Box border={1} borderColor="black" p={2} borderRadius={2}>
            <TextField
              label="Adhar Card Number"
              name="adharNumber"
              value={formData.adharNumber}
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 12 }}
              InputProps={{
                readOnly: true,
                style: { pointerEvents: "none" },
              }}
            />
            <TextField
              label="Phone Number"
              name="mobile"
              value={formData.mobile}
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 10 }}
              InputProps={{
                readOnly: true,
                style: { pointerEvents: "none" },
              }}
            />
            <TextField
              label="Alternative Phone Number"
              name="altMobile"
              value={formData.altMobile}
              onChange={handleChange}
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
        
            />
            <TextField
              select
              label="Religion"
              name="relegion"
              value={formData.relegion}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {religions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Category"
              name="casteId"
              value={formData.casteId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
      select
      label="Qualification"
      name="qualification"
      value={formData.qualification} // Set qualificationId as value from localStorage
      onChange={handleChangee}
      fullWidth
      margin="normal"
      required
      disabled={Boolean(qualificationId)} // Disable if qualificationId is in localStorage
    >
      {/* Display the qualificationName from localStorage */}
      <MenuItem value={qualificationId}>
        {qualificationName}
      </MenuItem>
    </TextField>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">
                Are You Person with Disability?
              </FormLabel>
              <RadioGroup
                row
                name="isDisable"
                value={formData.isDisable}
                onChange={handleChange}
                required
              >
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonalDetails;
