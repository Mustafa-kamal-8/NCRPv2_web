import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  // Checkbox,
  // Divider,
  // FormControl,
  // FormControlLabel,
  // FormGroup,
  IconButton,
  InputAdornment,
  // Radio,
  // RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "./useDebounce";
import useFilters from "../../hooks/useFilters";
import { useRecoilState } from "recoil";
import { districtState, qualificationState } from "../../states/atoms";

type Props = {
  setFilters: React.Dispatch<any>;
  // onDistrictChange: (district: string) => void;
  // isDistrictSelected: boolean;
  // sendMessageToParent: (value: boolean) => void;
};

export default function CourseFilters({
  setFilters,
}: // isDistrictSelected,
// sendMessageToParent,
Props) {
  const [selectedDistrict, setSelectedDistrict] = useRecoilState(districtState);

  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const [selectedQUalification, setSelectedQualification] =
    useRecoilState(qualificationState);

  const { isLoading, data } = useFilters();
  const districtSelctedFunction = () => {
    if (selectedDistrict != null) {
      const booleanValue = true;
      console.log("District Selected", booleanValue);
    } else {
      const booleanValue = false;
      console.log("District not selected", booleanValue);
    }
  };
console.log("dt",data);

  if (selectedDistrict != null) {
    districtSelctedFunction();
  } else {
    districtSelctedFunction();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  function formatResultObject() {
    const result = {
      courseLevel: [] as any,
      courseMode: [] as any,
      totalHours: [] as any,
      searchCriteria: value,
      // residential:
      //   trainingType === "" ? "" : trainingType === "residential" ? 1 : 0,
    };

    setFilters(result);
  }

  useEffect(() => {
    formatResultObject();
  }, [debouncedValue]);

  return (
    <>
      <Typography fontWeight={700} pt={3} px={3}>
        Filter Courses
      </Typography>

      {/* Search District */}
      <Box p={2} px={3}>
        {isLoading ? (
          <p>loading</p>
        ) : (
          <Autocomplete
            value={selectedDistrict}
            isOptionEqualToValue={(option, value) =>
              option.districtID === value.districtID
            }
            onChange={(_, newValue) => {
              setSelectedDistrict(newValue!);
              districtSelctedFunction();
            }}
            disablePortal
            id="combo-box-demo"
            options={data?.district!}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option?.districtName}
            renderInput={(params) => (
              <TextField {...params} label="Select District" size="small" />
            )}
          />
        )}
      </Box>

      {/* Selelct Qualification */}
      <Box p={2} px={3}>
        {isLoading ? (
          <p>loading..</p>
        ) : (
          <Autocomplete
            value={selectedQUalification}
            onChange={(_event, newValue) => {
              setSelectedQualification(newValue!);
            }}
            disablePortal
            id="combo-box-demo"
            options={data?.qualification!}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.qualificationName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Qualification"
                size="small"
              />
            )}
          />
        )}
      </Box>

      {/* Search Course */}
      <Box px={3} py={2}>
        <Typography
          fontWeight={500}
          color="primary.main"
          gutterBottom
          variant="body2"
        >
          Search Course
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          helperText="Search by course name only"
          type="search"
          value={value}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
}
