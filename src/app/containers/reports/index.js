import React from "react";
import { Box, Grid } from "@mui/material";
import PageTitle from "../../common/PageTitle";
import SiteDetailCard from "../../components/sites/DetailCard";

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Custom Reports",
      url : '/custom/reports'
    },

    {
      id: 2,
      title: "Portfolio Reports",
      url : '/portfolio/reports'
    },
    {
      id: 3,
      title: "Shift Reports",
      url : '/shift/reports'
    },
    {
      id: 4,
      title: "Incident Reports",
      url : '/incident/reports'
    },
  ];
  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Reports" />
      <Box display="flex">
        <Grid
          container
          rowSpacing={7}
          columnSpacing={{ xs: 1 }}
          alignContent="center"
          justifyContent="center"
          alignItems="center"
          mt="15%"
        >
          {reports.map((report) => (
            <SiteDetailCard large title={report.title} key={report.id} url={report.url} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
