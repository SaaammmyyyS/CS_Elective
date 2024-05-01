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
import Userabout from "@/widgets/layout/userabout";
import Usersettings from "@/widgets/layout/usersettings";

export function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const [emailUpdated, setEmailUpdated] = useState(false);

  useEffect(() => {
    fetchData();
  }, [emailUpdated]);

  const url = `http://localhost:8000/api/user`;
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();

      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [activeTab, setActiveTab] = useState("userAbout");
  const handleSettings = () => {
    setActiveTab("settings");
  };
  const handleAbout = () => {
    setActiveTab("userAbout");
  };

  const handleEmailUpdate = () => {
    emailUpdated ? setEmailUpdated(false) : setEmailUpdated(true);
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 border border-blue-gray-100 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h4">{userInfo.name} </Typography>
                <Typography variant="paragraph">{userInfo.email} </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="userAbout">
                <TabsHeader>
                  <Tab value="userAbout" onClick={handleAbout}>
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Profile
                  </Tab>
                  <Tab value="settings" onClick={handleSettings}>
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>

          <div>
            {activeTab === "userAbout" ? (
              <Userabout userInfo={userInfo} />
            ) : (
              <Usersettings
                userInfo={userInfo}
                onEmailUpdate={handleEmailUpdate}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
