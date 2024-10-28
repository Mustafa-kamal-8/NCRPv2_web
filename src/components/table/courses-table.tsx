import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  AdminCourses,
  Data,
  deleteAdminCourses,
  updateAdminCourses,
} from "../../api/admin-api";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";
import { QUERYKEY } from "../../data/constants";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
});

interface Props {
  tableData: Data[] | undefined;
}

export default function CoursesTable({ tableData }: Props) {
  const [selectedId, setSelectedId] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const queryClient = useQueryClient();

  const data: AdminCourses | undefined = queryClient.getQueryData([
    QUERYKEY.ADMINCOURSE,
  ]);

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteAdminCourses,
    onSuccess(data) {
      if (data.status !== "success") {
        enqueueSnackbar(`${data.message}`, {
          variant: "error",
        });
        return;
      }

      enqueueSnackbar("Successfully Deleted", {
        variant: "info",
      });

      queryClient.invalidateQueries({ queryKey: [QUERYKEY.ADMINCOURSE] });
    },
    onError(error: AxiosError) {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    },
    onSettled() {
      setSelectedId("");
      setOpenDelete(false);
    },
  });

  const { isLoading: isUpdating, mutate: updateCourse } = useMutation({
    mutationFn: updateAdminCourses,
    onSuccess(data) {
      if (data.status !== "success") {
        enqueueSnackbar(`${data.message}`, {
          variant: "error",
        });
        return;
      }

      enqueueSnackbar("Successfully Updated", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: [QUERYKEY.ADMINCOURSE] });
    },
    onError(err: AxiosError) {
      enqueueSnackbar(`${err.message}`, {
        variant: "error",
      });
    },
    onSettled() {
      setSelectedId("");
      setOpenEdit(false);
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    updateCourse({
      courseId: data.course,
      districtId: data.district,
      experience: data.experience,
      residential: data.stt,
      target: data.target,
      id: selectedId,
    });
  };

  const handleDeleteClickOpen = (id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditClickOpen = (data: Data, id: string) => {
    setOpenEdit(true);

    setValue("course", data.pklCourseId ? data.pklCourseId.toString() : "");
    setValue(
      "district",
      data.pklDistrictId ? data.pklDistrictId.toString() : ""
    );
    setValue("experience", data.vsQualificationExperience);
    setValue("stt", data.bResidential ? data.bResidential.toString() : "");
    setValue("target", data.iTarget ? data.iTarget.toString() : "");
    setSelectedId(id);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="admin courses table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>District Name</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Residential</TableCell>
              <TableCell>Qualification Experience</TableCell>
              <TableCell>Target</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!tableData && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
            {tableData?.map((row) => (
              <TableRow
                key={row.pklLogId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="body2">{row.pklLogId}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.vsDistrictName}</Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="body2">{row.vsCourseName}</Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="body2">
                    {row.bResidential ? "Yes" : "No"}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    paragraph
                    align="left"
                    color="GrayText"
                  >
                    {row.vsQualificationExperience}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.iTarget}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={() =>
                      handleEditClickOpen(row, row.pklLogId.toString())
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClickOpen(`${row.pklLogId}`)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete Record</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this course record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <LoadingButton
            loading={isLoading}
            onClick={() => mutate(selectedId)}
            autoFocus
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleEditClickOpen}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <Grid
            container
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={2}
            sx={{ mt: 2 }}
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
              <Stack
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button onClick={handleEditClose}>Cancel</Button>
                <LoadingButton type="submit" loading={isUpdating}>
                  Submit
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
