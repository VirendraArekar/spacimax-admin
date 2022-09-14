import React, { useEffect } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import "./style.css";

function LocalTimeSelector(props) {
  useEffect(() => {
    // console.log(props)
  }, [props]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopTimePicker
        value={props.value}
        onChange={props.onChange || function () {}}
        style={{
          borderRadius: "10px !important",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px !important",
          borderColor: "#707070 !important",
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => (
          <TextField sx={{ background: "white !important" }} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

export default LocalTimeSelector;
