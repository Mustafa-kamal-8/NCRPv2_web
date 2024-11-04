import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  SwipeableDrawer,
  Typography,
  useTheme,
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { Close } from "@mui/icons-material";
import useCourses from "../hooks/useCourses";
import CourseCard from "../components/cards/course-card";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../components/courses/useDebounce";
import useFilters from "../hooks/useFilters";
import { useRecoilState } from "recoil";
import { districtState, qualificationState } from "../states/atoms";
import { useQuery } from "@tanstack/react-query";
import { findCourse } from "../api/courses-api";
import { fetchCoursesWithHighestQualification } from "../api/courses-api";
import { getCourseDataFromCookies } from "../utils";

export default function Courses() {
  // dummy data

  const qualificationId = localStorage.getItem("qualificationId");

  const courseData = [
    {
      courseId: 526,
      courseLevel: "Advanced",
      courseMode: "Full Time",
      courseName: "EV Bike Driver",
      districtId: 3,
      districtName: "Kamrup Metropolitian",
      experience: "",
      id: 1,
      qualification: "High School/10th/Matric/Equivalent",
      qualificationId: 5,
      seatsAvailable: 500,
      totalHours: 30,
    },
    {
      courseId: 3,
      courseLevel: "Advanced",
      courseMode: "Part Time",
      courseName: "Piggery Farmer",
      districtId: 5,
      districtName: "Jorhat",
      experience: "",
      id: 2,
      qualification: "Graduate level",
      qualificationId: 5,
      seatsAvailable: 500,
      totalHours: 50,
    },
    {
      courseId: 10,
      courseLevel: "Beginner",
      courseMode: "Full Time",
      courseName: "Driver",
      districtId: 5,
      districtName: "Digboi",
      experience: "",
      id: 3,
      qualification: "Matric Passs",
      qualificationId: 5,
      seatsAvailable: 600,
      totalHours: 100,
    },
  ];
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  // testing purpose

  const [selectedQualificationValue, setSelectedQualificationValue] =
    useState("Post Graduate");

  // set this qualification value to cookies, this is the highest qualification value

  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [districtSelected, setDistrictSelected] = useState(false);
  const [receivedBoolean, setReceivedBoolean] = useState<boolean | null>(null);

  const [selectedDistrict, setSelectedDistrict] = useRecoilState(districtState);

  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const [selectedQualification, setSelectedQualification] =
    useRecoilState(qualificationState);

  console.log(
    "This is the selected Qualification",
    selectedQualification
  );

  console.log("This is the selected District Id", selectedDistrict?.districtID);

  const { isLoading: filtersIsLoading, data: filtersData } = useFilters();

  const candidateId = localStorage.getItem("candidateId");

  console.log("FD", filtersData)

  if (candidateId) {
    const { data: coursesData } = useQuery({
      queryFn: () => findCourse(qualificationId!),
      queryKey: ["courses", qualificationId!],
      // enabled: !!candidateId,
      onSuccess(data: any) {
        if (data.status == "error") {
          // enqueueSnackbar(data.message, {
          //   variant: "error",
          //   anchorOrigin: {
          //     vertical: "bottom",
          //     horizontal: "right",
          //   },
          // });
        } else {
          console.log("not found");
          console.log("these are the courses Data available", coursesData);
        }
      },
    });
  } else {
  }

  const qualificationSelectedFunction = () => {
    if (selectedQualification != null) {
      const booleanValue = true;
      return booleanValue;
    } else {
      const booleanValue = false;
      return booleanValue;
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const qualificationSelectedbool = qualificationSelectedFunction(); // condition to check if Qualification is selected or not

  const districtSelctedFunction = () => {
    if (selectedDistrict != null) {
      const booleanValue = true;
      console.log("District Selected", booleanValue);
    } else {
      const booleanValue = false;
      console.log("District not selected", booleanValue);
    }
  };

  if (selectedDistrict != null) {
    districtSelctedFunction();
  } else {
    districtSelctedFunction();
  }

  if (selectedQualification != null) {
    qualificationSelectedFunction();
  } else {
    qualificationSelectedFunction();
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

  // useEffect refetch()

  useEffect(() => {
    formatResultObject();
  }, [debouncedValue]);

  const { } = useCourses(filters);

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useCourses(filters);

  // const [page, setPage] = useState(1);

  // const query = useQuery({
  //   queryFn: () => getData(page),
  // });

  // useEffect(() => {
  //   refetch;
  // }, [page]);

  // return (
  //   <div>
  //     <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
  //   </div>
  // );

  console.log("These are the courses available in this district", data?.pages);

  const closeDrawer = () => setOpen(false);
  const openDrawer = () => setOpen(true);

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

    // const result = fetchCourseQualificationWise({
    //   qualificationId: 1,
    //   lowLim: 0,
    //   hiLim: 10,
    // });
  }, []);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [lowLimValue, setLowLimValue] = useState();
  const [hiLimValue, setHiLimValue] = useState();

  useEffect(() => {
    const lowLim = (page - 1) * itemsPerPage;
    const hiLim = page * itemsPerPage;

    setLowLimValue(lowLim);
    setHiLimValue(hiLim);

    // fetchCourses(lowLim, hiLim);
  }, [page, lowLimValue, hiLimValue]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getCourseIdsFromCookies = () => {
    const courseDataArray = getCourseDataFromCookies();

    if (courseDataArray.length === 0) {
      console.error("No course data found in cookies.");
      return [];
    }

    return courseDataArray.map((courseData) => {
      const courseDetails = courseData.split(',');
      return courseDetails[0];
    });
  };

  console.log(data);






  // console.log(
  //   "These are the courses available for this qualification",
  //   coursesBasedOnHighesQualification
  // );

  const noCoursesFound = (
    <Stack mt={ 2 } height="70vh" justifyContent="center" alignItems="center">
      <SearchOffRoundedIcon
        sx={ { fontSize: 100, color: theme.palette.text.secondary } }
      />
      <Typography variant="h6" fontWeight={ 700 }>
        Sorry, no results found!
      </Typography>
      <Typography align="center" paragraph>
        Please check the spelling or try searching for something else
      </Typography>
    </Stack>
  );

  const coursesLoading = (
    <Stack mt={ 2 } height="70vh" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );
  const [isDistrictReset, setIsDistrictReset] = useState(false);

  useEffect(() => {
    refetch();
    setSelectedDistrict(null);
  }, [filters]);

  const handleDistrictReset = () => {
    setSelectedDistrict(null);
  };

  const handleAutocompleteChange = (_, newValue) => {
    setSelectedDistrict(newValue);
    setIsDistrictReset(false);
  };

  const [lowLimit, setLowLimit] = useState(0);
  const [pages, setPages] = useState(1);

  const courseResdata = {
    qualificationId: qualificationId,
    districtId: selectedDistrict?.districtID,
    lowLim: 0,
    hiLim: 10,
  };

  const { data: coursesBasedOnHighesQualification } = useQuery({
    queryFn: () => fetchCoursesWithHighestQualification(courseResdata),
    queryKey: [
      "courses_highest_qualification",
      // lowLimit!,
      qualificationId!,
      selectedDistrict?.districtID,
      pages,
    ],
    enabled: !!courseResdata,
    onSuccess(data: any) {
      console.log("data1", data);
    },
  });

  // useEffect(() => {
  //   courseRefetch();
  // }, [lowLimit, pages]);


  return (
    <>
      <Stack direction="row" component="section">
        {/* Filter Section */ }
        <Stack
          component="aside"
          flexBasis={ 300 }
          borderRight={ 1 }
          borderColor={ theme.palette.grey[300] }
          display={ { xs: "none", sm: "none", md: "flex" } }
          pb={ 3 }
        >
          <Typography fontWeight={ 700 } pt={ 3 } px={ 3 }>
            Filter Courses
          </Typography>

          <Box p={ 2 } px={ 3 }>
            { filtersIsLoading ? (
              <p>loading</p>
            ) : (
              <Autocomplete
                value={ isDistrictReset ? null : selectedDistrict }
                isOptionEqualToValue={ (option, value) =>
                  option.districtID === value?.districtID
                }
                onChange={ handleAutocompleteChange }
                disablePortal
                id="combo-box-demo"
                options={ filtersData?.district! }
                sx={ { width: 300 } }
                getOptionLabel={ (option) => option.districtName }
                renderInput={ (params) => (
                  <TextField { ...params } label="Select District" size="small" sx={ {
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  } } />
                ) }
              />
            ) }
            <Stack direction="column" pt={ 1 }>
              <Button variant="outlined" onClick={ handleDistrictReset } sx={ {
                borderRadius: 3,
              } }>
                Reset District Filter
              </Button>
            </Stack>
          </Box>

          { candidateId ? (
            ""
          ) : (
            <Box p={ 2 } px={ 3 }>
              { filtersIsLoading ? (
                <p>loading..</p>
              ) : (
                <>
                  <Autocomplete
                    value={ selectedQualification }
                    onChange={ (_event, newValue) => {
                      setSelectedQualification(newValue!);
                      qualificationSelectedFunction();
                    } }
                    disablePortal
                    id="combo-box-demo"
                    options={ filtersData?.qualification! }
                    sx={ { width: 300 } }
                    getOptionLabel={ (option) => option.qualificationName }
                    renderInput={ (params) => (
                      <TextField
                        { ...params }
                        label="Select Qualification"
                        size="small"
                        sx={ {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                          },
                        } }
                      />
                    ) }
                  />
                  <Typography variant="caption" color="error">
                    *Please select your Highest Qualification only
                  </Typography>
                </>
              ) }
            </Box>
          ) }

          {/* Search Course */ }
          <Box px={ 3 } py={ 2 }>
            <Typography
              fontWeight={ 500 }
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
              value={ value }
              sx={ {
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              } }
              onChange={ handleChange }
              InputProps={ {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              } }
            />
          </Box>
        </Stack>

        {/* Courses Section */ }
        <Stack flex={ 1 } px={ 3 } py={ 2 } component="section">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={ 1 }
            component="section"
          >
            <Stack>
              <Typography
                variant="h4"
                sx={ { pb: 3 } }
                color="primary.main"
                align="center"
              >
                Courses
              </Typography>
            </Stack>
            { candidateId ? (
              <Typography variant="subtitle2" color="Highlight">
                These are Courses based on your Highest Qualification
              </Typography>
            ) : (
              ""
            ) }
            { candidateId ? (
              ""
            ) : (
              <Box
                mt={ 2 } // Add margin to separate the button and the highlighted box
                p={ 2 }
                bgcolor={
                  qualificationSelectedbool == true ? "#21EB52" : "#F72331"
                }
                borderRadius={ 4 }
              >
                <Typography variant="body2" color="white">
                  { qualificationSelectedbool == true
                    ? `You have selected the ${selectedQualification?.qualificationName} qualification.`
                    : "Please Select your Highest Qualification from the Filter to proceed to Add Courses to Basket." }
                </Typography>
              </Box>
            ) }

            <Button
              sx={ {
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              } }
              startIcon={ <FilterAltIcon /> }
              onClick={ openDrawer }
            >
              Filter
            </Button>
          </Stack>
          { (isLoading || isRefetching) && coursesLoading }
          { !isLoading && !data?.pages && noCoursesFound }{ " " }
          { candidateId ? (
            <Grid
              container
              spacing={ 2 }
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              { coursesBasedOnHighesQualification?.data?.map(
                (course: any, index: number) => (
                  <Grid item xs={ 12 } sm={ 6 } md={ 6 } lg={ 4 } key={ course.id }>
                    <CourseCard
                      // noAction
                      qualificationBool={ qualificationSelectedbool }
                      course={ course }
                    // districts={districts}
                    // cookieData={cookieData}
                    />
                  </Grid>
                )
              ) }
            </Grid>
          ) : (
            <>
              <Grid
                container
                spacing={ 2 }
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
              >
                { data?.pages?.map((pages) => {
                  if (pages.length === 0)
                    return <Stack width="100%">{ noCoursesFound }</Stack>;
                  return pages?.data?.map((course: any) => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 6 } lg={ 4 } key={ course.id }>
                      <CourseCard
                        qualificationBool={ qualificationSelectedbool }
                        course={ course }
                        highestQualification={
                          selectedQualification?.qualificationName
                        }
                        highestQualificationId={
                          selectedQualification?.qualificationID
                        }
                      />
                    </Grid>
                  ));
                }) }
              </Grid>

              <Stack py={ 2 } justifyContent="center" alignItems="center">
                <Button
                  onClick={ () => fetchNextPage() }
                  disabled={ !hasNextPage || isFetchingNextPage }
                >
                  { isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                      ? "Load More"
                      : "Nothing more to load" }
                </Button>
              </Stack>
            </>
          ) }
          {/* {candidateId ? (
            <Stack>
              <Button
                disabled={pages === 1}
                onClick={() => {
                  setLowLimit((limit) => limit - 1);
                  setPages((pages) => pages - 1);
                }}
              >
                Previous Page
              </Button>
              <Button
                disabled={
                  pages ==
                  Math.ceil(coursesBasedOnHighesQualification?.length / 10)
                }
                onClick={() => {
                  setLowLimit((limit) => limit + 10);
                  setPages((pages) => pages + 1);
                }}
              >
                Next Page
              </Button>
            </Stack>
          ) : (
            ""
          )} */}
        </Stack>
      </Stack>

      <Dialog open={ openDialog } onClose={ handleClose } sx={ { minWidth: 300 } }>
        <DialogTitle>Select Qualification</DialogTitle>
        <DialogContent>
          <DialogContentText sx={ { fontSize: "1.1rem", textAlign: "center" } }>
            Please select your Highest Qualification from the Filters Section
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={ { borderTop: "1px solid #ccc", padding: 2 } }>
          <Button onClick={ handleClose } color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Course Filter Drawer Section */ }
      <SwipeableDrawer
        onOpen={ openDrawer }
        anchor="left"
        open={ open }
        onClose={ closeDrawer }
        sx={ { zIndex: theme.zIndex.drawer + 2 } }
      >
        <Typography fontWeight={ 700 } pt={ 3 } px={ 3 }>
          Filter Courses
        </Typography>

        <Box p={ 2 } px={ 3 }>
          { filtersIsLoading ? (
            <p>loading..</p>
          ) : (
            <Autocomplete
              value={ isDistrictReset ? null : selectedDistrict }
              isOptionEqualToValue={ (option, value) =>
                option.districtID === value?.districtID
              }
              onChange={ handleAutocompleteChange }
              disablePortal
              id="combo-box-demo"
              options={ filtersData?.district! }
              sx={ { width: 300 } }
              getOptionLabel={ (option) => option.districtName }
              renderInput={ (params) => (
                <TextField { ...params } label="Select District" size="small" />
              ) }
            />
          ) }
          <Stack direction="column" pt={ 1 }>
            <Button variant="outlined" onClick={ handleDistrictReset }>
              Reset District Filter
            </Button>
          </Stack>
        </Box>

        { candidateId ? (
          ""
        ) : (
          <Box p={ 2 } px={ 3 }>
            { filtersIsLoading ? (
              <p>loading..</p>
            ) : (
              <Autocomplete
                value={ selectedQualification }
                onChange={ (_event, newValue) => {
                  setSelectedQualification(newValue!);
                  qualificationSelectedFunction();
                } }
                disablePortal
                id="combo-box-demo"
                options={ filtersData?.qualification! }
                sx={ { width: 300 } }
                getOptionLabel={ (option) => option.qualificationName }
                renderInput={ (params) => (
                  <TextField
                    { ...params }
                    label="Select Qualification"
                    size="small"
                  />
                ) }
              />
            ) }
          </Box>
        ) }

        {/* Search Course */ }
        <Box px={ 3 } py={ 2 }>
          <Typography
            fontWeight={ 500 }
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
            value={ value }
            onChange={ handleChange }
            InputProps={ {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            } }
          />
        </Box>
        <Button
          startIcon={ <Close /> }
          variant="contained"
          sx={ { mx: 2, mt: 1 } }
          onClick={ closeDrawer }
        >
          Close Drawer
        </Button>
      </SwipeableDrawer>
    </>
  );
}
