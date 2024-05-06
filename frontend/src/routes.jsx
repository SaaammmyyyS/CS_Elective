import {
  HomeIcon,
  UserCircleIcon,
  BriefcaseIcon,
  TableCellsIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  UserList,
  Jobscrape,
} from "@/pages/dashboard";
import IndeedScrape from "./pages/dashboard/indeed-scrape";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <UserList />,
      },
      {
        icon: <BriefcaseIcon {...icon} />,
        name: "jobscrape",
        path: "/jobscrape",
        element: <Jobscrape />,
      },
      {
        icon: <BookmarkIcon {...icon} />,
        name: "indeed",
        path: "/Indeed",
        element: <IndeedScrape />,
      },
    ],
  }
];

export default routes;
