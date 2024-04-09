import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";

const DeleteUser = ({ setShowDeleteModal }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const jwtToken = getCookie("jwt");
    setToken(jwtToken);
  }, []);

  const handleDelete = async () => {
    try {
      if (!confirmDelete) {
        setConfirmDelete(true);
        return;
      }

      if (!token) {
        throw new Error("No jwt token found in cookies");
      }

      const response = await fetch("http://localhost:8000/api/user/delete/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleCancel = () => {
    if (confirmDelete) {
      setConfirmDelete(false);
    } else {
      setShowDeleteModal(false);
    }
  };

  const getCookie = (name) => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("="));
    const cookie = cookies.find(([cookieName]) => cookieName === name);
    return cookie ? cookie[1] : null;
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="max-w-md w-full bg-white rounded-md shadow-lg p-8 space-y-4">
        <Typography
          tag="h2"
          color="blue-gray"
          size="xl"
          fontWeight="semibold"
        >
          Delete Account
        </Typography>
        {error && <Typography color="red" size="sm">{error}</Typography>}
        <Typography>
          {confirmDelete
            ? "Are you absolutely sure? This action cannot be undone."
            : "This action will permanently delete your account. Proceed with caution."}
        </Typography>
        <div className="flex gap-4">
          <Button
            onClick={handleDelete}
            color={confirmDelete ? "red" : "gray"}
            size="lg"
            ripple="light"
            rounded={true}
          >
            {confirmDelete ? "Confirm Delete" : "Delete Account"}
          </Button>
          <Button
            onClick={handleCancel}
            color={confirmDelete ? "blue-gray" : "gray"}
            size="lg"
            ripple="light"
            rounded={true}
          >
            {confirmDelete ? "Back" : "Cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
