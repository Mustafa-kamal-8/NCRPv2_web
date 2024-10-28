import { Add } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CoursesTable from "../components/table/courses-table";
import useAdminCourse from "../hooks/useAdminCourse";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { addAdminCourses } from "../api/admin-api";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

type FormValues = {
  district: string;
  course: string;
  experience: string;
  target: string;
  stt: string;
};

const schema = yup.object({
  district: yup.string().required("District is required"),
  course: yup.string().required("Course is required"),
  experience: yup.string().required("Experience is required"),
  target: yup.string().required("Target is required"),
  stt: yup.string().required("Please select STT"),
  // residential: yup.string().required("Please select residential"),
});

export default function Admin() {
  const { mutate: addCourse, isLoading: addingCourse } = useMutation({
    mutationFn: addAdminCourses,
    onSuccess(data) {
      if (data.status !== "success") {
        enqueueSnackbar(`${data.message}`, {
          variant: "error",
        });
        return;
      }

      enqueueSnackbar("Successsfully Added!", {
        variant: "success",
      });

      refetch();
    },

    onError(error: AxiosError) {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { isLoading, data, refetch } = useAdminCourse({
    courseId: getValues("course") ?? null,
    districtId: getValues("district") ?? null,
  });

  const onSubmit = (data: FormValues) => {
    addCourse({
      courseId: data.course,
      districtId: data.district,
      experience: data.experience,
      residential: data.stt,
      target: data.target,
    });
    reset();
  };

  useEffect(() => {
    refetch();
  }, [watch("district"), watch("course")]);

  if (isLoading) {
    return (
      <Stack height="70vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container maxWidth="xl" component="section" sx={{ py: 3 }}>
      {/* Add Form */}
      <Paper elevation={0} sx={{ pb: 4 }}>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="district"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  id="district"
                  label="District*"
                  fullWidth
                  error={!!errors.district}
                  helperText={errors.district?.message}
                >
                  {data?.district.map((dis) => (
                    <MenuItem key={dis.districtId} value={dis.districtId}>
                      {dis.districtName}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="stt"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  id="stt"
                  label="STT/RTT*"
                  fullWidth
                  error={!!errors.stt}
                  helperText={errors.stt?.message}
                >
                  <MenuItem value={1}>STT</MenuItem>
                  <MenuItem value={0}>RTD</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Controller
              control={control}
              name="course"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  id="course"
                  label="Course*"
                  fullWidth
                  error={!!errors.course}
                  helperText={errors.course?.message}
                >
                  {data?.course.map(({ courseId, courseName }) => (
                    <MenuItem key={courseId} value={courseId}>
                      {courseName}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name="target"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="target"
                  label="Target*"
                  fullWidth
                  type="number"
                  error={!!errors.target}
                  helperText={errors.target?.message}
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name="residential"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  id="residential"
                  label="Residential*"
                  fullWidth
                  error={!!errors.residential}
                  helperText={errors.residential?.message}
                >
                  <MenuItem value={1}>YES</MenuItem>
                  <MenuItem value={0}>NO</MenuItem>
                </TextField>
              )}
            />
          </Grid> */}

          <Grid item xs={12}>
            <Controller
              control={control}
              name="experience"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="experience"
                  label="Experience*"
                  multiline
                  fullWidth
                  error={!!errors.experience}
                  helperText={errors.experience?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              loading={addingCourse}
              type="submit"
              variant="contained"
              startIcon={<Add />}
            >
              Add Course
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>

      <Box pb={3} />

      <CoursesTable tableData={data?.data} />
    </Container>
  );
}
