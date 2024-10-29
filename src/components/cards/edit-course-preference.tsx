import {
    Box,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import EditPreferencesLayout from "../../layouts/edit-preference-layout";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { addCourse, checkExistPriority, fetchCourseWithDistricts } from "../../api/courses-api";
import { useEffect, useState } from "react";


interface courseData {
    courseName: string;
    districtName: string;
    courseId: string;
    preferred_district1: number;
    preferred_district2: number;
    preferred_district3: number;
    priorityLevel: number;
    hostelPreference: number;
    employementPreference: number;
}

const validationSchema = Yup.object({
    priorityLevel: Yup.number().oneOf([1, 2, 3], 'Please select a valid priority level')
        .required('Priority Level is required'),
    preferred_district1: Yup.string().required("Preferred District 1 is required"),
    preferred_district2: Yup.string().nullable(),
    preferred_district3: Yup.string().nullable(),
    hostelPreference: Yup.boolean(),
    employementPreference: Yup.number()
        .oneOf([0, 1], "Select either Self Employment or Placement")
        .required("Employment preference is required"),
});


interface EditPreferencesProps {
    courseDetails: courseData;
    onClose: () => void;
}

export default function EditCoursePreferences({ courseDetails, onClose }: EditPreferencesProps) {
    const candidateId = localStorage.getItem("candidateId");

    const [availablePriority, setAvailablePriority] = useState([])


    const { data, mutate } = useMutation({
        mutationFn: fetchCourseWithDistricts,
        onSuccess() {
            console.log("Data successfully loaded---", data);
        },
        onError(error: AxiosError) {
            enqueueSnackbar(`${error.message}`, {
                variant: "error",
            });
        },
    });

    useEffect(() => {
        mutate(courseDetails?.courseId!);
        // mutate("48");
    }, []);

    const { data: available, mutate: priorityMutate } = useMutation({
        mutationFn: checkExistPriority,
        onSuccess(available) {
            console.log("available", available);
            setAvailablePriority(available.availablePriority)
        },
        onError(error: AxiosError) {
            enqueueSnackbar(`${error.message}`, {
                variant: "error",
            });
        },
    });


    useEffect(() => {
        priorityMutate(candidateId!)
    }, [])

    const { mutate: addCourseToBackend } = useMutation({
        mutationFn: addCourse,
        onSuccess(data: any) {
            if (data.status == "error") {
                enqueueSnackbar(data.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                });
            } else {
                enqueueSnackbar(data.message, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                });
            }
        },
    });


    // const navigate = useNavigate();

    const getDistrictId = (districtName: any) => {
        return data?.data[0]?.districts.find((district: any) => district.districtName === districtName)?.districtId || null;
    };


    const saveCourseToCookie = (courseData: any) => {
        const cookieValue = [
            courseData.courseId ?? "null",
            courseData.courseName ?? "null",
            courseData.preferred_district1 ?? "null",
            courseData.preferred_district2 ?? "null",
            courseData.preferred_district3 ?? "null",
            courseData.preferred_district1Id ?? "null",
            courseData.preferred_district2Id ?? "null",
            courseData.preferred_district3Id ?? "null",
            courseData.priorityLevel ?? "null",
            courseData.hostelPreference ?? "null",
            courseData.employementPreference ?? "null",
        ].join(",");

        document.cookie = `#${courseData.courseId}Course=${cookieValue}; max-age=86400; path=/`;
    };


    const getCourseDataFromCookies = (): string[] => {
        const cookies = document.cookie;

        const courseRegex = /#\d+Course=([^;]*)/g;
        let courseDataArray: string[] = [];
        let match;

        while ((match = courseRegex.exec(cookies)) !== null) {
            courseDataArray.push(match[1]);
        }
        return courseDataArray;
    };

    const getMissingPriorityLevels = (): number[] => {
        const courseDataArray = getCourseDataFromCookies();
        const firstThreeRows = courseDataArray.slice(0, 3);
        const storedLevels: number[] = [];

        firstThreeRows.forEach((courseData, index) => {
            const courseArray = courseData.split(",");

            if (courseArray.length > 8) {
                const level = parseInt(courseArray[8], 10);

                if (!isNaN(level) && level >= 1 && level <= 3 && !storedLevels.includes(level)) {
                    storedLevels.push(level);
                }
            } else {
                console.log(`Course ${index + 1} does not have enough data or no valid value at index 8.`);
            }
        });


        const possiblePriorityLevels = [1, 2, 3];
        const missingLevels = possiblePriorityLevels.filter((level) => !storedLevels.includes(level));

        return missingLevels;
    };

    const priorityLevels = getMissingPriorityLevels();

    const numbersNotInPriorityLevels = Array.from(
        { length: 3 },
        (_, index) => index + 1
    ).filter((number) => priorityLevels?.includes(number));

    const formik = useFormik({
        initialValues: {
            priorityLevel: "",
            preferred_district1: courseDetails.districtName,
            preferred_district2: courseDetails.preferred_district2,
            preferred_district3: courseDetails.preferred_district3,
            hostelPreference: courseDetails.hostelPreference === 1,
            employementPreference: courseDetails.employementPreference,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Form submitted with values:", values);
            const courseDataToSave = {
                courseId: courseDetails.courseId ?? null,
                courseName: courseDetails.courseName ?? null,
                preferred_district1: values.preferred_district1 ?? null,
                preferred_district2: values.preferred_district2 ?? null,
                preferred_district3: values.preferred_district3 ?? null,
                preferred_district1Id: getDistrictId(values.preferred_district1) ?? null,
                preferred_district2Id: getDistrictId(values.preferred_district2) ?? null,
                preferred_district3Id: getDistrictId(values.preferred_district3) ?? null,
                priorityLevel: values.priorityLevel ?? null,
                hostelPreference: values.hostelPreference ? 1 : 0,
                employementPreference: values.employementPreference ?? null,
            };

            const courseDataToSaveAfterLogin = {
                candidateId: candidateId,
                courseId: courseDetails.courseId ?? null,
                preferred_district1Id: getDistrictId(values.preferred_district1) ?? null,
                preferred_district2Id: getDistrictId(values.preferred_district2) ?? null,
                preferred_district3Id: getDistrictId(values.preferred_district3) ?? null,
                priorityLevel: values.priorityLevel ?? null,
                hostelPreference: values.hostelPreference ? 1 : 0,
                selfEmploy: values.employementPreference ?? null,
            }
            if (candidateId) {
                addCourseToBackend(courseDataToSaveAfterLogin)
                priorityMutate(candidateId);
            } else {
                saveCourseToCookie(courseDataToSave);

                enqueueSnackbar(
                    `${courseDetails?.courseName} added successfully`,
                    {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    }
                );
            }
            onClose();
        },
    });

    const params = useParams();


    // @ts-ignore
    const hostelAccomod = params?.hostelAccomodations == 1 ? true : false;

    return (
        <>
            <EditPreferencesLayout
                description={ `Select your Preferred Districts where ${courseDetails?.courseName} Course is Available` }
                subTitle=""
                title="Select Your Preferences for"
                courseName={ courseDetails?.courseName || "" }
            >
                <form onSubmit={ formik.handleSubmit }>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 }>
                            <Card variant="outlined" sx={ { width: "100%" } }>
                                <CardContent>
                                    <Typography color="primary">Course Priority Level:</Typography>
                                    <Select
                                        name="priorityLevel"
                                        value={ formik.values.priorityLevel }
                                        onChange={ formik.handleChange }
                                        onBlur={ formik.handleBlur }
                                        sx={ { width: "20%", mt: 1, ml: 2 } }
                                        error={ formik.touched.priorityLevel && Boolean(formik.errors.priorityLevel) }
                                    >
                                        { candidateId
                                            ? (
                                                availablePriority?.map((level: any) => (
                                                    <MenuItem key={ level } value={ level }>
                                                        { level }
                                                    </MenuItem>
                                                ))
                                            )
                                            : (
                                                numbersNotInPriorityLevels?.map((level) => (
                                                    <MenuItem key={ level } value={ level }>
                                                        { level }
                                                    </MenuItem>
                                                ))
                                            )
                                        }

                                    </Select>
                                    { formik.touched.priorityLevel && formik.errors.priorityLevel && (
                                        <Typography color="error" paddingLeft={ 2 }>{ formik.errors.priorityLevel }</Typography>
                                    ) }
                                    <Grid container spacing={ 2 } pt={ 2 }>
                                        <Grid item xs={ 4 }>
                                            <Typography color="primary">Preferred District 1:</Typography>
                                            <Select
                                                name="preferred_district1"
                                                value={ formik.values.preferred_district1 }
                                                onChange={ formik.handleChange }
                                                onBlur={ formik.handleBlur }
                                                sx={ { width: "80%", mt: 1, ml: 2 } }
                                                error={ formik.touched.preferred_district1 && Boolean(formik.errors.preferred_district1) }
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                { data?.data[0]?.districts?.map((district: any) => (
                                                    <MenuItem key={ district.districtId }
                                                        value={ district.districtName }>
                                                        { district.districtName }
                                                    </MenuItem>
                                                )) }
                                            </Select>
                                            { formik.touched.preferred_district1 && formik.errors.preferred_district1 && (
                                                <Typography color="error" paddingLeft={ 2 }>{ formik.errors.preferred_district1 }</Typography>
                                            ) }
                                        </Grid>
                                        <Grid item xs={ 4 }>
                                            <Typography color="primary">Preferred District 2:</Typography>
                                            <Select
                                                name="preferred_district2"
                                                value={ formik.values.preferred_district2 }
                                                onChange={ formik.handleChange }
                                                onBlur={ formik.handleBlur }
                                                sx={ { width: "80%", mt: 1, ml: 2 } }
                                                error={ formik.touched.preferred_district2 && Boolean(formik.errors.preferred_district2) }
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                { data?.data[0]?.districts?.map((district: any) => (
                                                    <MenuItem key={ district.districtId }
                                                        value={ district.districtName }>
                                                        { district.districtName }
                                                    </MenuItem>
                                                )) }
                                            </Select>
                                            { formik.touched.preferred_district2 && formik.errors.preferred_district2 && (
                                                <Typography color="error" paddingLeft={ 2 }>{ formik.errors.preferred_district2 }</Typography>
                                            ) }
                                        </Grid>
                                        <Grid item xs={ 4 }>
                                            <Typography color="primary">Preferred District 3:</Typography>
                                            <Select
                                                name="preferred_district3"
                                                value={ formik.values.preferred_district3 }
                                                onChange={ formik.handleChange }
                                                onBlur={ formik.handleBlur }
                                                sx={ { width: "80%", mt: 1, ml: 2 } }
                                                error={ formik.touched.preferred_district3 && Boolean(formik.errors.preferred_district3) }
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                { data?.data[0]?.districts?.map((district: any) => (
                                                    <MenuItem key={ district.districtId }
                                                        value={ district.districtName }>
                                                        { district.districtName }
                                                    </MenuItem>
                                                )) }
                                            </Select>
                                            { formik.touched.preferred_district3 && formik.errors.preferred_district3 && (
                                                <Typography color="error" paddingLeft={ 2 }>{ formik.errors.preferred_district3 }</Typography>
                                            ) }
                                        </Grid>
                                    </Grid>

                                    <Box sx={ { border: "1px solid #ddd", p: 2, mt: 3, borderRadius: "8px" } }>
                                        <Typography variant="subtitle2" color="primary">
                                            Hostel Accommodations Preference
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name="hostelPreference"
                                                            checked={ formik.values.hostelPreference }
                                                            onChange={ formik.handleChange }
                                                        />
                                                    }
                                                    label="I want Hostel Accommodations"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>

                                    <Box sx={ { border: "1px solid #ddd", p: 2, mt: 3, borderRadius: "8px" } }>
                                        <Typography variant="subtitle2" color="primary">
                                            Employment Preference
                                        </Typography>
                                        <RadioGroup
                                            name="employementPreference"
                                            value={ formik.values.employementPreference }
                                            onChange={ formik.handleChange }
                                        >
                                            <FormControlLabel
                                                value="1"
                                                control={ <Radio /> }
                                                label="Self Employment"
                                            />
                                            <FormControlLabel
                                                value="0"
                                                control={ <Radio /> }
                                                label="Placement"
                                            />
                                        </RadioGroup>
                                        { formik.touched.employementPreference && formik.errors.employementPreference && (
                                            <Typography color="error">{ formik.errors.employementPreference }</Typography>
                                        ) }
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" type="submit">
                                        Save Changes
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </EditPreferencesLayout>
        </>
    );
}
