/* eslint-disable react/prop-types */
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SiteCard({ title, id }) {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Box
        component={Link}
        to={`${id}`}
        sx={{
          px: 4,
          py: 6,
          pb: {
            lg: 6,
            xs: 12,
            sm: 7,
          },
          mr: 3,
          display: "flex",
          boxShadow: "0px 2px 4px 3px rgba(0, 0, 0, 0.08)",
          borderRadius: "10px",
          bgcolor: "#fff",
          alignContent: "center",
          justifyContent: "center",
          color: "#202E43",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#2A4556",
            color: "white",
            fontWeight: "medium",
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "25px",
            textTransform: "capitalize",
            fontWeight: 400,
            lineHeight: "30px",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Grid>
  );
}
