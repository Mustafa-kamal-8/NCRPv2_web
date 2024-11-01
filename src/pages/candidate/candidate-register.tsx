import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { registerCandidate } from "../../api/candidate-api";
import Input from "../../components/ui/input";
import AuthLayout from "../../layouts/auth-layout";
import { ROUTE_PATHS } from "../../data/constants";
import Select from "react-select";
import { useState } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import dayjs, { Dayjs } from "dayjs";
// import LocalizationProvider from "@mui/x-date-pickers/LocalizationProvider";
// import AdapterDayjs from "@mui/x-date-pickers/AdapterDayjs";
// import DatePicker from "@mui/x-date-pickers/DatePicker";

const schema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  // lastName: z.string().min(1, { message: "Last Name is required" }),
  // aadhar: z.string().min(1, { message: "Aadhar number is required" }),
  // phone: z.string().min(10, { message: "Phone number is required" }),
  // password: z.string().min(1, { message: "Enter a password" }),
  // confirm: z.string().min(1, { message: "Confirm your password" }),
  // qualification: z.string().min(1, { message: "Qualification is required" }),
  // gender: z.string().min(1, { message: "Gender is required" }),
  caste: z.string().min(1, { message: "Caste is required" }),
});
// .refine((data) => data.password === data.confirm, {
//   message: "Passwords don't match",
//   path: ["confirm"],
// });

export default function CandidateRegister() {
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      aadhar: "",
      password: "",
      confirm: "",
      qualification: "",
      caste: "",
      gender: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: registerCandidate,
    onSuccess(data: any) {
      toast.success(data?.message);
      navigate("/auth/candidate-login");
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleRegisterClick = () => {
    console.log("Selected Date:", selectedDate);
  };

  const onSubmit = (data: any) => {
    // mutate({
    //   contactNumber: data.phone,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   password: data.password,
    //   aadhar: data.aadhar,
    //   qualification: data.qualification,
    //   gender: data.gender,
    //   caste: data.caste,
    // });

    console.log("These are the submitted form data", data);
  };




  return (
    <AuthLayout
      title="Start for free Today"
      subTitle="Register"
      description="Access to all features. No credit card required."
    >

      <Stack gap={ 2 } pt={ 4 } component="form" onSubmit={ handleSubmit(onSubmit) }>
        <Typography variant="h6" fontWeight={ 400 } color="primary">
          Basic Details
        </Typography>

        <Input
          control={ control }
          name="phone"
          label="Phone Number *"
          placeholder="Please Enter Your Phone Number"
          autoFocus={ true }
          autoComplete="true"
          type="number"
        />
        <Input
          control={ control }
          name="firstName"
          label="First Name *"
          placeholder="Please Enter Your First Name"
          autoFocus={ true }
          autoComplete="true"
        />


        {/* <label>Date:</label> */ }

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Basic date picker" />
          </DemoContainer>
        </LocalizationProvider> */}
        <Input
          control={ control }
          name="lastName"
          label="Last Name *"
          placeholder="Please Enter Your Last Name"
          autoFocus={ true }
          autoComplete="true"
        />
        <Input
          control={ control }
          name="aadhar"
          label="Aadhar Number *"
          placeholder="Please Enter Your Aadhar Number"
          autoFocus={ true }
          autoComplete="true"
          type="text"
        />

        <Input
          control={ control }
          name="qualification"
          label="Qualification *"
          placeholder="Please Enter Your Qualification"
          autoFocus={ true }
          autoComplete="true"
          type="text"
        />
        <Input
          control={ control }
          name="gender"
          label="Gender *"
          placeholder="Please Enter your Gender"
          autoFocus={ true }
          autoComplete="true"
          type="text"
        />
        <Input
          control={ control }
          name="caste"
          label="Caste *"
          placeholder="Please Enter your Caste"
          autoFocus={ true }
          autoComplete="true"
          type="text"
        />
        <LoadingButton
          loading={ isLoading }
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Register
        </LoadingButton>
      </Stack>

      <Stack gap={ 2 } pt={ 4 } component="form" onSubmit={ handleSubmit(onSubmit) }>
        <Typography variant="h6" fontWeight={ 400 } color="primary">
          Course Details
        </Typography>
      </Stack>

      <Stack gap={ 2 } pt={ 4 } component="form" onSubmit={ handleSubmit(onSubmit) }>
        <Typography variant="h6" fontWeight={ 400 } color="primary">
          Placement Preference
        </Typography>
      </Stack>

      <Typography align="center" py={ 2 } color="GrayText" variant="body2">
        Already have an Account?{ " " }
        <Button
          component={ Link }
          to="/auth/candidate-login"
          size="small"
          sx={ { fontWeight: 500 } }
        >
          Login
        </Button>
      </Typography>
    </AuthLayout>
  );
}
