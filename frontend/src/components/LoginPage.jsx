import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "../services/api";

const LoginPage = () => {
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({ user_name: "", password: "", unique_id: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/login", { ...formData, userType });
      alert("Login successful");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4">Login</Typography>
        <ToggleButtonGroup value={userType} exclusive onChange={(e, newType) => setUserType(newType || "user")}> 
          <ToggleButton value="admin">Admin</ToggleButton>
          <ToggleButton value="user">User</ToggleButton>
        </ToggleButtonGroup>
        <form onSubmit={handleLogin}>
          <TextField fullWidth margin="normal" label="User Name or Email" name="user_name" onChange={handleChange} required />
          <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} required />
          {userType === "admin" && <TextField fullWidth margin="normal" label="Unique ID" name="unique_id" onChange={handleChange} required />}
          <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;