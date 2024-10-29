import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressDetails = ({ formData, setFormData }) => {
  const [districts, setDistricts] = useState([]);
  const [pdistricts, psetDistricts] = useState([]);
  const [assemblyConstituency, setAssemblyConstituency] = useState([]);
  const [loksabhaConstituency, setLoksabhaConstituency] = useState([]);
  const [allUlbs, setAllUlbs] = useState([]);
  const [blocks, setBlock] = useState([]);
  const [pallUlbs, psetAllUlbs] = useState([]);
  const [pblocks, psetBlock] = useState([]);
  const [filteredUlbs, setFilteredUlbs] = useState([]);
  const [filteredblocks, setFilteredBlocks] = useState([]);
  const [pfilteredUlbs, psetFilteredUlbs] = useState([]);
  const [pfilteredblocks, psetFilteredBlocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log("no token",token)
          throw new Error("No auth token found");
         
        }
        const response = await axios.get(
          "https://ncrpv2.skillmissionassam.org/nw/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          setDistricts(response.data.data.districts);
          psetDistricts(response.data.data.districts);
          setAssemblyConstituency(response.data.data.assemblyConstituency);
          setLoksabhaConstituency(response.data.data.loksabhaConstituency);
          setAllUlbs(response.data.data.ulb);
          psetAllUlbs(response.data.data.ulb);
          setBlock(response.data.data.block);
          psetBlock(response.data.data.block);
          console.log("ULB data fetched:", response.data.data.ulb); // Check ULB data here
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "Failed to authenticate token."
        ) {
          console.error("Token authentication failed. Redirecting to login...");
          navigate("/login"); // Redirect to login page
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (formData.areaType === "URBAN") {
      const filtered = allUlbs.filter(
        (ulb) => ulb.fklDistrictId === formData.district
      );
      setFilteredUlbs(filtered);
      console.log("Filtered ULBs:", filtered); // Check filtered ULBs here
    }
  }, [formData.areaType, formData.district, allUlbs]);
  useEffect(() => {
    if (formData.areaType === "RURAL") {
      const filtered = blocks.filter(
        (ulb) => ulb.fklDistrictId === formData.district
      );
      setFilteredBlocks(filtered);
      console.log("Filtered ULBs:", filtered); // Check filtered ULBs here
    }
  }, [formData.areaType, formData.district, blocks]);

  // useEffect(() => {
  //   if (formData.pareaType === "URBAN") {
  //     const filtered = pallUlbs.filter(
  //       (ulb) => ulb.fklDistrictId === formData.pdistrict
  //     );
  //     psetFilteredUlbs(filtered);
  //     console.log("Filtered ULBs:", filtered); // Check filtered ULBs here
  //   }
  // }, [formData.areaType, formData.pdistrict, pallUlbs]);



  // useEffect(() => {
  //   if (formData.pareaType === "RURAL") {
  //     const filtered = pblocks.filter(
  //       (ulb) => ulb.fklDistrictId === formData.pdistrict
  //     );
  //     psetFilteredBlocks(filtered);
  //     console.log("Filtered ULBs:", filtered); // Check filtered ULBs here
  //   }
  // }, [formData.areaType, formData.pdistrict, pblocks]);

  useEffect(() => {
    if (formData.pdistrict && formData.pareaType === "URBAN") {
      const filtered = pallUlbs.filter(
        (ulb) => ulb.fklDistrictId === formData.pdistrict
      );
      psetFilteredUlbs(filtered);
    } else if (formData.pdistrict && formData.pareaType === "RURAL") {
      const filtered = pblocks.filter(
        (block) => block.fklDistrictId === formData.pdistrict
      );
      psetFilteredBlocks(filtered);
    }
  }, [formData.pdistrict, formData.pareaType, pallUlbs, pblocks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <Grid item xs={12}>
          <Box border={1} borderColor="black" p={2} borderRadius={2}>
            <Typography
              variant="h5"
              color="primary"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              Address Details
            </Typography>

            <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            />
              </Grid>
  <Grid item xs={6}>
            <TextField
              select
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            >
              {districts.map((option) => (
                <MenuItem key={option.districtID} value={option.districtID}>
                  {option.districtName}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            </Grid>
            <FormControl component="fieldset" margin="normal" fullWidth>
  <FormLabel component="legend">Is City/Village?</FormLabel>
  <RadioGroup
    row
    name="areaType"
    value={formData.areaType}
    onChange={handleChange}
    required
  >
    <FormControlLabel
      value="URBAN"
      control={<Radio style={{ color: "black" }} />}
      label="City"
    />
    <FormControlLabel
      value="RURAL"
      control={<Radio style={{ color: "black" }} />}
      label="Village"
    />
  </RadioGroup>
</FormControl>

{formData.areaType === "URBAN" && (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        select
        label="ULB"
        name="ulb"
        value={formData.ulb}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputProps={{ style: { borderColor: "black" } }}
        required
      >
        {filteredUlbs.map((option) => (
          <MenuItem key={option.pklUlbId} value={option.pklUlbId}>
            {option.vsUlbName}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="City Name"
        name="city"
        value={formData.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputProps={{ style: { borderColor: "black" } }}
        required
      />
    </Grid>
  </Grid>
)}

{formData.areaType === "RURAL" && (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        select
        label="Block"
        name="block"
        value={formData.block}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputProps={{ style: { borderColor: "black" } }}
        required
      >
        {filteredblocks.map((option) => (
          <MenuItem key={option.pklTalukaId} value={option.pklTalukaId}>
            {option.vsTalukaName}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Village Name"
        name="city"
        value={formData.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputProps={{ style: { borderColor: "black" } }}
        required
      />
    </Grid>
  </Grid>
)}

<Grid container spacing={2}>
<Grid item xs={4}>
            <TextField
              label="Pin Code"
              name="PIN"
              value={formData.PIN}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              inputProps={{ maxLength: 6 }}
              required
            />
 </Grid>
 <Grid item xs={4}>
            <TextField
              label="Post Office"
              name="postoffice"
              value={formData.postoffice}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            />
             </Grid>
             <Grid item xs={4}>
            <TextField
              label="Police Station"
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            />
</Grid>
</Grid>

<Grid container spacing={2}>
<Grid item xs={6}>
            <TextField
              select
              label="Assembly Constituency"
              name="assemblyConstituency"
              value={formData.assemblyConstituency}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            >
              {assemblyConstituency.map((option) => (
                <MenuItem
                  key={option.AssemblyConstituencyId}
                  value={option.AssemblyConstituencyId}
                >
                  {option.ConstituencyName}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={6}>
            <TextField
              select
              label="Council Constituency"
              name="loksabhaConstituency"
              value={formData.loksabhaConstituency}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            >
              {/* Add your council constituency options here */}
              {loksabhaConstituency.map((option) => (
                <MenuItem
                  key={option.LoksabhaConstituencyId}
                  value={option.LoksabhaConstituencyId}
                >
                  {option.ConstituencyName}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
          </Grid>
          </Box>
          
          <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Is Permanent Address Same As Current Address?</FormLabel>
              <RadioGroup
                row
                name="isPermanentSame"
                value={formData.isPermanentSame}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio style={{ color: 'black' }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio style={{ color: 'black' }} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>


  {formData.isPermanentSame === 'no' && (
            <Box border={1} borderColor="black" p={2} borderRadius={2}>
            <Typography
              variant="h5"
              color="primary"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              Permanent Address Details
            </Typography>

            <Grid container spacing={2}>
  <Grid item xs={6}>
    <TextField
      label="Address"
      name="paddress"
      value={formData.paddress}
      onChange={handleChange}
      fullWidth
      margin="normal"
      InputProps={{ style: { borderColor: "black" } }}
      required
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      select
      label="District"
      name="pdistrict"
      value={formData.pdistrict}
      onChange={handleChange}
      fullWidth
      margin="normal"
      InputProps={{ style: { borderColor: "black" } }}
      required
    >
      {pdistricts.map((option) => (
        <MenuItem key={option.districtID} value={option.districtID}>
          {option.districtName}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
</Grid>

            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Is City/Village?</FormLabel>
              <RadioGroup
                row
                name="pareaType"
                value={formData.pareaType}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="URBAN"
                  control={<Radio style={{ color: "black" }} />}
                  label="City"
                />
                <FormControlLabel
                  value="RURAL"
                  control={<Radio style={{ color: "black" }} />}
                  label="Village"
                />
              </RadioGroup>
            </FormControl>

            {formData.pareaType === "URBAN" && (
               <Grid container spacing={2}>
    <Grid item xs={6}>
                <TextField
                  select
                  label="ULB"
                  name="pulb"
                  value={formData.pulb}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                  required
                >
                  {pfilteredUlbs.map((option) => (
                    <MenuItem key={option.pklUlbId} value={option.pklUlbId}>
                      {option.vsUlbName}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>
                <Grid item xs={6}>
                <TextField
                  label="City Name"
                  name="pcity"
                  value={formData.pcity}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                  required
                />
                </Grid>
                </Grid>
            )}

            {formData.pareaType === "RURAL" && (
                 <Grid container spacing={2}>
    <Grid item xs={6}>
                <TextField
                  select
                  label="Block"
                  name="pblock"
                  value={formData.pblock}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                  required
                >
                  {pfilteredblocks.map((option) => (
                    <MenuItem
                      key={option.pklTalukaId}
                      value={option.pklTalukaId}
                    >
                      {option.vsTalukaName}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>
                <Grid item xs={6}>
                <TextField
                  label="Village Name"
                  name="pcity"
                  value={formData.pcity}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { borderColor: "black" } }}
                  required
                />
                </Grid>
                </Grid>
            )}


   <Grid container spacing={2}>
    <Grid item xs={4}>
            <TextField
              label="Pin Code"
              name="pPIN"
              value={formData.pPIN}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              inputProps={{ maxLength: 6 }}
              required
            />
 </Grid>
 <Grid item xs={4}>
            <TextField
              label="Post Office"
              name="ppostoffice"
              value={formData.ppostoffice}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            />
</Grid>
<Grid item xs={4}>
            <TextField
              label="Police Station"
              name="ppoliceStation"
              value={formData.ppoliceStation}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            />
</Grid>
</Grid>

<Grid container spacing={2}>
    <Grid item xs={6}>
            <TextField
              select
              label="Assembly Constituency"
              name="passemblyConstituency"
              value={formData.passemblyConstituency}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            >
              {assemblyConstituency.map((option) => (
                <MenuItem
                  key={option.AssemblyConstituencyId}
                  value={option.AssemblyConstituencyId}
                >
                  {option.ConstituencyName}
                </MenuItem>
              ))}
            </TextField>
            </Grid>

            <Grid item xs={6}>
            <TextField
              select
              label="Council Constituency"
              name="ploksabhaConstituency"
              value={formData.ploksabhaConstituency}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderColor: "black" } }}
              required
            >
              {/* Add your council constituency options here */}
              {loksabhaConstituency.map((option) => (
                <MenuItem
                  key={option.LoksabhaConstituencyId}
                  value={option.LoksabhaConstituencyId}
                >
                  {option.ConstituencyName}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            </Grid>
          </Box>
  )}

        </Grid>
      </Grid>
    </Container>
  );
};

export default AddressDetails;
