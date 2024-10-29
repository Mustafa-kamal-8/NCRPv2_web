import {
  Typography,
  TextField,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useCourseWithDistricts from "../../hooks/useCourseWithDistricts";
import { useQuery, useMutation } from "@tanstack/react-query";
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

export default function EditPreferences() {
  const params = useParams();

  const hostelAccomod = params.hostelAccomodations == 1 ? true : false;

  console.log("hostel Accomod", hostelAccomod);

  const [isHostelAccommodationChecked, setHostelAccommodationChecked] =
    useState(hostelAccomod);

  console.log("These are the param values", params);

  const handleHostelCheckboxChange = (event) => {
    setHostelAccommodationChecked(event.target.checked);
  };

  // console.log("these is the hostelAccomodations", params.hostelAccomodations);
  // console.log("these is the employment", params.employment);

  const [radioButtonValue, setRadiobuttonValue] = useState(params.employment);

  console.log("This is the radioButton value", radioButtonValue);

  // if (params.hostelAccomodations === "1") {
  //   setDefaultCheckedValue(true);
  // } else if (params.hostelAccomodations === "0") {
  //   setDefaultCheckedValue(false);
  // }

  const handleRadiobuttonValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRadiobuttonValue((event.target as HTMLInputElement).value);
  };

  const navigate = useNavigate();
  let cookies = document.cookie.split(";");
  let values = cookies.map((cookie) => cookie.trim().split("=")[1]);
  const numberOptions = Array.from(
    { length: values.length },
    (_, index) => index + 1
  );

  const candidateId = localStorage.getItem("candidateId");

  // const courseData = [
  //   {
  //     courseId: 3,
  //     courseLevel: "Advanced",
  //     courseMode: "Full Time",
  //     courseName: "EV Bike Driver",
  //     courseDescription: "This is an EV Bike Driver course",
  //     districts: [
  //       { districtId: 1, districtName: "Dibrugarh" },
  //       { districtId: 2, districtName: "Guwahati" },
  //       { districtId: 3, districtName: "Sivasagar" },
  //     ],
  //     experience: "",
  //     qualification: "High School/10th/Matric/Equivalent",
  //     qualificationId: 5,
  //     seatsAvailable: 500,
  //     totalHours: 30,
  //   },
  // ];

  // const districtss = [
  //   { districtId: 1, districtName: "Dibrugarh" },
  //   { districtId: 2, districtName: "Guwahati" },
  //   { districtId: 3, districtName: "Sivasagar" },
  // ];

  // const handleCheckboxChange = (event) => {
  //   const value = event.target.value;
  //   setSelectedCheckboxValues((prevValues) => {
  //     if (prevValues.includes(value)) {
  //       return prevValues.filter((v) => v !== value);
  //     } else {
  //       return [...prevValues, value];
  //     }
  //   });
  // };

  // const [selectedPriorityCheck, setSelectedPriorityCheck] = useState(params);
  const [cookieData, setCookieData] = useState<CookieData[]>([]);
  const [selectedPriorityCheckboxes, setSelectedPriorityCheckboxes] = useState(
    []
  );
  const [selectedPlacementCheckboxes, setSelectedPlacementCheckboxes] =
    useState([]);
  const [selectedCheckboxValues, setSelectedCheckboxValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [selectedRadioButtonValue, setSelectedRadioButtonValue] = useState("");

  const [selectedDistrict1, setSelectedDistrict1] = useState(params.district1);
  const [selectedDistrict2, setSelectedDistrict2] = useState(params.district2);
  const [selectedDistrict3, setSelectedDistrict3] = useState(params.district3);
  const [selectedDistrict1Id, setSelectedDistrict1Id] = useState(null);
  const [selectedDistrict2Id, setSelectedDistrict2Id] = useState(null);
  const [selectedDistrict3Id, setSelectedDistrict3Id] = useState(null);

  console.log("preferred district1----------------------->", params.district1)

  const [selectDistrict1Name, setSelectedDistrict1Name] = useState("");
  const [selectDistrict2Name, setSelectedDistrict2Name] = useState("");
  const [selectDistrict3Name, setSelectedDistrict3Name] = useState("");

  const handleHostelAccomodationsCheckboxChange = (event) => {
    setHostelAccomodationsChecked(event.target.checked);

    console.log(" This is the event target value ", event.target.value);
    console.log(
      " This is the event target checked value ",
      event.target.chekced
    );

    console.log("PARAM values", params);

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

  const [selectedPriorityValue, setSelectedPriorityValue] = useState(
    params.priority
  );

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

  const getAllCookies = () => {
    let cookies = document.cookie.split(";");
    let values = cookies.map((cookie) => cookie.trim().split("=")[1]);
    console.log("These are the cookie values from my-courses page", values);
    console.log("This is the length of the cookie array", values.length);

    const addToBasket = values.map((cookieValue) => {
      const [
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
    setCookieData(addToBasket);

    console.log(" These are the gathered cookies from useEffect ", addToBasket);
  };

  const {
    mutate: mutateEditCourse,
    data: editCourseData,
    isLoading: editCourseLoading,
  } = useMutation({
    mutationFn: editCourse,
    onSuccess(data: any) {
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
    onSuccess(data: any) { },
  });

  const handleRadioButtonChange = (event) => {
    setSelectedRadioButtonValue(event.target.value);
  };
  const handleDistrict1Change = (event: any) => {
    const selectedDist1 = event.target.value;
    console.log("This is the selected district 1:", selectedDist1);
  };

  const handleDistrict2Change = (event: any) => {
    const selectedDist2 = event.target.value;
    console.log("This is the selected district 2:", selectedDist2);
  };

  const handleDistrict3Change = (event: any) => {
    const selectedDist3 = event.target.value;
    console.log("This is the selected district 3:", selectedDist3);
  };

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
    let cookies = document.cookie.split(";");
    let values = cookies.map((cookie) => cookie.trim().split("=")[1]);
    console.log("These are the cookie values from my-courses page", values);
    console.log("This is the length of the cookie array", values.length);

    const addToBasket = values.map((cookieValue) => {
      const [
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
    if (checkIfExists(addToBasket, event.target.value)) {
      alert(
        "This Priority Level is set to another course in your Basket, Please check your Basket"
      );
    } else {
      setSelectedPriorityValue(event.target.value);
    }
  };

  function setCookie(name: string, value: any, time: any) {
    let d = new Date();
    d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000);

    let expires = "expires=" + d.toUTCString();

    // document.cookie = `${name}=${value}; ${expires}; path=/`;
    document.cookie = `${name}=${value}; ${expires}; SameSite=None; Secure; path=/`;
  }








  const districts = [{ districtId: 1, districtName: "Dibrugarh" }];

  console.log(
    "These are the priority level data",
    priorityLevelData?.priorityLevel
  );

  // const priorityLevels = priorityLevelData?.priorityLevel?.map(
  //   (item: any) => item.priorityLevel
  // );

  const getCourseDataFromCookies = (): string[] => {
    const cookies = document.cookie; // Get all cookies as a string
    console.log("Cookies:", cookies); // Log cookies for debugging

    const courseRegex = /#\d+Course=([^;]*)/g; // Regular expression to capture everything after `=` and before `;`
    let courseDataArray: string[] = [];
    let match;

    // Extract each course's data
    while ((match = courseRegex.exec(cookies)) !== null) {
      courseDataArray.push(match[1]); // Add the matched course data (1st group after `=`)
    }

    console.log("Extracted course data array:", courseDataArray); // Log the extracted data array for debugging
    return courseDataArray;
  };

  // Function to check missing values from the first 3 rows
  const getMissingPriorityLevels = (): number[] => {
    const courseDataArray = getCourseDataFromCookies(); // Fetch all course data from cookies
    const firstThreeRows = courseDataArray.slice(0, 3); // Get the first 3 rows (if present)
    const storedLevels: number[] = [];

    // Loop through the first 3 rows and check the value at index 8
    firstThreeRows.forEach((courseData, index) => {
      const courseArray = courseData.split(","); // Split the course data by commas

      console.log(`Course ${index + 1} data:`, courseArray); // Log course data to check the parsed result

      if (courseArray.length > 8) {
        const level = parseInt(courseArray[8], 10); // Get the value at index 8 and convert to a number

        console.log(`Level found at index 8 for Course ${index + 1}:`, level); // Log the value found at index 8

        if (!isNaN(level) && level >= 1 && level <= 3 && !storedLevels.includes(level)) {
          storedLevels.push(level); // If valid and not already added, store the level (1, 2, or 3)
        }
      } else {
        console.log(`Course ${index + 1} does not have enough data or no valid value at index 8.`);
      }
    });

    console.log("Stored levels from cookies:", storedLevels); // Log stored levels to verify

    // Now compare the stored levels with [1, 2, 3] and find the missing ones
    const possiblePriorityLevels = [1, 2, 3]; // All possible levels to check
    const missingLevels = possiblePriorityLevels.filter((level) => !storedLevels.includes(level)); // Find missing levels

    return missingLevels;
  };

  // Store the missing priority levels in a variable
  const priorityLevels = getMissingPriorityLevels();

  // Example: Logging the missing priority levels
  console.log("Missing Priority Levels:", priorityLevels);





  // Generate an array of numbers from 1 to 5 excluding the priorityLevels
  const numbersNotInPriorityLevels = Array.from(
    { length: 3 },
    (_, index) => index + 1
  ).filter((number) => priorityLevels?.includes(number));

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
    getAllCookies();
  }, []);

  useEffect(() => {
    // This will run every time selectedDist1 changes

    console.log("This is the Dist 1", selectedDistrict1);
    console.log("This is the Dist 2", selectedDistrict2);
    console.log("This is the Dist 3", selectedDistrict3);
    console.log("These is selected the Radiobutton values", radioButtonValue);

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

  console.log("these are the params", params.courseId);
  console.log("these is the district1 Id", params.district1);
  console.log("these is the district2 Id", params.district2);
  console.log("these is the distruct3 Id", params.district3);
  console.log("these is the hostelAccomodations", params.hostelAccomodations);
  console.log("these is the employment", params.employment);

  const courseId = params.courseId;
  const district1 = params.district1;
  const district2 = params.district2;
  const district3 = params.district3;
  const hostelAccomodations = params.hostelAccomodations;
  const employment = params.employment;

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

  console.log("these are the params", params);

  // console.log("These are the data", data?.data);
  // console.log("These are the districts data", data?.data[0].districts);

  useEffect(() => {
    mutate(params.courseId!);
    // mutate("48");
  }, []);

  // 1 self-employment
  // 0 placement

  return (
    <>
      <EditPreferencesLayout
        description={ `Select your Preferred Districts where ${params?.courseName} Course is Available` }
        subTitle=""
        title="Select Your Preferences for"
        courseName={ params?.courseName }
      >
        <Stack pb={ 3 } alignItems={ "flex-start" }>
          <Button
            onClick={ () => {
              navigate(ROUTE_PATHS.MYCOURSES);
            } }
            startIcon={ <ArrowBackIcon /> }
            size="small"
          >
            Back to My Courses
          </Button>
        </Stack>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 12 }>
            <Card
              variant="outlined"
              sx={ {
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
              } }
            >
              <CardContent>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignContent="center"
                ></Stack>
                <Typography
                  variant="body2"
                  // color="text.secondary"
                  color="primary"
                  fontStyle="italic"
                >
                  Course Priority Level:
                </Typography>
                <Select
                  value={ selectedPriorityValue }
                  onChange={ handleSelectPriorityChange }
                  variant="outlined"
                  sx={ { width: "20%", marginTop: 1, marginLeft: 2 } }
                // defaultValue={params.priority}
                >
                  { numbersNotInPriorityLevels.map((number) => (
                    <MenuItem key={ number } value={ number }>
                      { number }
                    </MenuItem>
                  )) }
                </Select>
                <Stack direction="row" spacing={ 3 }>
                  { " " }
                  <Grid container spacing={ 2 }>
                    <Grid item xs={ 4 }>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        <LocationOnIcon fontSize="small" />
                        Preferred District 1:
                      </Typography>
                      <Select
                        displayEmpty
                        value={ selectedDistrict1 }
                        onChange={ handleDistrict1Change }
                        variant="outlined"
                        sx={ { width: "100%", marginTop: 1, height: "50%" } }
                      >
                        <MenuItem value="not selected">
                          <em>None</em>
                        </MenuItem>
                        { data?.data[0].districts.map((district: any) => (
                          <MenuItem
                            key={ district.districtId }
                            value={ district.districtName }
                            onClick={ () => {
                              setSelectedDistrict1Id(district.districtId);
                            } }
                          >
                            { district.districtName }
                          </MenuItem>
                        )) }
                      </Select>
                    </Grid>
                    <Grid item xs={ 4 }>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        <LocationOnIcon fontSize="small" />
                        Preferred District 2:
                      </Typography>
                      <Select
                        displayEmpty
                        value={ selectedDistrict2 }
                        onChange={ (event) => {
                          const selectedDistrictName = event.target.value;
                          setSelectedDistrict2(selectedDistrictName);

                          // Find the selected district ID based on the district name
                          const selectedDistrict = data?.data[0].districts.find(
                            (district: any) => district.districtName === selectedDistrictName
                          );
                          if (selectedDistrict) {
                            setSelectedDistrict2Id(selectedDistrict.districtId);
                          }
                        } }
                        variant="outlined"
                        sx={ { width: "100%", marginTop: 1, height: "50%" } }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        { data?.data[0].districts.map((district: any) => (
                          <MenuItem
                            key={ district.districtId }
                            value={ district.districtName }
                          >
                            { district.districtName }
                          </MenuItem>
                        )) }
                      </Select>
                    </Grid>

                    <Grid item xs={ 4 }>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={ {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginTop: 2,
                        } }
                      >
                        <LocationOnIcon fontSize="small" />
                        Preferred District 3:
                      </Typography>
                      <Select
                        displayEmpty
                        value={ selectedDistrict3 }
                        onChange={ (event) => {
                          const selectedDistrictName = event.target.value;
                          setSelectedDistrict3(selectedDistrictName);

                          // Find the selected district ID based on the district name
                          const selectedDistrict = data?.data[0].districts.find(
                            (district: any) => district.districtName === selectedDistrictName
                          );
                          if (selectedDistrict) {
                            setSelectedDistrict3Id(selectedDistrict.districtId);
                          }
                        } }
                        variant="outlined"
                        sx={ { width: "100%", marginTop: 1, height: "50%" } }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        { data?.data[0].districts.map((district: any) => (
                          <MenuItem
                            key={ district.districtId }
                            value={ district.districtName }
                          >
                            { district.districtName }
                          </MenuItem>
                        )) }
                      </Select>
                    </Grid>

                  </Grid>
                </Stack>
                <Stack pb={ 3 }></Stack>
                <Box
                  sx={ {
                    border: "1px solid #ddd",
                    padding: "16px",
                    borderRadius: "8px",
                  } }
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
                            // defaultChecked={
                            //   params.hostelAccomodations == 1 ? true : false
                            // }
                            checked={ isHostelAccommodationChecked }
                            onChange={ handleHostelCheckboxChange }
                            value="1"
                          />
                        }
                        label="I want Hostel Accomodations"
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
                <Stack pb={ 3 }></Stack>
                <Box
                  sx={ {
                    border: "1px solid #ddd",
                    padding: "16px",
                    borderRadius: "8px",
                  } }
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
                      value={ radioButtonValue }
                      onChange={ handleRadiobuttonValueChange }
                    >
                      <Stack direction="row">
                        <FormControlLabel
                          value="1"
                          control={ <Radio /> }
                          label="I prefer Self Employement"
                        />
                        <FormControlLabel
                          value="0"
                          control={ <Radio /> }
                          label="I prefer Placement"
                        />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Box>
              </CardContent>
              <CardActions sx={ { px: 2, pb: 1 } }>
                { candidateId ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={ () => {
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
                      const hostelPreference =
                        isHostelAccommodationChecked == true ? 1 : 0;
                      // const employementPreference = checkArray(
                      //   selectedPlacementCheckboxes
                      // );

                      const employementPreference = radioButtonValue;

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

                      mutateEditCourse(courseDataToBasket);

                      navigate("/my-courses");

                      getAllCookies();
                    } }
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    color="success"
                    variant="contained"
                    onClick={ () => {
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
                      const hostelPreference =
                        isHostelAccommodationChecked == true ? 1 : 0;
                      const employementPreference = radioButtonValue;

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
                          (selectedDistrict1Id),
                        preferred_district2Id:
                          (selectedDistrict2Id),
                        preferred_district3Id:
                          (selectedDistrict3Id),
                        priorityLevel: convertToNull(selectedPriorityValue),
                        hostelPreference: convertToNull(hostelPreference),
                        selfEmploy: convertToNull(employementPreference),
                      };

                      console.log(
                        "These are data to be sent to database",
                        courseDataToBasket
                      );

                      navigate("/my-courses");

                      getAllCookies();
                    } }
                  >
                    Save Changes
                  </Button>
                ) }

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
