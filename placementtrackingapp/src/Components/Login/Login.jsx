import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Mastercard from "../../Images/Mastercard-logo.png";
import MandE from "../../Images/MandE.png";
import Derejalogo from "../../Images/Derejalogo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignInClick = async (event) => {
    event.preventDefault();

    // Validation
    const emailPattern =
      /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailPattern.test(email);

    setEmailError(!isValidEmail);
    setPasswordError(password.length < 8);

    if (!isValidEmail || password.length < 8) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const result = await response.json();
      if (result && result.responseData && result.responseData.token) {
        localStorage.setItem("token", result.responseData.token);
        navigate("/admin");
      } else {
        setErrorMessage(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: 500,
          marginBottom: 3,
        }}
      >
        <img src={Derejalogo} alt="Ministry Logo" style={{ height: 60 }} />
        <img src={MandE} alt="Dereja Logo" style={{ height: 60 }} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSignInClick}
        sx={{
          width: "90%",
          maxWidth: 500,
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#ff6600" }}
        >
          Sign In
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "Please Enter a Valid Email Address" : ""}
          InputLabelProps={{ style: { color: "#555555" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ff6600" },
              "&:hover fieldset": { borderColor: "#ff6600" },
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          helperText={
            passwordError ? "Password must be at least 8 characters" : ""
          }
          InputLabelProps={{ style: { color: "#555555" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ff6600" },
              "&:hover fieldset": { borderColor: "#ff6600" },
            },
          }}
        />
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#ff6600",
            color: "white",
            fontWeight: "bold",
            marginTop: 3,
            "&:hover": { backgroundColor: "#C95F2C" },
          }}
        >
          Sign In
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          maxWidth: 500,
          marginTop: 4,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          In partnership with
        </Typography>
        <img
          src={Mastercard}
          alt="Mastercard Foundation Logo"
          style={{ height: 50 }}
        />
        <Typography variant="body2" color="textSecondary">
          Powered by Dereja
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
