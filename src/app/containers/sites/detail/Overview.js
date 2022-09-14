import React from "react";
import { Box, Grid } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import SiteOverviewCard from "../../../components/sites/Overview";
import LocalDateSelector from "../../../common/LocalDateSelector";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

export default function SitesOverviewPage() {
  const [StartValue, setStartValue] = React.useState(null);
  const [endValue, setEndValue] = React.useState(null);

  const sitesOverview = [
    {
      id: 1,
      title: "Total Fixed Labour Hours",
      count: 0,
    },

    {
      id: 2,
      title: "Total Casual Labour Hours",
      count: 0,
    },
    {
      id: 3,
      title: "Total Lost Time",
      count: 0,
    },
    {
      id: 4,
      title: "Total Failed Check-Ins",
      count: 0,
    },
    {
      id: 5,
      title: "Fire Alarms Reported",
      count: 0,
    },
    {
      id: 6,
      title: "Break-Ins Reported",
      count: 0,
    },
    {
      id: 7,
      title: "Incidents Reported",
      count: 0,
    },
    {
      id: 8,
      title: "Bomb Threats Reported",
      count: 0,
    },
    {
      id: 9,
      title: "Suspicious Activity Reported",
      count: 0,
    },
    {
      id: 10,
      title: "Other Profile",
      count: 0,
    },
  ];
  return (
    <Box>
      <PageTitle
        title="Sites View"
        subTitle="111, ABC Street, Sydney / Site Overview"
      />
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" columnGap={5} mb={5} ml={4}>
          {/* <LocalDateSelector title="Start Date" /> */}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Start Date"
              value={StartValue}
              onChange={(newValue) => {
                setStartValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/* <LocalDateSelector title="Finish Date" /> */}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Finish Date"
              value={endValue}
              onChange={(newValue) => {
                setEndValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <Grid container rowSpacing={7} columnSpacing={{ xs: 1 }}>
          {sitesOverview.map((report) => (
            <SiteOverviewCard
              title={report.title}
              subTitle={report.count}
              key={report.id}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
