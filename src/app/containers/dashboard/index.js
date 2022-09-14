/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import React from "react";
import PageTitle from "../../common/PageTitle";
import ReportCard from "../../components/dashboard/ReportCard";

function DashboardPage() {
  const reports = [
    {
      id: 1,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
    {
      id: 2,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
    {
      id: 3,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
    {
      id: 4,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
    {
      id: 5,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
    {
      id: 6,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
    {
      id: 7,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
    {
      id: 8,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
    {
      id: 9,
      title: "111, ABC Street, Sydney",
      stats: {
        floors: 32,
        fireAlarmReported: 0,
        hazardReported: 0,
        guardOnSite: 2,
        incidentReported: 1,
        breakInReported: 0,
      },
    },
  ];
  return (
    <Box>
      <PageTitle title="Dashboard View" />
      <Grid container rowSpacing={6} columnSpacing={{ xs: 0 }}>
        {reports.map((report) => (
          <ReportCard
            title={report.title}
            stats={report.stats}
            key={report.id}
          />
        ))}
      </Grid>
    </Box>
  );
}
export default DashboardPage;
