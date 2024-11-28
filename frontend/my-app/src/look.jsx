import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Grid } from "@mui/material";
import axios from "axios";
import './look.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Regex for email and phone validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
  // Validate a single field in real-time
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!value.trim() || !emailRegex.test(value)) error = "Enter a valid email address.";
        break;
      case "password":
        if (!value.trim() || !passwordRegex.test(value)) {
          error = "Password must be at least 8 characters, including 1 letter , 1 number and 1 special character";
        }
        break;
      case "address":
        if (!value.trim()) error = "Address is required.";
        break;
      case "phone":
        if (!value.trim() || !phoneRegex.test(value)) error = "Enter a valid 10-digit phone number.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Handle input changes with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value); // Validate the field on change
  };

  // Check for any errors in the entire form before submission
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    return Object.values(errors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/signup", formData);
      setMessage(response.data.message);
      // window.location.reload();
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      }); // Reset form fields
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Management</h1>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "3rem",
            backgroundColor: "lightgreen",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "600", color: "#333" }}>
            Add User
          </Typography>

          {message && (
            <Typography
              variant="body1"
              color={message.includes("Error") ? "error" : "success"}
              gutterBottom
              sx={{ fontSize: "1rem", textAlign: "center", marginBottom: "1rem" }}
            >
              {message}
            </Typography>
          )}

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  autoFocus
                  sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                  sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
                  multiline
                  rows={4}
                  sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                  sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "grey" },
                    borderRadius: "8px",
                    padding: "12px",
                    fontWeight: "600",
                  }}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Add User"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default AddUser;
