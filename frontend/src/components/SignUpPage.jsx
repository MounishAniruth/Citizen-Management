import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    user_name: "",
    email_or_phone: "",
    password: "",
    confirm_password: "",
    unique_id: "", // Admin only
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const endpoint = userType === "admin" ? "/signup/admin" : "/signup/user";
      await axios.post(endpoint, formData);
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      alert("Error signing up: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4">Sign Up</Typography>
        
        <FormControl fullWidth margin="normal">
          <InputLabel>User Type</InputLabel>
          <Select value={userType} onChange={handleUserTypeChange}>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="User Name" name="user_name" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Email or Phone" name="email_or_phone" onChange={handleChange} required />
          <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} required />
          <TextField fullWidth margin="normal" type="password" label="Confirm Password" name="confirm_password" onChange={handleChange} required />
          
          {/* Show Unique ID field only for admins */}
          {userType === "admin" && (
            <TextField fullWidth margin="normal" label="Admin Unique ID" name="unique_id" onChange={handleChange} required />
          )}

          <Button fullWidth variant="contained" color="primary" type="submit">Sign Up</Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
