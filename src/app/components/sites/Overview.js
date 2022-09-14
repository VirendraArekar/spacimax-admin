/* eslint-disable react/prop-types */
import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export default function SiteOverviewCard({ title, subTitle }) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Grid container sx={{ px: 4 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              px: 4,
              py: 6,
              display: "flex",
              boxShadow: "0px 2px 4px 3px rgba(0, 0, 0, 0.08)",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#202E43",
              backgroundColor: "#DAEEEF",
              rowGap: "35px",
              "&:hover": {
                backgroundColor: "#2A4556",
                color: "white",
                fontWeight: "medium",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textTransform: "capitalize",
                lineHeight: "25px",
                fontWeight: "600",
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                textTransform: "capitalize",
                fontWeight: "800",
                lineHeight: "30px",
              }}
            >
              {subTitle}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
