import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { IconButton } from "@mui/material";

type Type = "text" | "password" | "number" | "date";
import { Control, Controller } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  autoFocus?: boolean;
  type?: Type;
  control: any;
  autoComplete?: string | undefined;
  fullWidth?: boolean;
  multiline?: boolean;
  disabled?: boolean;
}

export default function Input({
  label,
  placeholder,
  control,
  autoFocus = false,
  type = "text",
  name,
  autoComplete = "true",
  fullWidth = true,
  multiline = false,
  disabled = false,
}: InputProps) {
  const [show, setShow] = React.useState(false);
  const [inputType, setInputType] = React.useState(type);

  const toggleShow = () => setShow((prev) => !prev);

  React.useEffect(() => {
    if (show) setInputType("text");
    else setInputType(type);
  }, [show]);

  return (
    <div>
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            error={!!error?.message}
            fullWidth={fullWidth}
            onChange={onChange}
            helperText={error ? error.message : null}
            placeholder={placeholder}
            autoFocus={autoFocus}
            type={inputType}
            autoComplete={autoComplete}
            multiline={multiline}
            minRows={multiline ? 3 : undefined}
            disabled={disabled}
            InputProps={{
              endAdornment: type === "password" && (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShow}>
                    {show ? (
                      <RemoveRedEyeRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={value}
          />
        )}
      />
    </div>
  );
}
