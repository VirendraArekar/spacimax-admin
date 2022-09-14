/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { grey, red } from "@mui/material/colors";
import LoginBgImage from "../../../assets/images/login.jpg";
import { selectAuth } from "../../../features/auth/authSlices";
import { loginUser, loginUserOtp } from "../../../features/auth/authAPI";
import { Controller, useForm } from "react-hook-form";

function Login() {
  const navigateTo = useNavigate();
  const { state } = useLocation();

  const { loading, error, isAuthenticated } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = (form) => {
    dispatch(loginUser({ ...form, otp: parseInt(form.otp) }));
  };


  const handleUserOtp = (form) => {
    dispatch(loginUserOtp({ ...form}))
  }

  useEffect(() => {
    if (isAuthenticated) return navigateTo(state?.path || "/");
  }, [isAuthenticated]);

  return (
    <Box sx={{ height: "100vh", display: "flex", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={0} md={7}>
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              flexGrow: 2,
              backgroundColor: "#E0E7FF",
              backgroundImage: `url(${LoginBgImage})`,
              backgroundSize: "100%",
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            justifyContent="center"
            flexDirection="column"
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} justifyContent="center" display="flex">
                <Typography
                  component="h4"
                  variant="h3"
                  fontWeight="700"
                  color={grey[900]}
                >
                  SpaciMax Pro
                </Typography>
              </Grid>
              <Grid item xs={12} justifyContent="center" display="flex">
                <Typography component="h6" variant="h5" color={grey[800]}>
                  Client Login
                </Typography>
              </Grid>
            </Grid>
            {error && (
              <Alert severity="error">Login Failed! Try Again {error}</Alert>
            )}
            <Grid
              container
              spacing={2}
              justifyContent="center"
              my={3}
              component="form"
            >
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name={"email"}
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid Email Address",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Email"
                      variant="standard"
                      type="email"
                      required
                      onChange={onChange}
                      value={value}
                      sx={{ borderColor: red[100] }}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email?.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="otp"
                  control={control}
                  rules={{
                    required: "An OTP is Required",
                    minLength: {
                      value: 4,
                      message: "Value can't be more than 4!",
                    },
                    maxLength: {
                      value: 4,
                      message: "Value can't be less than 4!",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      id="otp"
                      variant="standard"
                      name="otp"
                      type="number"
                      required
                      onChange={onChange}
                      value={value}
                      error={!!errors.otp}
                      helperText={errors.otp ? errors.otp?.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="end" display="flex">
                <Button sx={{ float: "right"}} onClick={handleUserOtp}>OTP</Button>
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Button sx={{ float: "left" }} onClick={handleSubmit(handleUserOtp)}>Resend OTP</Button>
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Typography component="p" variant="subtitle2" color={grey[500]}>
                  We will send you an One Time Password on your email
                </Typography>
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Button
                  sx={{
                    float: "right",
                    mt: 2,
                    backgroundColor: "#42505C",
                    color: "white",
                    px: 5,
                    "&:hover": {
                      backgroundColor: "#343636",
                    },
                  }}
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
