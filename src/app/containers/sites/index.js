import { Alert, Box, Grid, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSites } from "../../../features/sites/sitesAPI";
import { selectSites } from "../../../features/sites/sitesSlice";

import PageTitle from "../../common/PageTitle";
import SiteCard from "../../components/sites/SiteCard";

function SitePage() {
  const { loading, error, data } = useSelector(selectSites);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSites());
  }, []);
  return (
    <Box>
      <PageTitle title="Sites View" />
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: "24px",
            pl: 4,
            ml: "3px",
            mb: 5,
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: {
                xs: "80%",
                md: "40%",
                lg: "31%",
              },
            }}
            height={118}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: {
                xs: "80%",
                md: "40%",
                lg: "31%",
              },
            }}
            height={118}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: {
                xs: "80%",
                md: "40%",
                lg: "31%",
              },
            }}
            height={118}
          />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container rowSpacing={7} columnSpacing={3} pl={5}>
        {data.map((site) => (
          <SiteCard
            title={`${site.name}, ${site.address}, ${site.city}`}
            key={site._id}
            id={site._id}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default SitePage;
