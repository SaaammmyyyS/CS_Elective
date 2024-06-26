import {
  Typography,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  PencilIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import DeleteUser from "@/widgets/ui/DeleteUser";
import { ProfileInfoCard } from "@/widgets/cards";
import { platformSettingsData } from "@/data";

const Userabout = ({ userInfo }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <div className="mb-12 grid grid-cols-1 gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Platform Settings
          </Typography>
          <div className="flex flex-col gap-12">
            {platformSettingsData.map(({ title, options }) => (
              <div key={title}>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  {title}
                </Typography>
                <div className="flex flex-col gap-12">
                  {options.map(({ checked, label }) => (
                    <div key={label}>
                      {label === "Delete Account" && !showDeleteModal ? (
                        <Button
                          onClick={() => setShowDeleteModal(true)}
                          variant="text"
                          color="red"
                          size="sm"
                          className="transition-colors hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white active:bg-red-600 active:text-white"
                        >
                          {label}
                        </Button>
                      ) : label === "Delete Account" && showDeleteModal ? (
                        <DeleteUser setShowDeleteModal={setShowDeleteModal} />
                      ) : (
                        <div className="flex items-center">
                          <Switch
                            id={label}
                            label={label}
                            defaultChecked={checked}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProfileInfoCard
          title="Profile Information"
          description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
          details={{
            "first name": userInfo.name,
            mobile: "(44) 123 1234 123",
            email: userInfo.email,
            location: "USA",
            social: (
              <div className="flex items-center gap-4">
                <i className="fa-brands fa-facebook text-blue-700" />
                <i className="fa-brands fa-twitter text-blue-400" />
                <i className="fa-brands fa-instagram text-purple-500" />
              </div>
            ),
          }}
          action={
            <Tooltip content="Edit Profile">
              <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
            </Tooltip>
          }
        />

      </div>
    </>
  );
};

export default Userabout;
