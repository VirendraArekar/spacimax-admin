import React from "react";
import { Grid, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function SiteDetailCard({ title, large, url = null }) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Grid container sx={{ px: 4, mr: 3 }}>
        <Grid item xs={10}>
          <Box
            py={large ? 8 : 5}
            display="flex"
            justifyContent="center"
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 2px 4px 3px rgba(0, 0, 0, 0.08)",
              borderRadius: "10px 0 0 10px",
              px: {
                xs: 4,
                md: 1,
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "25px",
                m: "auto 0",
                textTransform: "capitalize",
                fontWeight: 400,
                lineHeight: "30px",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={url !== null ? url : "#"}
              >
                {title}
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box
            py={3}
            mr={isTablet ? 0 : 2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            component={Link}
            to={url !== null ? url : "#"}
            sx={{
              backgroundColor: "#42505C",
              height: "100%",
              boxShadow: "0px 2px 4px 3px rgba(0, 0, 0, 0.08)",
              borderRadius: "0 10px  10px 0",
              width: {
                xs: "60%",
                sm: "80%",
              },
            }}
          >
            <ArrowForwardIcon
              fontSize="small"
              style={{
                stroke: "#ffffff",
                strokeWidth: "2px",
                fill: "#fff",
                fontSize: "1rem",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
