import { useEffect, useState } from "react";
import axios from "axios";
import BasicDetails from "../components/BasicDetails";
import PersonalDetails from "../components/PersonalDetails";
import AddressDetails from "../components/AddressDetails";
import OtherDetails from "../components/OtherDetails";
import ReviewAndSubmit from "../components/ReviewAndSubmit";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PlacementPreference from "../components/PlacementPreference";

const Register = () => {
  const [activeStep, setActiveStep] = useState(0); // State to manage current step
  const location = useLocation();
  const mobile = location.state.data.mobile;
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const adharNumber = location.state.data.adharNumber;
  const dob = location.state.data.dob;
  console.log("DOB", dob);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Initial form data
  const initialFormData = {
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    motherName: "",
    fatherName: "",
    adharNumber: "",
    relegion: "",
    casteId: "",
    qualification: "",
    isDisable: "",
    mobile: "",
    altMobile: "",
    address: "",
    areaType: "",
    city: "",
    PIN: "",
    loksabhaConstituency: "",
    policeStation: "",
    district: "",
    assemblyConstituency: "",
    ulb: "",
    postoffice: "",
    isBPLCardHolder: "",
    isMinority: "",
    isAntodayaCardHolder: "",
    isBoCw: "",
    isNregaCardHolder: "",
    isTeaTribeMinoriy: "",
    employmentExchangeNumber: "",
    coursePreference: [], // Initialize empty array for course preferences
    password: "",
    ppoliceStation: "",
    paddress: "",
    pdistrict: "",
    pareaType: "",
    pulb: "",
    pcity: "",
    pblock: "",

    pPIN: "",
    ppostoffice: "",
    passemblyConstituency: "",
    ploksabhaConstituency: "",
    placementPreference: {
      state1: "",
      state2: "",
      state3: "",
      district1: "",
      district2: "",
      district3: "",
      country: "",
    },
  };

  const districts = [
    { label: "Bajali", value: 1132 },
    { label: "Baksa", value: 1130 },
    { label: "Barpeta", value: 362 },
    { label: "Biswanath", value: 1131 },
    { label: "Bongaigaon", value: 363 },
    { label: "Cachar", value: 364 },
    { label: "Charaideo", value: 1120 },
    { label: "Chirang", value: 1121 },
    { label: "Darrang", value: 365 },
    { label: "Dhemaji", value: 366 },
    { label: "Dhubri", value: 367 },
    { label: "Dibrugarh", value: 368 },
    { label: "Dima Hasao", value: 1122 },
    { label: "Goalpara", value: 369 },
    { label: "Golaghat", value: 370 },
    { label: "Hailakandi", value: 371 },
    { label: "Hojai", value: 1123 },
    { label: "Jorhat", value: 372 },
    { label: "Kamrup", value: 373 },
    { label: "Kamrup Metropolitan", value: 1124 },
    { label: "Karbi Anglong - East", value: 1125 },
    { label: "Karbi Anglong - West", value: 1126 },
    { label: "Karimganj", value: 375 },
    { label: "Kokrajhar", value: 376 },
    { label: "Lakhimpur", value: 377 },
    { label: "Majuli", value: 1127 },
    { label: "Morigaon", value: 378 },
    { label: "Nagaon", value: 379 },
    { label: "Nalbari", value: 380 },
    { label: "Sivasagar", value: 382 },
    { label: "Sonitpur", value: 383 },
    { label: "South Salmara-Mankachar", value: 1128 },
    { label: "Tamulpur", value: 1134 },
    { label: "Tinsukia", value: 384 },
    { label: "Udalguri", value: 1129 },
  ];

  const [districtsArrayValues, setDistrictArrayValues] = useState([]);
  const [courses, setCourses] = useState([]);
  const [agreed, setAgreed] = useState(false);

  console.log("coursssssss------------------------------>", courses);

  const getAllCookies = () => {
    function isCookieStorageEmpty() {
      return document.cookie === ""; // if cookie is empty this function is run
    }

    if (!isCookieStorageEmpty()) {
      let cookies = document.cookie.split(";");
      let values = cookies.map((cookie) => cookie.trim().split("=")[1]);

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

      const preferredDistrict1Array = addToBasket.map(
        (obj) => obj.preferred_district1
      );

      const uniqueDistrictsArray = [...new Set(preferredDistrict1Array)];

      setDistrictArrayValues(uniqueDistrictsArray);
      setCourses(addToBasket);
      console.log("slkmlsdl", setCourses(addToBasket));
    }
  };

  const handleState1Change = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      placementPreference: {
        ...prevFormData.placementPreference,
        state1: value,
      },
    }));
  };

  const allFieldsFilled = () => {
    const requiredFields = [
      "firstName",
      "gender",
      "fatherName",
      "motherName",
      "email",
      "relegion",
      "casteId",
      "qualification",
      "isDisable",
    ];
    return requiredFields.every((field) => Boolean(formData[field]));
  };

  useEffect(() => {
    getAllCookies();
  }, []);

  useEffect(() => {
    courses.forEach((course) => {
      console.log("Displayed Course ID1:", course.courseId);
    });
  }, [courses]);

  useEffect(() => {
    console.log("Current district IDs:");
    courses.forEach((course) => {
      console.log(
        "d1----------------------------------------->",
        course.preferred_district1Id
      );
    });
  }, [courses]);

  useEffect(() => {
    console.log("Current district IDs:");
    courses.forEach((course) => {
      console.log(course.preferred_district2Id);
    });
  }, [courses]);
  useEffect(() => {
    console.log("Current district IDs:");
    courses.forEach((course) => {
      console.log(course.preferred_district3Id);
    });
  }, [courses]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  console.log("dattttttta", formData);


  const handleNext = async () => {
    console.log("FormData-------------->", formData.religion);
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }
    if (activeStep === steps.length - 1) {
      try {
        // Populate coursePreferences with courses and districts
        formData.coursePreference = courses.map((course) => ({
          course: course.courseId,
          districts: [
            {
              district: course.preferred_district1Id,
              priorityLevel: course.priorityLevel,
            },
            {
              district: course.preferred_district2Id,
              priorityLevel: course.priorityLevel,
            },
            {
              district: course.preferred_district3Id,
              priorityLevel: course.priorityLevel,
            },
          ],
        }));

        const response = await axios.post(
          "https://ncrpv2.skillmissionassam.org/nw/newRegister",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.message === "Register Successfully") {
          toast.success("Form submitted successfully");
          setFormData(initialFormData);
          setActiveStep(0);
          setTimeout(() => {
            navigate("/auth/candidate-register");
          }, 1000);
        } else {
          toast.error(response.data.message || "All fields are required");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form");
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Function to go to the previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      mobile: mobile,
      adharNumber: adharNumber,
      dob: dob,
    }));
  }, [mobile, adharNumber, dob]);

  // Array of components to render each step
  const steps = [
    {
      component: <BasicDetails formData={ formData } setFormData={ setFormData } />,
    },
    {
      component: (
        <PersonalDetails formData={ formData } setFormData={ setFormData } />
      ),
    },
    {
      component: (
        <AddressDetails formData={ formData } setFormData={ setFormData } />
      ),
    },
    {
      component: <OtherDetails formData={ formData } setFormData={ setFormData } />,
    },
    {
      component: (
        <PlacementPreference formData={ formData } setFormData={ setFormData } />
      ),
    },
    {
      component: (
        <ReviewAndSubmit
          formData={ formData }
          setFormData={ setFormData }
          handleBack={ handleBack }
          agreed={ agreed } // Passing agreed state
          setAgreed={ setAgreed }
        />
      ),
    },
  ];
  console.log("agreed---------->", agreed);

  return (
    <div>
      <Toaster /> {/* Add Toaster component to display toast notifications */ }
      <Stepper
        activeStep={ activeStep }
        alternativeLabel
        style={ { marginTop: "2rem" } }
      >
        { steps.map((step, index) => (
          <Step key={ index }>
            <StepLabel>{/* Customize step labels here if needed */ }</StepLabel>
          </Step>
        )) }
      </Stepper>
      <div style={ { marginTop: "2rem", textAlign: "center" } }>
        {/* Render current step component */ }
        { steps[activeStep].component }

        {/* Password fields only visible on the first step */ }

        { activeStep === 0 && (
          <>
            <div
              style={ {
                padding: "20px",
                marginLeft: "10.5%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                width: "79%",
                justifyContent: "center",
              } }
            >
              <Typography
                variant="subtitle1"
                style={ { color: "red", marginBottom: "10px" } }
              >
                *Please create a password for future logins and reference
              </Typography>
              <div
                style={ {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                } }
              >
                <div
                  style={ {
                    width: "48%",
                    display: "flex",
                    flexDirection: "column",
                  } }
                >
                  <TextField
                    label="Password"
                    name="password"
                    type={ showPassword ? "text" : "password" }
                    value={ formData.password }
                    onChange={ (e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={ {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={ togglePasswordVisibility }
                            edge="end"
                          >
                            { showPassword ? <VisibilityOff /> : <Visibility /> }
                          </IconButton>
                        </InputAdornment>
                      ),
                    } }
                  />
                </div>
                <div
                  style={ {
                    width: "48%",
                    display: "flex",
                    flexDirection: "column",
                  } }
                >
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={ showConfirmPassword ? "text" : "password" }
                    value={ formData.confirmPassword }
                    onChange={ (e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={ {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={ toggleConfirmPasswordVisibility }
                            edge="end"
                          >
                            { showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            ) }
                          </IconButton>
                        </InputAdornment>
                      ),
                    } }
                  />
                </div>
              </div>
              { passwordError && (
                <p style={ { color: "red", marginTop: "1rem" } }>
                  { passwordError }
                </p>
              ) }
            </div>
          </>
        ) }

        {/* Button container */ }
        <div style={ { marginTop: "2rem" } }>
          {/* Render back button if not on first step */ }
          { activeStep !== 0 && (
            <Button onClick={ handleBack } variant="outlined" size="large">
              Back
            </Button>
          ) }

          {/* Render the "Next" button for steps other than the last step */ }
          { activeStep !== steps.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={ handleNext }
              style={ { marginLeft: "1rem" } }
              size="large"
            // disabled={!allFieldsFilled()}  // Uncomment if you have a function to check if all fields are filled
            >
              Next
            </Button>
          ) }

          {/* Render the "Submit" button only on the last step and when agreed is true */ }
          { activeStep === steps.length - 1 && agreed && (
            <Button
              variant="contained"
              color="primary"
              onClick={ handleNext }
              style={ { marginLeft: "1rem" } }
              size="large"
            >
              Submit
            </Button>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Register;
