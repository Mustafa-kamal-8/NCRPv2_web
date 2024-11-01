import { useState } from "react";
import {
  Container,
  Stack,
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useFilters from "../hooks/useFilters";

const PlacementPreference = ({ handleNext, formData, setFormData }) => {
  const { isLoading: filterLoading, data: filterData } = useFilters();
  const [showDistrictForm, setShowDistrictForm] = useState(false);
  const [showStateForm, setShowStateForm] = useState(false);
  const [showCountryForm, setShowCountryForm] = useState(false);

  console.log("filder data----->", filterData)

  const handleDistrictChange = (event: any) => {
    setShowDistrictForm(event.target.value === "1");
  };

  const handleStateChange = (event: any) => {
    setShowStateForm(event.target.value === "1");
  };

  const handleCountryChange = (event: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      placementPreference: {
        ...prevData.placementPreference,
        country: event.target.value,
      },
    }));
  };
  return (
    <Container>
      <Stack pt={ 2 }>
        <Typography variant="h5" color="primary" sx={ { fontWeight: "bold" } }>
          Placement Preference
        </Typography>

        {/* Willingness to go outside District */ }
        <FormControl component="fieldset" margin="normal">
          <RadioGroup row onChange={ handleDistrictChange }>
            <Typography variant="h6" sx={ { margin: "10px" } }>
              Are you willing to go outside District for employment?
            </Typography>
            <FormControlLabel value="1" control={ <Radio /> } label="Yes" />
            <FormControlLabel value="0" control={ <Radio /> } label="No" />
          </RadioGroup>
        </FormControl>

        { showDistrictForm && (
          <Box
            sx={ {
              margin: "16px 0",
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            } }
          >
            <Stack direction="row" spacing={ 3 } pt={ 3 }>
              {/* Preferred District 1 */ }
              <FormControl fullWidth margin="normal">
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  <LocationOnIcon fontSize="small" />
                  Preferred District 1:
                </Typography>
                <Select
                  value={ formData.placementPreference.district1 || "" }
                  onChange={ (e) => {
                    const selectedDistrict = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      placementPreference: {
                        ...prevData.placementPreference,
                        district1: selectedDistrict,
                      },
                    }));
                  } }
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  { filterData?.district?.map((district) => (
                    <MenuItem key={ district.districtID } value={ district.districtID }>
                      { district.districtName }
                    </MenuItem>
                  )) }
                </Select>

              </FormControl>

              {/* Preferred District 2 */ }
              <FormControl fullWidth margin="normal">
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  <LocationOnIcon fontSize="small" />
                  Preferred District 2:
                </Typography>
                <Select
                  value={ formData?.placementPreference?.district2 || "" }
                  onChange={ (e) => {
                    const selectedDistrict = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      placementPreference: {
                        ...prevData.placementPreference,
                        district2: selectedDistrict,
                      },
                    }));
                  } }
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    filterData?.district?.map((district) => (
                      <MenuItem key={ district.districtID } value={ district.districtID }>
                        { district.districtName }
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              {/* Preferred District 3 */ }
              <FormControl fullWidth margin="normal">
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  <LocationOnIcon fontSize="small" />
                  Preferred District 3:
                </Typography>
                <Select
                  value={ formData?.placementPreference?.district3 || "" }
                  onChange={ (e) => {
                    const selectedDistrict = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      placementPreference: {
                        ...prevData.placementPreference,
                        district3: selectedDistrict,
                      },
                    }));
                  } }
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  { filterData?.district?.map((district) => (
                    <MenuItem key={ district.districtID } value={ district.districtID }>
                      { district.districtName }
                    </MenuItem>
                  )) }
                </Select>
              </FormControl>
            </Stack>
          </Box>
        )
        }

        {/* Willingness to go outside State */ }
        {
          showDistrictForm && (
            <FormControl component="fieldset" margin="normal">
              <RadioGroup row onChange={ handleStateChange }>
                <Typography variant="h6" sx={ { margin: "10px" } }>
                  Are you willing to go outside State for employment?
                </Typography>
                <FormControlLabel value="1" control={ <Radio /> } label="Yes" />
                <FormControlLabel value="0" control={ <Radio /> } label="No" />
              </RadioGroup>
            </FormControl>
          )
        }

        {
          showStateForm && (
            <Box
              sx={ {
                margin: "16px 0",
                padding: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              } }
            >
              <Stack direction="row" spacing={ 3 } pt={ 3 }>
                {/* Preferred State 1 */ }
                <FormControl fullWidth margin="normal">
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    <LocationOnIcon fontSize="small" />
                    Preferred State 1:
                  </Typography>
                  <Select
                    value={ formData?.placementPreference?.state1 || "" }
                    onChange={ (e) => {
                      const selectedState = e.target.value;
                      setFormData((prevData: any) => ({
                        ...prevData,
                        placementPreference: {
                          ...prevData.placementPreference,
                          state1: selectedState,
                        },
                      }));
                    } }
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    { filterData?.state?.map((state) => (
                      <MenuItem key={ state.stateId } value={ state.stateId }>
                        { state.stateName }
                      </MenuItem>
                    )) }
                  </Select>
                </FormControl>

                {/* Preferred State 2 */ }
                <FormControl fullWidth margin="normal">
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    <LocationOnIcon fontSize="small" />
                    Preferred State 2:
                  </Typography>
                  <Select
                    value={ formData?.placementPreference?.state2 || "" }
                    onChange={ (e) => {
                      const selectedState = e.target.value;
                      setFormData((prevData: any) => ({
                        ...prevData,
                        placementPreference: {
                          ...prevData.placementPreference,
                          state2: selectedState,
                        },
                      }));
                    } }
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    { filterData?.state?.map((state) => (
                      <MenuItem key={ state.stateId } value={ state.stateId }>
                        { state.stateName }
                      </MenuItem>
                    )) }
                  </Select>
                </FormControl>

                {/* Preferred State 3 */ }
                <FormControl fullWidth margin="normal">
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    <LocationOnIcon fontSize="small" />
                    Preferred State 3:
                  </Typography>
                  <Select
                    value={ formData?.placementPreference?.state3 || "" }
                    onChange={ (e) => {
                      const selectedState = e.target.value;
                      setFormData((prevData: any) => ({
                        ...prevData,
                        placementPreference: {
                          ...prevData.placementPreference,
                          state3: selectedState,
                        },
                      }));
                    } }
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    { filterData?.state?.map((state) => (
                      <MenuItem key={ state.stateId } value={ state.stateId }>
                        { state.stateName }
                      </MenuItem>
                    )) }
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          )
        }

        {/* Willingness to go outside Country */ }
        {
          showStateForm && (
            <FormControl component="fieldset" margin="normal">
              <RadioGroup row onChange={ handleCountryChange }>
                <Typography variant="h6" sx={ { margin: "10px" } }>
                  Are you willing to go outside Country for employment?
                </Typography>
                <FormControlLabel value="1" control={ <Radio /> } label="Yes" />
                <FormControlLabel value="0" control={ <Radio /> } label="No" />
              </RadioGroup>
            </FormControl>
          )
        }
      </Stack >
    </Container >
  );
};

export default PlacementPreference;
