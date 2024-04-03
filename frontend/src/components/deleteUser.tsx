import React, { useState, useEffect } from 'react';
import Navbar from './navbar'; // Import the Navbar component

const DeleteUser = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string>('');
  const [token, setToken] = useState<string | null>(null); // State to hold the JWT token

  useEffect(() => {
    const jwtToken = getCookie('jwt'); // Retrieve JWT token from cookies
    setToken(jwtToken); // Set the token state
  }, []);

  const handleDelete = async () => {
    try {
      if (!confirmDelete) {
        const confirmed = window.confirm(
          'Are you sure you want to delete your account? This action cannot be undone.'
        );
        if (confirmed) {
          setConfirmDelete(true);
        }
        return;
      }

      if (!token) {
        throw new Error('No jwt token found in cookies');
      }

      const response = await fetch('http://localhost:8000/api/user/delete/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', // Include credentials (cookies) in the request
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('='));
    const cookie = cookies.find(([cookieName]) => cookieName === name);
    return cookie ? cookie[1] : null;
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-md shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <p className="mb-6">
            {confirmDelete
              ? 'Are you absolutely sure? This action cannot be undone.'
              : 'This action will permanently delete your account. Proceed with caution.'}
          </p>
          <button
            onClick={handleDelete}
            className={`w-full py-2 rounded-md font-semibold transition duration-300 
                        ${confirmDelete ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-500 text-gray-100 hover:bg-gray-600'
              }`}
          >
            {confirmDelete ? 'Confirm Delete' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
