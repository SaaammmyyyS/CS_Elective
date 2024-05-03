import React, { useEffect, useState } from "react";
import {
  Typography,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ConfirmDialog from "../ui/confirmation";

const Usersettings = ({ userInfo, onEmailUpdate }) => {
  const [inputEnable, setInputEnable] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);

  const updateEmail = async () => {
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
  };
  const handleEditEmail = async () => {
    if (!inputEnable) {
      setInputEnable(true);
    } else {
      setOpenConfirmation(true);
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

  const handleConfirmation = () => setOpenConfirmation(!openConfirmation);

  const handleUserConfirmed = (Confirmed) => {
    setUserConfirmed(Confirmed);
    if (Confirmed) {
      updateEmail();
    }
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

      <Dialog open={openConfirmation} handler={handleConfirmation}>
        <DialogHeader>Are you sure?</DialogHeader>
        <DialogBody>
          This action will permanently replace your email.
        </DialogBody>
        <DialogFooter className="space-x-5">
          <Button color="red" onClick={handleConfirmation}>
            Cancel
          </Button>
          <Button
            onClick={(event) => {
              handleConfirmation(event);
              handleUserConfirmed(true);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Usersettings;
