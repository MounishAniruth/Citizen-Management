import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "../services/api";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email_or_phone: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("/signup", formData);
      alert("Signup successful");
    } catch (error) {
      alert("Error signing up");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="User Name" name="user_name" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Email or Phone" name="email_or_phone" onChange={handleChange} required />
          <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} required />
          <TextField fullWidth margin="normal" type="password" label="Confirm Password" name="confirm_password" onChange={handleChange} required />
          <Button fullWidth variant="contained" color="primary" type="submit">Sign Up</Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;