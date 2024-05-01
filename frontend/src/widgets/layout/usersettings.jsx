import React, { useEffect, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Usersettings = ({ userInfo, onEmailUpdate }) => {
  const [inputEnable, setInputEnable] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleEditEmail = async () => {
    if (!inputEnable) {
      setInputEnable(true);
    } else {
      try {
        const token = Cookies.get("jwt");
        const newData = { email: newEmail };
        const response = await fetch(`http://localhost:8000/api/user`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newData),
        });

        if (!response.ok) {
          toast.warning("Email already exists!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          throw new Error("Failed to update user");
        }

        const updatedUser = await response.json();

        toast.success("Successfully updated your email!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setInputEnable(false);
        onEmailUpdate();
        return updatedUser;
      } catch (error) {
        console.error("Error updating user:", error.message);
        throw error;
      }
    }
  };

  useEffect(() => {
    setIsValidEmail(validateEmail(newEmail));
  }, [newEmail]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (e) => {
    const email = e.target.value;
    setNewEmail(email);
  };

  return (
    <>
      <div className="m-auto grid grid-cols-3 gap-x-2 gap-y-5">
        <div className="">
          <Typography variant="h5">Email</Typography>
          <Typography>{userInfo.email}</Typography>
        </div>

        <div className=""></div>

        <div className=""></div>
        <div className="flex space-x-2">
          <Input
            id="email"
            placeholder={inputEnable ? "" : userInfo.email}
            label={inputEnable ? "Enter new email" : ""}
            aria-expanded={inputEnable ? "true" : "false"}
            //{...(inputEnable ? { enabled: true } : { disabled: true })}
            disabled={inputEnable ? 0 : 1}
            onChange={handleInputChange}
          />

          {inputEnable ? (
            <Button
              className="align-center w-36"
              id="editEmailBtn"
              onClick={handleEditEmail}
              disabled={!isValidEmail ? 1 : 0}
            >
              Save
            </Button>
          ) : (
            <Button
              className="align-center w-36"
              id="editEmailBtn"
              onClick={handleEditEmail}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Usersettings;
