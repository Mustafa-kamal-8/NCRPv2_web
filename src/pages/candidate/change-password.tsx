import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Container, Box , IconButton, InputAdornment } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePassword: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://ncrpv2.skillmissionassam.org/nw/modify/otp', {
        mobile: phoneNumber,
      });
      if (response.data.status==="success") {
        setOtpSent(true);
    
        toast.success('OTP sent successfully!');
      } else {
        toast.error(`Failed to send OTP: ${response.data.message}`);
      }
    } catch (error) {
      toast.error('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = () => {
    // Logic to verify OTP
    toast.success("OTP submitted successfully!");
  };


  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://ncrpv2.skillmissionassam.org/nw/reset', {
        mobile: phoneNumber,
        otp: otp,
        password: password,
      });

      if (response.data.status==="success") {
        toast.success('Password reset successfully!');
        setTimeout(() => {
            navigate("/auth/candidate-login");
          }, 500);
        // Additional logic if needed after successful password reset
      } else {
        toast.error(`Failed to reset password: ${response.data.message}`);
      }
    } catch (error) {
      toast.error('Error resetting password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
       
      <ToastContainer 
        position="top-center" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <Box mt={4}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom sx={{marginBottom:"80px"}}>
          Change Password
        </Typography>

        {/* Phone Number Field and Send OTP Button */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="Phone Number"
              variant="outlined"
              disabled={otpSent}
              fullWidth
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSendOtp}
            
              disabled={phoneNumber.length !== 10 || otpSent || loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </Grid>
        </Grid>

        {/* OTP Field and OTP Submit Button */}
        {otpSent && (
          <>
            {/* OTP Field and OTP Submit Button */}
            <Grid container spacing={2} alignItems="center" mt={2}>
              <Grid item xs={8}>
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  fullWidth
                  value={otp}
                  onChange={handleOtpChange}
                  inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '0.5rem' } }}
                />
              </Grid>
              {/* <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 6}
                >
                  Submit OTP
                </Button>
              </Grid> */}
            </Grid>

            {/* Password and Confirm Password Fields */}
            <Box mt={2}>
              <TextField
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: "15px" }}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              />
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              />
            </Box>

            {/* Submit Button */}
            <Box mt={4}>
              <Button
                variant="contained"
                sx={{marginBottom:"80px"}}
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={!password || !confirmPassword || password !== confirmPassword}
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ChangePassword;