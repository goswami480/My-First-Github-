import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Navbar() {
  const [data, setData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page

  useEffect(() => {
    axios
      .get('http://localhost:3000/allusers')
      .then((response) => {
        console.log('Full Response:', response);
        console.log('Response Data:', response.data);

        if (Array.isArray(response.data.Users)) {
          setData(response.data.Users);
        } else {
          console.warn('Users data is not an array:', response.data.Users);
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

  const handleSaveEdit = () => {
    if (editUser) {
      axios
        .put(`http://localhost:3000/updateuser/${editUser._id}`, editUser)
        .then((response) => {
          console.log('User updated successfully');
          const updatedData = data.map((item) =>
            item._id === editUser._id ? response.data : item
          );
          setData(updatedData);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error('There was an error updating the user!', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteuser/${id}`)
      .then((response) => {
        console.log('User deleted:', response.data);
        setData(data.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error('There was an error deleting the user!', error);
        alert('An error occurred while deleting the user.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  // Pagination logic
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
                  <button
                    onClick={() => handleEdit(item._id)}
                    style={{ marginRight: '10px' }}
                  >
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

      {/* Pagination Controls */}
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
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleChange}
            />
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={editUser.email}
              onChange={handleChange}
            />
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={editUser.address}
              onChange={handleChange}
            />
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={editUser.phone}
              onChange={handleChange}
            />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
