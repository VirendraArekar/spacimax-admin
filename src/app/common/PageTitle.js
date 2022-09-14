import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

// eslint-disable-next-line react/prop-types
function PageTitle({ title, subTitle }) {
  return (
    <Box display="flex" justifyContent="start" flexDirection="column" mb={8}>
      <Typography component="h5" variant="h5" color={grey[700]} ml={5} mt={2}>
        {title}
      </Typography>
      {subTitle && (
        <Typography component="h6" variant="h6" color={grey[500]} ml={5} mb={4}>
          {subTitle}
        </Typography>
      )}
    </Box>
  );
}

export default PageTitle;
