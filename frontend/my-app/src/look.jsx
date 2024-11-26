import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Grid } from "@mui/material";
import axios from "axios";
import './look.css'


const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/signup", formData);
      setMessage(response.data.message);
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
  <>
   <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
   <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Management</h2>
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
                {loading ? "Submitting..." : "Add USer"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  
</div>
</>  
 );
};

export default SignupForm;
