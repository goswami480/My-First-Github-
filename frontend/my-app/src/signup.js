import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address:"",
    phone: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",

  });

  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation on input changes
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setError((prevState) => ({
          ...prevState,
          email: "Please enter a valid email address.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
    }

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setError((prevState) => ({
          ...prevState,
          password:
            "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          password: "",
        }));
      }
    }
    if (name === "phone") {
      if (!phoneRegex.test(value)) {
        setError((prevState) => ({
          ...prevState,
          phone:
            "phone must be 10 digits.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          phone: "",
        }));
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setError((prevState) => ({
          ...prevState,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          confirmPassword: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    // Validate on submit (ensuring password and email fields are valid)
    if (!emailRegex.test(formData.email)) {
      setError((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError((prevState) => ({
        ...prevState,
        password:
          "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.",
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/add", formData);

      if (response.status === 201) {
        setSuccess("Account created successfully! You can now log in.");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      setError({ general: "Failed to create an account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {error.email && <p className="text-danger">{error.email}</p>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error.password && <p className="text-danger">{error.password}</p>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error.confirmPassword && <p className="text-danger">{error.confirmPassword}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Phone</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="Enter your password"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {error.phone && <p className="text-danger">{error.phone}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="address"
              id="address"
              name="address"
              className="form-control"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
           
          </div>

          {error.general && <p className="text-danger text-center">{error.general}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <small>Already have an account? <a href="/login">Log in</a></small>
        </div>
      </div>
    </div>
  );
};

export default Signup;
