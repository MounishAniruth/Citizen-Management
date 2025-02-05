import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Citizen Management
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Citizen Management System
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: "600px", mx: "auto" }}>
          This system is designed to manage citizen data efficiently. It allows
          administrators to oversee citizen records and enables users to
          register and access services seamlessly.
        </Typography>
      </Container>
    </>
  );
};

export default HomePage;
