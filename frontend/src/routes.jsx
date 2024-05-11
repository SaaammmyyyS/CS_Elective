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
  IndeedScrape,
} from "@/pages/dashboard";

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
        name: "jobstreet",
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
  },
];

export default routes;
