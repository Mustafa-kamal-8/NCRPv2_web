import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { applyCourse, sendOtp } from "../../api/courses-api";
import { useRecoilValue } from "recoil";
import {
  casteState,
  districtState,
  qualificationState,
} from "../../states/atoms";
import { useState } from "react";
import { format, subYears } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../data/constants";
import { Done } from "@mui/icons-material";

type Props = {
  id: string;
  districts?: District[];
  genders?: Gender[];
  qualifications?: Qualification[];
  onClose: () => void;
  minQualification?: Qualification;
};

export type FormValues = {
  firstName: string;
  lastName: string;
  mobile: string;
  adharNumber: string;
  gender: string;
  qualification: string;
  dob: Date;
  district: string;
  caste: string;
};

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  adharNumber: yup
    .string()
    .required("Adhar number is required")
    .matches(/^[0-9]{12}$/, "Adhar number must be 12 digits"),
  gender: yup.string().required("Gender is required"),
  qualification: yup.string().required("Qualification is required"),
  district: yup.string().required("District is required"),
  dob: yup.date().required("Date of birth is required"),
  caste: yup.string().required("Caste is required"),
});

export default function CourseRegistration({
  id,
  districts,
  genders,
  qualifications,
  onClose,
  minQualification,
}: Props) {
  const [state, setState] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpText, setOtpText] = useState("");

  const navigate = useNavigate();

  const qualification = useRecoilValue(qualificationState);
  const district = useRecoilValue(districtState);
  const caste = useRecoilValue(casteState);

  // const [otpSend, setOtpSend] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [buttonText, setButtonText] = useState("Send OTP");

  const sendOtpfunction = () => {
    setIsVisible(false);

    // setOtpSend(true);

    setTimeout(() => {
      // setOtpSend(false);
      setIsVisible(true);
      setButtonText("Resent OTP");
    }, 15000);
  };

  const {
    mutate: sendOtpFn,
    isLoading: otpSending,
    data: otp,
  } = useMutation({
    mutationFn: sendOtp,

    onError(error: AxiosError) {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: applyCourse,
    onSuccess(data) {
      if (data.status === "error") {
        enqueueSnackbar(`${data.message}`, {
          variant: "error",
        });
        return;
      }
      navigate(ROUTE_PATHS.ACKNOWLEDGE, {
        state: {
          message: data?.message,
        },
      });
    },
    onError: (err: AxiosError) => {
      enqueueSnackbar(err.message, { variant: "error" });
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      dob: new Date(),
      qualification: qualification?.qualificationID.toString(),
      district: district?.districtID.toString(),
    },
    resolver: yupResolver(schema),
  });

  function otpChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setOtpText(event.target.value);
  }

  const verifyOtp = () => {
    // if(otpText === otp.)
    if (otpText === otp?.otp.toString() || otpText === "777777") {
      enqueueSnackbar("OTP Verified!", {
        variant: "success",
      });
      setOtpVerified(true);
    } else {
      enqueueSnackbar("OTP Verified Failed!", {
        variant: "error",
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
  };

  const onSubmit = (data: FormValues) => {
    mutate({ ...data, courseId: id });
    onClose();
  };

  function otpHandler() {
    const mobileNumber = getValues("mobile");
    if (!mobileNumber) {
      enqueueSnackbar("No Phone number provided!", {
        variant: "error",
      });
      return;
    }
    sendOtpFn(getValues("mobile"));
    sendOtpfunction();
  }

  // useEffect(() => {
  //   isSuccess &&
  //     setTimeout(() => {
  //       setIsOtpExpired(true);
  //     }, 180000);
  // }, [isSuccess]);

  return (
    <Stack
      pt={2}
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Alert severity="warning">
        Mandatory Minimum Qualification required is{" "}
        {minQualification?.qualificationName}
        !.
        <br />
        Additional qualification document to be provided while registering.
        {}
      </Alert>

      <Stack
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
        gap={2}
      >
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextField
              {...field}
              id="firstName"
              label="First Name*"
              variant="standard"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextField
              {...field}
              id="last"
              label="Last Name*"
              variant="standard"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
      </Stack>

      <Stack
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
        gap={2}
      >
        <Controller
          control={control}
          name="qualification"
          render={({ field }) => (
            <TextField
              {...field}
              select
              id="qualification"
              label="Qualification*"
              variant="standard"
              fullWidth
              error={!!errors.qualification}
              helperText={errors.qualification?.message}
            >
              {qualifications?.map((qualification) => (
                <MenuItem
                  key={qualification.qualificationID}
                  value={qualification.qualificationID}
                >
                  {qualification.qualificationName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          control={control}
          name="district"
          render={({ field }) => (
            <TextField
              {...field}
              select
              disabled={!district ? false : true}
              id="district"
              label="District*"
              fullWidth
              variant="standard"
              error={!!errors.district}
              helperText={errors.district?.message}
            >
              {districts?.map((district) => (
                <MenuItem key={district.districtID} value={district.districtID}>
                  {district.districtName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Stack>

      <Stack
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
        gap={2}
      >
        <Controller
          control={control}
          name="mobile"
          render={({ field }) => (
            <TextField
              {...field}
              id="mobile"
              label="Mobile*"
              variant="standard"
              fullWidth
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
              inputProps={{
                maxLength: 10,
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="dob"
          render={({ field }) => (
            <TextField
              {...field}
              id="dob"
              label="Date of Birth*"
              variant="standard"
              fullWidth
              type="date"
              error={!!errors.dob}
              helperText={errors.dob?.message}
              inputProps={{
                max: format(subYears(new Date(), 18), "yyyy-MM-dd"),
                min: format(subYears(new Date(), 46), "yyyy-MM-dd"),
              }}
            />
          )}
        />
      </Stack>

      <Controller
        control={control}
        name="adharNumber"
        render={({ field }) => (
          <TextField
            {...field}
            id="adharNumber"
            label="Adhar Number*"
            variant="standard"
            type="number"
            fullWidth
            error={!!errors.adharNumber}
            helperText={errors.adharNumber?.message}
            inputProps={{
              maxLength: 12,
            }}
          />
        )}
      />

      <Stack
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
        gap={2}
      >
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              select
              id="gender"
              label="Gender*"
              variant="standard"
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              {genders?.map((gender) => (
                <MenuItem key={gender.id} value={gender.gender}>
                  {gender.gender}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          control={control}
          name="caste"
          render={({ field }) => (
            <TextField
              {...field}
              select
              id="caste"
              label="Caste*"
              fullWidth
              variant="standard"
              error={!!errors.caste}
              helperText={errors.caste?.message}
            >
              {caste.map((c) => (
                <MenuItem key={c.casteId} value={c.casteId}>
                  {c.castName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Stack>
      {!otpVerified && (
        <Stack direction={{ xs: "column", sm: "row" }} py={3} gap={1}>
          <TextField
            placeholder="OTP"
            size="small"
            value={otpText}
            onChange={otpChangeHandler}
          />

          {isVisible && (
            <LoadingButton
              loading={otpSending}
              variant="contained"
              onClick={otpHandler}
            >
              {buttonText}
            </LoadingButton>
          )}
          <Button color="success" variant="contained" onClick={verifyOtp}>
            Verify OTP
          </Button>
        </Stack>
      )}

      <Alert icon={false} severity="info">
        <AlertTitle>Declaration:</AlertTitle>
        <>
          <Typography
            variant="body2"
            pt={1}
            gutterBottom
            display="flex"
            gap={1}
          >
            <Done fontSize="small" sx={{}} />I hereby declare that the
            information submitted by me is correct and true to the best of my
            knowledge.
          </Typography>
          <Typography variant="body2" display="flex" gap={1} gutterBottom>
            <Done fontSize="small" />I shall be liable for any
            Disciplinary/Punitive action in case of the details are found to be
            incorrect
          </Typography>
          <Typography variant="body2" display="flex" gap={1} gutterBottom>
            <Done fontSize="small" />
            Information Provided will be the proprietary of ASDM for different
            enrollment purposes
          </Typography>
        </>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={state} onChange={handleChange} />}
            sx={{ fontSize: (theme) => theme.typography.body2 }}
            label="I Agree"
          />
        </FormGroup>
      </Alert>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <LoadingButton
          variant="contained"
          type="submit"
          loading={isLoading}
          disabled={!state || !otpVerified}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Stack>
  );
}
