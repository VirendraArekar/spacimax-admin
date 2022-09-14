/* eslint-disable react/prop-types */
import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export default function ReportCard({
  title,
  stats: {
    floors,
    fireAlarmReported,
    hazardReported,
    guardOnSite,
    incidentReported,
    breakInReported,
  },
}) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box
        sx={{
          p: "20px",
          boxShadow: "0px 2px 4px 3px rgba(0, 0, 0, 0.08)",
          borderRadius: "10px",
          bgcolor: "#fff",
          color: "#202E43",
          mx: 5,
          "&:hover": {
            backgroundColor: "#2A4556",
            color: "white",
            fontWeight: "medium",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "23px",
                pb: "20px",
                textTransform: "capitalize",
                fontWeight: 400,
                lineHeight: "30px",
                paddingBottom: {
                  xs: 7,
                },
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Grid container rowSpacing={2} justifyContent="space-between">
              <Grid item md={6}>
                <InfoComponent infoText="Floor" infoCount={floors} />
              </Grid>
              <Grid item md={6}>
                <InfoComponent
                  infoCount={guardOnSite}
                  infoText="Guards on Site"
                />
              </Grid>
              <Grid item md={6}>
                <InfoComponent
                  infoText="Fire Alarms Reported"
                  infoCount={fireAlarmReported}
                />
              </Grid>
              <Grid item md={6}>
                <InfoComponent
                  infoCount={incidentReported}
                  infoText="Incident Reported"
                />
              </Grid>
              <Grid item md={6}>
                <InfoComponent
                  infoText=" Hazard Reported"
                  infoCount={hazardReported}
                />
              </Grid>

              <Grid item md={6}>
                <InfoComponent
                  infoCount={breakInReported}
                  infoText="Break Ins Reported"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

function InfoComponent({ infoCount, infoText }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        "&:hover": {
          color: "white !important",
          fontWeight: "medium",
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          minWidth: "30px",
          textAlign: "center",
        }}
      >
        {infoCount}
      </Typography>
      <Typography
        sx={{
          textTransform: "capitalize",
          fontSize: "14px",
          fontWeight: 400,
        }}
        variant="body2"
      >
        {infoText}
      </Typography>
    </Box>
  );
}
