import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import { UserContext } from "./UserContext";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Box,
  Container,
} from "@mui/material";

const genders = ["Any", "Male", "Female", "Transgender"];

const BasicDetails = ({ handleNext, formData, setFormData }) => {
  // const { updateUserData } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    updateUserData("basicDetails", formData);
    handleNext();
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

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
        {/* Basic Candidate Details */}
        <Grid item xs={12}>
          <Box border={1} borderColor="black" p={2} borderRadius={2}>
            <Typography
              variant="h5"
              color="primary"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              Basic Candidate Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Date Of Birth"
                  name="dob"
                  value={formData.dob}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                    style: { pointerEvents: "none" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                  required
                >
                  {genders.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Father's Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Mother's Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}></Grid>
      </Grid>
    </Container>
  );
};

export default BasicDetails;
