import { Typography, Popover, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useCourseWithDistricts from "../../hooks/useCourseWithDistricts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import {
  Avatar,
  Stack,
  Container,
  Box,
  Divider,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EditPreferencesLayout from "../../layouts/edit-preference-layout";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useState } from "react";
import { fetchCourseWithDistricts } from "../../api/courses-api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../data/constants";
import { Grid } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { editCourse } from "../../api/courses-api";
import { getCandidateCourses } from "../../api/candidate-api";

interface CookieData {
  courseId: number;
  courseName: string;
  preferred_district1: number;
  preferred_district2: number;
  preferred_district3: number;
  priorityLevel: number;
  hostelPreference: number;
  employementPreference: number;
}

export default function EditPreferencesFromDatabase() {
  const params = useParams();
  const [radioButtonValue, setRadiobuttonValue] = useState(params.employment);

  const hostelAccomod = params.hostelAccomodations == 1 ? true : false;

  console.log("hostel Accomod", hostelAccomod);

  const [isHostelAccommodationChecked, setHostelAccommodationChecked] =
    useState(hostelAccomod);

  console.log("These are the param values", params);

  const handleHostelCheckboxChange = (event) => {
    setHostelAccommodationChecked(event.target.checked);
  };

  console.log("This is hostel checkbox value", isHostelAccommodationChecked);

  const handleRadiobuttonValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRadiobuttonValue((event.target as HTMLInputElement).value);
  };
  const navigate = useNavigate();

  const candidateId = localStorage.getItem("candidateId");

  const [cookieData, setCookieData] = useState<CookieData[]>([]);
  const [selectedPriorityCheckboxes, setSelectedPriorityCheckboxes] = useState(
    []
  );
  const [selectedPlacementCheckboxes, setSelectedPlacementCheckboxes] =
    useState([]);
  const [selectedCheckboxValues, setSelectedCheckboxValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRadioButtonValue, setSelectedRadioButtonValue] = useState("");

  const [selectedDistrict1, setSelectedDistrict1] = useState(params.district1);
  const [selectedDistrict2, setSelectedDistrict2] = useState(params.district2);
  const [selectedDistrict3, setSelectedDistrict3] = useState(params.district3);
  const [selectedDistrict1Id, setSelectedDistrict1Id] = useState(
    params.district1Id
  );
  const [selectedDistrict2Id, setSelectedDistrict2Id] = useState(
    params.district2Id
  );
  const [selectedDistrict3Id, setSelectedDistrict3Id] = useState(
    params.district3Id
  );

  const [selectDistrict1Name, setSelectedDistrict1Name] = useState("");
  const [selectDistrict2Name, setSelectedDistrict2Name] = useState("");
  const [selectDistrict3Name, setSelectedDistrict3Name] = useState("");

  const [selectedPriorityValue, setSelectedPriorityValue] = useState(
    params.priority
  );

  const {
    mutate: mutateEditCourse,
    data: editCourseData,
    isLoading: editCourseLoading,
  } = useMutation({
    mutationFn: editCourse,
    onSuccess(data: any) {
      navigate("/my-courses");
      // if (data.status == "error") {
      //   enqueueSnackbar(data.message, {
      //     variant: "error",
      //     anchorOrigin: {
      //       vertical: "top",
      //       horizontal: "right",
      //     },
      //   });
      // } else {
      //   enqueueSnackbar(data.message, {
      //     variant: "success",
      //     anchorOrigin: {
      //       vertical: "top",
      //       horizontal: "right",
      //     },
      //   });
      // }
    },
  });

  const { data: priorityLevelData } = useQuery({
    queryFn: () => getCandidateCourses(candidateId!),
    queryKey: ["priority_level_data"],
    onSuccess(data: any) {},
  });

  const handleRadioButtonChange = (event) => {
    setSelectedRadioButtonValue(event.target.value);
  };
  const handleDistrict1Change = (event) => {
    setSelectedDistrict1(event.target.value);
    // console.log("This is the Dist 1", selectedDistrict1);
  };

  const district1SelctedFunction = () => {
    if (selectedDistrict1 != null) {
      const booleanValue = true;
      console.log("District Selected", booleanValue);
    } else {
      const booleanValue = false;
      console.log("District not selected", booleanValue);
    }
  };

  if (selectedDistrict1 != null) {
    district1SelctedFunction();
  } else {
    district1SelctedFunction();
  }
  const handlePriorityCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedPriorityCheckboxes((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If the checkbox was already selected, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // If the checkbox was not selected, add it
        return [...prevSelected, value];
      }
    });
  };

  const handlePlacementCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedPlacementCheckboxes((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If the checkbox was already selected, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // If the checkbox was not selected, add it
        return [...prevSelected, value];
      }
    });
  };

  function checkIfExists(myArray, myValue) {
    for (const item of myArray) {
      if (item.priorityLevel !== undefined && item.priorityLevel !== null) {
        if (item.priorityLevel === myValue) {
          console.log("The value already exists in the array");
          return;
        }
      }
      console.log("The value does not exists in the Array");
    }
  }

  const handleSelectPriorityChange = (event) => {
    setSelectedPriorityValue(event.target.value);
  };

  function setCookie(name: string, value: any, time: any) {
    let d = new Date();
    d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000);

    let expires = "expires=" + d.toUTCString();

    // document.cookie = `${name}=${value}; ${expires}; path=/`;
    document.cookie = `${name}=${value}; ${expires}; SameSite=None; Secure; path=/`;
  }

  const handleDistrict2Change = (event) => {
    let selectedDist2 = event.target.value;
    setSelectedDistrict2(event.target.value);
    console.log("This the selected district 2", selectedDist2);

    // onDistrict2Change(selectedValue);
  };
  const handleDistrict3Change = (event) => {
    let selectedDist3 = event.target.value;
    setSelectedDistrict3(event.target.value);
    console.log("This the selected district 3", selectedDist3);
    // onDistrict3Change(selectedValue);
  };

  console.log(
    "These are the priority level data",
    priorityLevelData?.priorityLevel
  );

  console.log("These are the params", params);

  const priorityLevels = priorityLevelData?.priorityLevel?.map(
    (item: any) => item.priorityLevel
  );

  // Generate an array of numbers from 1 to 5 excluding the priorityLevels
  const numbersNotInPriorityLevels = Array.from(
    { length: 5 },
    (_, index) => index + 1
  ).filter((number) => !priorityLevels?.includes(number));

  useEffect(() => {
    function scrollWindowUp() {
      const scrollStep = -30;
      const scrollInterval = 5;

      const scrollIntervalId = setInterval(() => {
        if (window.scrollY === 0) {
          clearInterval(scrollIntervalId);
        } else {
          window.scrollBy(0, scrollStep);
        }
      }, scrollInterval);
    }

    scrollWindowUp();
  }, []);

  useEffect(() => {
    // This will run every time selectedDist1 changes

    console.log("This is the Dist 1", selectedDistrict1);
    console.log("This is the Dist 2", selectedDistrict2);
    console.log("This is the Dist 3", selectedDistrict3);
    console.log("These is the Radiobutton value", radioButtonValue);

    console.log(
      "This is the selected Radio button value",
      selectedRadioButtonValue
    );
    console.log("This is the selected Priority value", selectedPriorityValue);
    console.log(
      "This is the checked priority value",
      selectedPriorityCheckboxes
    );
  }, [
    selectedDistrict1,
    selectedDistrict2,
    selectedDistrict3,
    selectedRadioButtonValue,
    selectedPriorityValue,
    selectedPriorityCheckboxes,
    selectedPlacementCheckboxes,
    radioButtonValue,
  ]);

  const [hostelPreferenceOpen, setHostelPreferenceOpen] = useState(null);

  const handleHostelPreferencesePopoverOpen = (event) => {
    setHostelPreferenceOpen(event.currentTarget);
  };

  const handleHostelPreferencesePopoverClose = () => {
    setHostelPreferenceOpen(null);
  };

  const hostelPrefOpen = Boolean(hostelPreferenceOpen);

  const { isLoading, data, mutate } = useMutation({
    mutationFn: fetchCourseWithDistricts,
    onSuccess() {
      console.log("Data successfully loaded");
    },
    onError(error: AxiosError) {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    },
  });

  // console.log("These are the data", data?.data);
  // console.log("These are the districts data", data?.data[0].districts);

  useEffect(() => {
    mutate(params?.courseId!);
    // mutate("48");
  }, []);

  return (
    <>
      <EditPreferencesLayout
        description={`Select your Preferred Districts where ${params?.courseName} Course is Available`}
        subTitle="Select Priority level for this course"
        title="Select Your Preferences for"
        courseName={params?.courseName}
      >
        <Stack pb={3} alignItems={"flex-start"}>
          <Button
            onClick={() => {
              navigate(ROUTE_PATHS.MYCOURSES);
            }}
            startIcon={<ArrowBackIcon />}
            size="small"
          >
            Back to My Courses
          </Button>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "1px 6px 10px rgba(0, 0, 0, 0.1)",
                },
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardActions></CardActions>
              <CardContent>
                <Stack direction="column" spacing={3}>
                  <Stack direction="row" spacing={1}>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontStyle="italic"
                    >
                      Course Priority Level:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="InfoText"
                      fontStyle="italic"
                    >
                      {params?.priority !== null && params?.priority !== "null"
                        ? params?.priority
                        : "not selected"}
                    </Typography>
                  </Stack>

                  <Stack direction="column">
                    <Typography
                      variant="body2"
                      // color="text.secondary"
                      color="primary"
                      fontStyle="italic"
                    >
                      Set/Change Course Priority Level:
                    </Typography>
                    {numbersNotInPriorityLevels.length == 0 ? (
                      <>
                        <Select
                          disabled
                          value={selectedPriorityValue}
                          onChange={handleSelectPriorityChange}
                          variant="outlined"
                          sx={{ width: "20%", marginTop: 1, marginLeft: 2 }}
                          // defaultValue={params.priority}
                        >
                          {numbersNotInPriorityLevels.map((number) => (
                            <MenuItem key={number} value={number}>
                              {number}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText sx={{ color: "red" }}>
                          *All Priorities are set to the other Added Courses in
                          your Basket
                        </FormHelperText>
                      </>
                    ) : (
                      <>
                        <Select
                          value={selectedPriorityValue}
                          onChange={handleSelectPriorityChange}
                          variant="outlined"
                          displayEmpty
                          sx={{ width: "20%", marginTop: 1, marginLeft: 2 }}
                          // defaultValue={params.priority}
                          inputProps={{ "aria-label": "Priority" }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {numbersNotInPriorityLevels.map((number) => (
                            <MenuItem key={number} value={number}>
                              {number}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          *Maximum Priority levels can be set to 5
                        </FormHelperText>
                      </>
                    )}
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3}>
                  {" "}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        }}
                      >
                        <LocationOnIcon fontSize="small" />
                        Preferred District 1:
                      </Typography>
                      <Select
                        displayEmpty
                        value={selectedDistrict1}
                        onChange={handleDistrict1Change}
                        variant="outlined"
                        sx={{ width: "100%", marginTop: 1, height: "50%" }}
                      >
                        <MenuItem value="not selected">
                          <em>None</em>
                        </MenuItem>
                        {data?.data[0].districts.map((district: any) => (
                          <MenuItem
                            key={district.districtId}
                            value={district.districtName}
                            onClick={() => {
                              setSelectedDistrict1Id(district.districtId);
                            }}
                          >
                            {district.districtName}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        }}
                      >
                        <LocationOnIcon fontSize="small" />
                        Preferred District 2:
                      </Typography>
                      <Select
                        displayEmpty
                        value={selectedDistrict2}
                        onChange={handleDistrict2Change}
                        variant="outlined"
                        sx={{ width: "100%", marginTop: 1 }}
                      >
                        <MenuItem value="not selected">
                          <em>None</em>
                        </MenuItem>
                        {data?.data[0].districts.map((district: any) => (
                          <MenuItem
                            key={district.districtId}
                            value={district.districtName}
                            onClick={() =>
                              setSelectedDistrict2Id(district.districtId)
                            }
                          >
                            {district.districtName}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        }}
                      >
                        <LocationOnIcon fontSize="small" />
                        Preferred District 3:
                      </Typography>
                      <Select
                        displayEmpty
                        value={selectedDistrict3}
                        onChange={handleDistrict3Change}
                        variant="outlined"
                        sx={{ width: "100%", marginTop: 1 }}
                      >
                        <MenuItem value="not selected">
                          <em>None</em>
                        </MenuItem>
                        {data?.data[0].districts.map((district: any) => (
                          <MenuItem
                            key={district.districtId}
                            value={district.districtName}
                            onClick={() =>
                              setSelectedDistrict3Id(district.districtId)
                            }
                          >
                            {district.districtName}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Stack>
                <Stack pb={3}></Stack>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    padding: "16px",
                    borderRadius: "8px",
                  }}
                  onMouseEnter={handleHostelPreferencesePopoverOpen}
                  onMouseLeave={handleHostelPreferencesePopoverClose}
                >
                  <Typography
                    variant="subtitle2"
                    component="div"
                    color="primary"
                  >
                    Hostel Accomodations Preference
                  </Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={selectedPriorityCheckboxes === "1"}
                            // checked={selectedCheckboxes.includes("1")}
                            // checked={selectedPriorityCheck}
                            // checked={defaultCheckedValue}
                            // onChange={handlePriorityCheckboxChange}
                            checked={isHostelAccommodationChecked}
                            onChange={handleHostelCheckboxChange}
                            value="1"
                          />
                        }
                        label="I prefer Hostel Accomodations"
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
                <Popover
                  open={open}
                  anchorEl={hostelPreferenceOpen}
                  onClose={handleHostelPreferencesePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    Tiny message near the cursor!
                  </Typography>
                </Popover>
                <Stack pb={3}></Stack>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    padding: "16px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    component="div"
                    color="primary"
                  >
                    Employment or Placement Preference
                  </Typography>
                  <FormControl variant="standard">
                    <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={radioButtonValue}
                      onChange={handleRadiobuttonValueChange}
                    >
                      <Stack direction="row">
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="I prefer Self Employement"
                        />
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="I prefer Placement"
                        />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Box>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 1 }}>
                {candidateId ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      //   mutate({
                      //     courseId: courseId.toString(),
                      //     districtId: districtId.toString(),
                      //   })

                      console.log("hello this is onClick");

                      console.log(
                        "This is selected District 1",
                        selectDistrict1Name
                      );
                      console.log(
                        "This is selected District 2",
                        selectDistrict2Name
                      );
                      console.log(
                        "This is selected District 3",
                        selectDistrict3Name
                      );

                      console.log(
                        "These is the courseId added to basket",
                        data?.data[0].courseId
                      );

                      console.log("District 1 preference", selectedDistrict1);
                      console.log("District 2 preference", selectedDistrict2);
                      console.log("District 3 preference", selectedDistrict3);
                      console.log(
                        "This is the selected Radio button value",
                        selectedRadioButtonValue
                      );
                      console.log(
                        "these are the initial cookies",
                        document.cookie
                      );

                      function checkArray(array: any) {
                        return array.length == 0 ? 0 : 1;
                      }
                      // const hostelPreference = checkArray(
                      //   selectedPriorityCheckboxes
                      // );

                      const hostelPreference =
                        isHostelAccommodationChecked == true ? 1 : 0;
                      const employementPreference = radioButtonValue;

                      console.log(
                        "This is the preferred District 1",
                        selectedDistrict1
                      );

                      const convertToNull = (value: any) =>
                        value === "null" ? null : value;

                      console.log(
                        "Selected DISTRICT 1",
                        selectedDistrict1,
                        convertToNull(selectedDistrict1)
                      );

                      const courseDataToBasket = {
                        candidateId: candidateId,
                        courseId: data?.data[0].courseId,
                        preferred_district1Id:
                          convertToNull(selectedDistrict1Id), // District id
                        preferred_district2Id:
                          convertToNull(selectedDistrict2Id),
                        preferred_district3Id:
                          convertToNull(selectedDistrict3Id),
                        priorityLevel: convertToNull(selectedPriorityValue),
                        hostelPreference: convertToNull(hostelPreference),
                        selfEmploy: convertToNull(employementPreference),
                      };

                      console.log(
                        "These are data to be sent to database",
                        courseDataToBasket
                      );

                      mutateEditCourse(courseDataToBasket);
                    }}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => {
                      //   mutate({
                      //     courseId: courseId.toString(),
                      //     districtId: districtId.toString(),
                      //   })

                      console.log("hello this is onClick");

                      console.log(
                        "This is selected District 1",
                        selectDistrict1Name
                      );
                      console.log(
                        "This is selected District 2",
                        selectDistrict2Name
                      );
                      console.log(
                        "This is selected District 3",
                        selectDistrict3Name
                      );

                      console.log(
                        "These is the courseId added to basket",
                        data?.data[0].courseId
                      );

                      console.log("District 1 preference", selectedDistrict1);
                      console.log("District 2 preference", selectedDistrict2);
                      console.log("District 3 preference", selectedDistrict3);
                      console.log(
                        "This is the selected Radio button value",
                        selectedRadioButtonValue
                      );
                      console.log(
                        "these are the initial cookies",
                        document.cookie
                      );

                      function checkArray(array: any) {
                        return array.length == 0 ? 0 : 1;
                      }
                      const hostelPreference = checkArray(
                        selectedPriorityCheckboxes
                      );
                      const employementPreference = checkArray(
                        selectedPlacementCheckboxes
                      );

                      console.log(
                        "This is the preferred District 1",
                        selectedDistrict1
                      );
                      function getCookie(name: string): string | null {
                        const cookies = document.cookie.split(";");
                        for (let i = 0; i < cookies.length; i++) {
                          const cookie = cookies[i].trim();
                          if (cookie.startsWith(name + "=")) {
                            return cookie.substring(name.length + 1);
                          }
                        }
                        return null;
                      }

                      // Example usage
                      const cookieValue = getCookie(
                        `#${params.courseId}Course`
                      );

                      if (cookieValue !== null) {
                        console.log(`Cookie value: ${cookieValue}`);
                      } else {
                        console.log("Cookie not found");
                      }

                      let cookies = document.cookie.split(";");
                      let values = cookies.map(
                        (cookie) => cookie.trim().split("=")[1]
                      );
                      console.log(
                        "These are the cookie values from my-courses page",
                        values
                      );
                      console.log(
                        "This is the length of the cookie array",
                        values.length
                      );

                      const addToBasket = values.map((cookieValue) => {
                        const [
                          candidateId,
                          courseId,
                          courseName,
                          preferred_district1,
                          preferred_district2,
                          preferred_district3,
                          preferred_district1Id,
                          preferred_district2Id,
                          preferred_district3Id,
                          priorityLevel,
                          hostelPreference,
                          employementPreference,
                        ] = cookieValue.split(",");

                        return {
                          courseId,
                          courseName,
                          preferred_district1,
                          preferred_district2,
                          preferred_district3,
                          preferred_district1Id,
                          preferred_district2Id,
                          preferred_district3Id,
                          priorityLevel,
                          hostelPreference,
                          employementPreference,
                        };
                      });

                      const priorityLevel = 0;

                      if (priorityLevel != 0) {
                        alert(
                          "This Priority Level is set to another course in your Basket, Please check your Basket"
                        );
                      } else {
                        setCookie(
                          `#${params.courseId}Course`,
                          // courseId, PreferredDistrict1Name, PreferredDistrict2Name, PreferredDistrict3Name, PreferredDistrict1Id, PreferredDistrict2Id, PreferredDistrict3Id, priorityLevel, hostelPreference, PlacementPreference
                          `${params.courseId!},${params.courseName!},${selectedDistrict1},${selectedDistrict2},${selectedDistrict3},${selectedDistrict1Id},${selectedDistrict2Id},${selectedDistrict3Id},${selectedPriorityValue},${hostelPreference},${employementPreference}`,
                          1000
                        );
                      }

                      const convertToNull = (value: any) =>
                        value === "null" ? null : value;

                      const courseDataToBasket = {
                        candidateId: candidateId,
                        courseId: data?.data[0].courseId,
                        preferred_district1Id:
                          convertToNull(selectedDistrict1Id),
                        preferred_district2Id:
                          convertToNull(selectedDistrict2Id),
                        preferred_district3Id:
                          convertToNull(selectedDistrict3Id),
                        priorityLevel: convertToNull(selectedPriorityValue),
                        hostelPreference: convertToNull(hostelPreference),
                        selfEmploy: convertToNull(employementPreference),
                      };

                      console.log(
                        "These are data to be sent to database",
                        courseDataToBasket
                      );

                      navigate("/my-courses");

                      // getAllCookies();
                    }}
                  >
                    Save Changes
                  </Button>
                )}

                {/* <Button
                  onClick={() => {
                    getAllCookies();

                    let cookies = document.cookie.split(";");
                    let values = cookies.map(
                      (cookie) => cookie.trim().split("=")[1]
                    );
                    console.log(
                      "These are the cookie values from my-courses page",
                      values
                    );
                    console.log(
                      "This is the length of the cookie array",
                      values.length
                    ); // make dropdown values based on priority levels

                    // const addToBasket = values.map((cookieValue) => {
                    //   const [
                    //     courseId,
                    //     courseName,
                    //     preferred_district1,
                    //     preferred_district2,
                    //     preferred_district3,
                    //     priorityLevel,
                    //     hostelPreference,
                    //     employementPreference,
                    //   ] = cookieValue.split(",");

                    //   return {
                    //     courseId,
                    //     courseName,
                    //     preferred_district1,
                    //     preferred_district2,
                    //     preferred_district3,
                    //     priorityLevel,
                    //     hostelPreference,
                    //     employementPreference,
                    //   };
                    // });

                    // console.log(
                    //   " This is to be send to the database ",
                    //   addToBasket
                    // );

                    console.log("Priority", selectedPriorityCheckboxes);
                    console.log("Placement", selectedPlacementCheckboxes);

                    function checkArray(array: any) {
                      return array.length == 0 ? 0 : 1;
                    }

                    console.log(
                      "Placement Array check",
                      checkArray(selectedPlacementCheckboxes)
                    );
                    console.log(
                      "Priority Array check",
                      checkArray(selectedPriorityCheckboxes)
                    );
                  }}
                >
                  Get Cookie values
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </EditPreferencesLayout>
    </>
  );
}
