import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../services/api";

const LoginPage = () => {
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({ user_name: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { user_name: formData.user_name, password: formData.password, userType };

    if (userType === "admin") {
      loginData.unique_id = formData.unique_id;
    }

    try {
      const response = await axios.post("/login", loginData);

      if (response.status === 200) {
        alert("Login successful");

        // Redirect based on user type
        if (userType === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4">Login</Typography>
        <ToggleButtonGroup 
          value={userType} 
          exclusive 
          onChange={(e, newType) => newType && setUserType(newType)}
        >
          <ToggleButton value="admin">Admin</ToggleButton>
          <ToggleButton value="user">User</ToggleButton>
        </ToggleButtonGroup>
        <form onSubmit={handleLogin}>
          <TextField fullWidth margin="normal" label="User Name or Email" name="user_name" onChange={handleChange} required />
          <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} required />
          {userType === "admin" && (
            <TextField fullWidth margin="normal" label="Unique ID" name="unique_id" onChange={handleChange} required />
          )}
          <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
