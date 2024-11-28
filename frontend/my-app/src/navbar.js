import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './navbar.css';

export default function Navbar() {
  const [data, setData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({ email: '', phone: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get('http://localhost:3000/allusers')
      .then((response) => {
        if (Array.isArray(response.data.Users)) {
          setData(response.data.Users);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleEdit = (id) => {
    const userToEdit = data.find((item) => item._id === id);
    setEditUser(userToEdit);
    setIsModalOpen(true);
  };

  const validateFields = (user) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    const emailError = !emailRegex.test(user.email) ? 'Invalid email format' : '';
    const phoneError = !phoneRegex.test(user.phone) ? 'Phone number must be 10 digits' : '';

    setErrors({ email: emailError, phone: phoneError });
    return !emailError && !phoneError;
  };

  const handleSaveEdit = () => {
    if (editUser) {
      const isValid = validateFields(editUser);
      if (isValid) {
        axios
          .put(`http://localhost:3000/updateuser/${editUser._id}`, editUser)
          .then((response) => {
            console.log('User updated successfully', response.data);
            setSuccessMessage('User updated successfully!');
            setIsModalOpen(false);
            window.location.reload();
            setTimeout(() => {
              setSuccessMessage('');
            }, 3000);
          })
          .catch((error) => {
            console.error('There was an error updating the user!', error);
          });
      }
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      axios
        .delete(`http://localhost:3000/deleteuser/${id}`)
        .then((response) => {
          setData(data.filter((user) => user._id !== id));
        })
        .catch((error) => {
          console.error('There was an error deleting the user!', error);
          alert('An error occurred while deleting the user.');
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
    validateFields({ ...editUser, [name]: value });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Data Table</h2>
      {successMessage && (
        <div style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>
          {successMessage}
        </div>
      )}
      <table
        border="1"
        style={{
          width: '100%',
          textAlign: 'left',
          borderCollapse: 'collapse',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f2f2f2',
              color: '#333',
              fontWeight: 'bold',
              borderBottom: '2px solid #ddd',
            }}
          >
            <th style={{ padding: '10px 15px' }}>ID</th>
            <th style={{ padding: '10px 15px' }}>Name</th>
            <th style={{ padding: '10px 15px' }}>Email</th>
            <th style={{ padding: '10px 15px' }}>Address</th>
            <th style={{ padding: '10px 15px' }}>Phone</th>
            <th style={{ padding: '10px 15px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item._id}>
                <td style={{ padding: '8px 15px' }}>{item._id}</td>
                <td style={{ padding: '8px 15px' }}>{item.name}</td>
                <td style={{ padding: '8px 15px' }}>{item.email}</td>
                <td style={{ padding: '8px 15px' }}>{item.address}</td>
                <td style={{ padding: '8px 15px' }}>{item.phone}</td>
                <td style={{ padding: '8px 15px', textAlign: 'center' }}>
                  <button onClick={() => handleEdit(item._id)} style={{ marginRight: '10px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>

      {/* Modal for editing user */}
      {isModalOpen && editUser && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%',
            }}
          >
            <h3>Edit User</h3>
            <input
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleChange}
              placeholder="Name"
              style={{ margin: '10px 0', padding: '8px', width: '100%' }}
            />
            <input
              type="email"
              name="email"
              value={editUser.email}
              onChange={handleChange}
              placeholder="Email"
              style={{ margin: '10px 0', padding: '8px', width: '100%' }}
            />
            <span style={{ color: 'red' }}>{errors.email}</span>
            <input
              type="text"
              name="address"
              value={editUser.address}
              onChange={handleChange}
              placeholder="Address"
              style={{ margin: '10px 0', padding: '8px', width: '100%' }}
            />
            <input
              type="text"
              name="phone"
              value={editUser.phone}
              onChange={handleChange}
              placeholder="Phone"
              style={{ margin: '10px 0', padding: '8px', width: '100%' }}
            />
            <span style={{ color: 'red' }}>{errors.phone}</span>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                onClick={handleSaveEdit}
                style={{
                  marginRight: '10px',
                  backgroundColor: 'green',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
