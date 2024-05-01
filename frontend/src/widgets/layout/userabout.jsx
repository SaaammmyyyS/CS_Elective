import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import DeleteUser from "@/widgets/ui/DeleteUser";
import { Link, json } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";

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
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Platform Settings
          </Typography>
          <ul className="flex flex-col gap-6">
            {conversationsData.map((props) => (
              <MessageCard
                key={props.name}
                {...props}
                action={
                  <Button variant="text" size="sm">
                    reply
                  </Button>
                }
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="px-4 pb-4">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Projects
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-500">
          Architects design houses
        </Typography>
        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          {projectsData.map(
            ({ img, title, description, tag, route, members }) => (
              <Card key={title} color="transparent" shadow={false}>
                <CardHeader
                  floated={false}
                  color="gray"
                  className="mx-0 mb-4 mt-0 h-64 xl:h-40"
                >
                  <img
                    src={img}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="px-1 py-0">
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {tag}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2 mt-1"
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {description}
                  </Typography>
                </CardBody>
                <CardFooter className="mt-6 flex items-center justify-between px-1 py-0">
                  <Link to={route}>
                    <Button variant="outlined" size="sm">
                      view project
                    </Button>
                  </Link>
                  <div>
                    {members.map(({ img, name }, key) => (
                      <Tooltip key={name} content={name}>
                        <Avatar
                          src={img}
                          alt={name}
                          size="xs"
                          variant="circular"
                          className={`cursor-pointer border-2 border-white ${
                            key === 0 ? "" : "-ml-2.5"
                          }`}
                        />
                      </Tooltip>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Userabout;
