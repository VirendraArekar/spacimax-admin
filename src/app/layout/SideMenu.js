import React from "react";
import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
import { Box, ListSubheader } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  Map as MapIcon,
  ListAlt,
  Schedule,
  Report,
  Security,
  Dangerous,
  HealthAndSafety,
  Pages,
  Notifications,
  Quiz,
  SupportAgent,
  Logout,
  House,
} from "@mui/icons-material";
import ListItemLink from "../common/ListItemLink";

function SideMenu() {
  const dashboardMenus = [
    {
      primary: "Dashboard",
      to: "/",
      icon: <DashboardIcon />,
    },
    {
      primary: "Sites",
      to: "/sites",
      icon: <House />,
    },
    {
      primary: "Guards",
      to: "/guards",
      icon: <Security />,
    },
    {
      primary: "Trackers",
      to: "/trackers",
      icon: <MapIcon />,
    },
    {
      primary: "Timesheets",
      to: "/timesheets",
      icon: <ListAlt />,
    },
    {
      primary: "Scheduler",
      to: "/scheduler",
      icon: <Schedule />,
    },
    {
      primary: "Reports",
      to: "/reports",
      icon: <Report />,
    },
    // {
    //   primary: "Users",
    //   to: "/users",
    //   icon: <PeopleIcon />,
    // },
    {
      primary: "Alert Information",
      to: "/alert-information",
      icon: <Dangerous />,
    },
    {
      primary: "Safety Tips",
      to: "/safety-tips",
      icon: <HealthAndSafety />,
    },
    {
      primary: "App Page",
      to: "#",
      icon: <Pages />,
    },
    {
      primary: "Notification",
      to: "/notifications",
      icon: <Notifications />,
    },
    {
      primary: "FAQ's",
      to: "/faq",
      icon: <Quiz />,
    },
    {
      primary: "Support",
      to: "/supports",
      icon: <SupportAgent />,
    },
    {
      primary: "Task",
      to: "/tasks/list",
      icon: <AssignmentIcon />,
    },
    {
      primary: "Log Out",
      to: "/login",
      icon: <Logout />,
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        pb: 5,
      }}
    >
      <List
        component="nav"
        subheader={
          <ListSubheader
            sx={{
              fontSize: "larger",
              fontWeight: "700",
              lineHeight: "normal",
              my: 3,
            }}
            component="p"
            id="nested-list-subheader"
          >
            Super Admin
          </ListSubheader>
        }
      >
        {dashboardMenus.slice(0, 2).map(({ primary, to, icon }) => (
          <ListItemLink primary={primary} to={to} icon={icon} key={primary} />
        ))}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader
            sx={{
              fontSize: "larger",
              fontWeight: "700",
              my: 1,
              marginBottom: 4,
            }}
            component="p"
            id="nested-list-subheader"
          >
            Company
          </ListSubheader>
        }
      >
        {dashboardMenus.slice(2).map(({ primary, to, icon }) => (
          <ListItemLink primary={primary} to={to} icon={icon} key={primary} />
        ))}
      </List>
    </Box>
  );
}

export default SideMenu;
