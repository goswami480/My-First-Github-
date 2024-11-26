import React, { useState } from 'react';
import axios from 'axios';

function FindUser() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getuser/${email}`);  // Use params in URL
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err.response?.data?.message || err.message);
      setUser(null);
      setError(err.response?.data?.message || 'Error fetching user');
    }
  };
  

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        backgroundColor: 'cornflowerblue',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: ' cornflowerblue',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Find User by Email</h2>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>

        {user && (
          <div style={{ marginTop: '20px' }}>
            <h3>User Details</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        )}

        {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      </div>
    </div>
  );
}

export default FindUser;
