import React from "react";
import { Typography } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AuthLayout from "../../layouts/auth-layout";
import { Link, useNavigate } from "react-router-dom";
import useFilters from "../../hooks/useFilters";
// import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { registerCandidate } from "../../api/candidate-api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { qualificationState } from "../../states/atoms";
import { enqueueSnackbar } from "notistack";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { parse } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = yup.object({
  dob: yup
    .string()
    .required("Date of Birth is required in the YYYY-MM-DD format"),
});

export default function getDate() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    register,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: null,
      aadharNumber: "",
      phoneNumber: "",
      qualification: "",
      gender: "",
      caste: "",
      // district1: "",
      // district2: "",
      // district3: "",
      // state1: "",
      // state2: "",
      // state3: "",
      // country: "",
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}></form>
      <Button
        type="submit"
        variant="contained"
        // disabled={formState.isSubmitting}
        fullWidth
      >
        Get Date
      </Button>
    </>
  );
}
