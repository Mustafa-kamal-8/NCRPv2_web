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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import CourseFilters from "../components/courses/filters";
import { Close } from "@mui/icons-material";
import useCourses from "../../hooks/useCourses";
import CourseCard from "../../components/cards/course-card";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../components/courses/useDebounce";
import useFilters from "../../hooks/useFilters";
import { useRecoilState } from "recoil";
import { districtState, qualificationState } from "../../states/atoms";
import useTrainingCenters from "../../hooks/useTrainingCenters";
import HighlightedTCCard from "../../components/cards/highlighted-tc-card";

export default function TrainingCenters() {
  // dummy data

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
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [districtSelected, setDistrictSelected] = useState(false);
  const [receivedBoolean, setReceivedBoolean] = useState<boolean | null>(null);

  const [selectedDistrict, setSelectedDistrict] = useRecoilState(districtState);

  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const [selectedQUalification, setSelectedQualification] =
    useRecoilState(qualificationState);

  const { isLoading: filtersIsLoading, data: filtersData } = useFilters();

  console.log(" This is the selected District ", selectedDistrict);

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log(" PIN ", event.target.value);
  };

  function formatResultObject() {
    const result = {
      courseLevel: [] as any,
      courseMode: [] as any,
      totalHours: [] as any,
      pin: value,
      // residential:
      //   trainingType === "" ? "" : trainingType === "residential" ? 1 : 0,
    };
    setFilters(result);
  }

  useEffect(() => {
    formatResultObject();
  }, [debouncedValue]);

  const handleReceiveBoolean = (value: boolean) => {
    setReceivedBoolean(value);
    console.log(" This is the received boolean value ", receivedBoolean);
  };

  console.log("This is the selected District", selectedDistrict);

  console.log("These are the selected filters", filters);

  const {} = useTrainingCenters(filters);

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useTrainingCenters(filters);

  console.log(
    "These are the training centers available in this district",
    data?.pages
  );

  // console.log(
  //   "These is the course id that is selected",
  //   data?.pages[0]?.data[0]?.id
  // );

  const closeDrawer = () => setOpen(false);
  const openDrawer = () => setOpen(true);

  const noTrainingCentersFound = (
    <Stack mt={2} height="70vh" justifyContent="center" alignItems="center">
      <SearchOffRoundedIcon
        sx={{ fontSize: 100, color: theme.palette.text.secondary }}
      />
      <Typography variant="h6" fontWeight={700}>
        Sorry, no results found!
      </Typography>
      <Typography align="center" paragraph>
        Please check the spelling or try searching for something else
      </Typography>
    </Stack>
  );

  const tcLoading = (
    <Stack mt={2} height="70vh" justifyContent="center" alignItems="center">
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

  return (
    <>
      <Stack direction="row" component="section">
        {/* Filter Section */}
        <Stack
          component="aside"
          flexBasis={300}
          borderRight={1}
          borderColor={theme.palette.grey[300]}
          display={{ xs: "none", sm: "none", md: "flex" }}
          pb={3}
        >
          <Typography fontWeight={700} pt={3} px={3}>
            Filter Training Centers
          </Typography>

          <Box p={2} px={3}>
            {filtersIsLoading ? (
              <p>loading</p>
            ) : (
              <Autocomplete
                value={isDistrictReset ? null : selectedDistrict}
                isOptionEqualToValue={(option, value) =>
                  option.districtID === value?.districtID
                }
                onChange={handleAutocompleteChange}
                disablePortal
                id="combo-box-demo"
                options={filtersData?.district!}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.districtName}
                renderInput={(params) => (
                  <TextField {...params} label="Select District" size="small" />
                )}
              />
            )}
            <Stack direction="column" pt={1}>
              <Button variant="outlined" onClick={handleDistrictReset}>
                Reset District Filter
              </Button>
            </Stack>
          </Box>
          {/* Search Course */}
          <Box px={3} py={2}>
            <Typography
              fontWeight={500}
              color="primary.main"
              gutterBottom
              variant="body2"
            >
              Search Training Centers
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              helperText="Search by PIN only"
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
        </Stack>

        {/* Courses Section */}
        <Stack flex={1} px={3} py={2} component="section">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            component="section"
          >
            <Typography
              variant="h4"
              sx={{ pb: 3 }}
              color="primary.main"
              align="center"
            >
              Training Centers
            </Typography>

            <Button
              sx={{
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              }}
              startIcon={<FilterAltIcon />}
              onClick={openDrawer}
            >
              Filter
            </Button>
          </Stack>

          {(isLoading || isRefetching) && tcLoading}

          {!isLoading && !data?.pages && noTrainingCentersFound}

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            {data?.pages?.map((pages) => {
              if (pages.length === 0)
                return <Stack width="100%">{noTrainingCentersFound}</Stack>;
              return pages.data?.map((trainingCenters: any) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  key={trainingCenters.id}
                >
                  <HighlightedTCCard tc={trainingCenters} />
                </Grid>
              ));
            })}
          </Grid>
          <Stack py={2} justifyContent="center" alignItems="center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* Course Filter Drawer Section */}
      <SwipeableDrawer
        onOpen={openDrawer}
        anchor="left"
        open={open}
        onClose={closeDrawer}
        sx={{ zIndex: theme.zIndex.drawer + 2 }}
      >
        <Typography fontWeight={700} pt={3} px={3}>
          Filter Training Centers
        </Typography>

        <Box p={2} px={3}>
          {filtersIsLoading ? (
            <p>loading</p>
          ) : (
            <Autocomplete
              value={isDistrictReset ? null : selectedDistrict}
              isOptionEqualToValue={(option, value) =>
                option.districtID === value?.districtID
              }
              onChange={handleAutocompleteChange}
              disablePortal
              id="combo-box-demo"
              options={filtersData?.district!}
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.districtName}
              renderInput={(params) => (
                <TextField {...params} label="Select District" size="small" />
              )}
            />
          )}
          <Stack direction="column" pt={1}>
            <Button variant="outlined" onClick={handleDistrictReset}>
              Reset District Filter
            </Button>
          </Stack>
        </Box>

        {/* Search TC */}
        {/* <Box px={3} py={2}>
          <Typography
            fontWeight={500}
            color="primary.main"
            gutterBottom
            variant="body2"
          >
            Search Training Center
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            helperText="Search by PIN only"
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
        </Box> */}
        <Button
          startIcon={<Close />}
          variant="contained"
          sx={{ mx: 2, mt: 1 }}
          onClick={closeDrawer}
        >
          Close Drawer
        </Button>
      </SwipeableDrawer>
    </>
  );
}
