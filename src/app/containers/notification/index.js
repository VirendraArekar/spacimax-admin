import React from "react";
import { Box, Grid, TextareaAutosize, Typography, Button } from "@mui/material";
import PageTitle from "../../common/PageTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import LocalDateSelector from "../../common/LocalDateSelector";

import "./style.css";

export default function NotificationPage() {
  const [selectedStartTime, setSelectedStartTime] = React.useState("");

  const changeStartTime = (event: SelectChangeEvent) => {
    setSelectedStartTime(event.target.value);
  };

  const notifications = [
    {
      id: 1,
      notification: "Notification 1",
      site: "0909132",
      startTime: "06:00",
      endTime: "07:00",
      note: "Patrol guard to check external areas and report any issues.",
    },
    {
      id: 2,
      notification: "Notification 1",
      site: "0909132",
      startTime: "06:00",
      endTime: "07:00",
      note: "Patrol guard to check external areas and report any issues.",
    },
  ];

  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Notifications" />
      <Box
        display="flex"
        className="box-container"
        sx={{ mx: "0.5rem", p: "2rem" }}
      >
        <Grid container className="grid-row">
          <Grid item xs={2}>
            <Typography variant="h6" component="h6">
              Notification :
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="Type notification here"
              className="txt-input"
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: "2rem" }}>
            <Typography variant="h6" component="h6">
              Appointment Recurrence :
            </Typography>
          </Grid>

          <Grid item xs={3} sx={{ my: "1rem" }}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={selectedStartTime}
                onChange={changeStartTime}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="select-item">Start Time</div>
                </MenuItem>
                <MenuItem value={1} key={1}>
                  Test
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3} sx={{ my: "1rem" }}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={selectedStartTime}
                onChange={changeStartTime}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="select-item">Finish Time</div>
                </MenuItem>
                <MenuItem value={1} key={1}>
                  Test
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3} sx={{ my: "1rem" }}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={selectedStartTime}
                onChange={changeStartTime}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="select-item">Duration</div>
                </MenuItem>
                <MenuItem value={1} key={1}>
                  Test
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3} sx={{ my: "1rem" }}></Grid>

          <Grid item xs={12} sx={{ my: "1rem" }}>
            <Typography variant="h6" component="h6">
              Recurrence Pattern:
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <div className="btn-row">
              <Button variant="outlined" className="row-btn">
                Daily
              </Button>
              <Button variant="outlined" className="row-btn">
                Weekly
              </Button>
              <Button variant="outlined" className="row-btn">
                Monthly
              </Button>
              <Button variant="outlined" className="row-btn">
                Yearly
              </Button>
              <Button variant="outlined" className="row-btn">
                Every Day(1)
              </Button>
              <Button variant="outlined" className="row-btn">
                Every Weekday
              </Button>
              <Button variant="outlined" className="row-btn">
                Every Weekend
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} sx={{ my: "1rem", mt: "2rem" }}>
            <Typography variant="h6" component="h6">
              Range of Recurrence :
            </Typography>
          </Grid>

          <Grid item xs={3} sx={{ my: "1rem", mt: "2rem" }}>
            <LocalDateSelector title="Start Date" />
          </Grid>

          <Grid item xs={5} sx={{ my: "1rem", mt: "2rem" }}>
            <div className="btn-row">
              <Button variant="outlined" className="row-btn">
                End By
              </Button>
              <Button variant="outlined" className="row-btn">
                End After
              </Button>
              <Button variant="outlined" className="row-btn">
                No End Date
              </Button>
            </div>
          </Grid>
          <Grid item xs={4} sx={{ my: "1rem", mt: "2rem" }}></Grid>

          <Grid item xs={12} sx={{ my: "1rem", mt: "3rem" }}>
            <div className="btn-row-center">
              <Button
                variant="outlined"
                className="row-btn"
                sx={{ mx: "3rem" }}
              >
                Ok
              </Button>
              <Button variant="outlined" className="row-btn">
                Cancel
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" sx={{ my: "3rem" }}>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mb: "2rem" }}>
          <div style={{ width: "auto", overflowX: "scroll" }}>
            <Table
              sx={{ minWidth: "auto" }}
              aria-label="custom pagination table"
              className="responsive-table"
            >
              <TableHead>
                <TableRow className="table-header">
                  <TableCell align="left" component="th" className="t-cell">
                    Notification
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Site
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Start Time
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    End Time
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Site Notes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" className="t-body-cell">
                      {item.notification}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      {item.site}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      {item.startTime}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      {item.endTime}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      {item.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </Box>
    </Box>
  );
}
