import React from "react";
import { Box, MenuItem, FormControl, Select } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";

import PageTitle from "../../common/PageTitle";
import { Link } from "react-router-dom";

export default function ViewAdvertisedShiftsPage() {
  const [selectedStatus, setSelectedStatus] = React.useState({
    shiftStatus: "",
    alarmStatus: "",
  });

  const onChange = (event) => {
    setSelectedStatus({
      [event.target.name]: event.target.value,
      ...selectedStatus,
    });
  };

  const status = [
    {
      id: 1,
      label: "Booked",
    },
    {
      id: 2,
      label: "Expression of Interest Received",
    },
  ];

  const advertisedShifts = [
    {
      id: 1,
      site: "033650",
      start: "24 May 2022",
      finish: "25 May 2022",
      status: "Blocked",
      guard: "Sam Smith",
      license: "View",
      profile: "View",
      action: "Reassign",
    },
    {
      id: 2,
      site: "098776",
      start: "24 May 2022",
      finish: "25 May 2022",
      status: "Expression of Interest Received",
      guard: "Sam Smith",
      license: "View",
      profile: "View",
      action: "Approve/Cancel",
    },
    {},
  ];

  const alarmShifts = [
    {
      id: 1,
      site: "033650",
      start: "20:30",
      finish: "21:30",
      status: "Blocked",
      guard: "Sam Smith",
      license: "View",
      profile: "Dispatched",
      action: "Reassign",
    },
    {
      id: 2,
      site: "098776",
      start: "20:30",
      finish: "21:30",
      status: "Expression of Interest Received",
      guard: "Sam Smith",
      license: "View",
      profile: "View",
      action: "Reassign",
    },
    {},
  ];
  return (
    <Box>
      <PageTitle title="Scheduler" subTitle="View Advertised Shifts" />
      <Box ml={4}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: "25%" }}>
            <Select
              value={selectedStatus.shiftStatus}
              onChange={onChange}
              displayEmpty
              name="shiftStatus"
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderColor: "#707070",
                pl: 2,
              }}
            >
              <MenuItem value="">
                <div className="select-item">Status</div>
              </MenuItem>
              {status.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box my={5} />
          <TableContainer component={Paper} sx={{ mx: "0.8rem" }}>
            <Table
              sx={{ minWidth: "auto" }}
              aria-label="custom pagination table"
              className="responsive-table"
            >
              <TableHead>
                <TableRow className="table-header">
                  <TableCell
                    align="left"
                    component="th"
                    className="t-cell"
                    style={{ width: "13%" }}
                  >
                    Site
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Start Date
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Finish Date
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Status
                  </TableCell>
                  <TableCell
                    align="left"
                    component="th"
                    className="t-cell"
                    tyle={{ width: "8%" }}
                  >
                    Guard
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    View License
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    View Profile
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {advertisedShifts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="left" className="t-body-cell">
                      {item.site}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      {item.start}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      {item.finish}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="t-body-cell"
                      style={{ width: "20%" }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      <Link
                        to="#"
                        underline="always"
                        style={{ color: "black" }}
                      >
                        {item.guard}
                      </Link>
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      <Link to="#" underline="always" className="file-class">
                        {item.license}
                      </Link>
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      <Link to="#" underline="always" className="file-class">
                        {item.profile}
                      </Link>
                    </TableCell>
                    <TableCell align="center" className="t-body-cell">
                      <Link to="#" underline="always" className="file-class">
                        {item.action}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box my="7%" ml={-4}>
          <PageTitle title="View Alarm Response" />
        </Box>

        <Box my={10} mb="10%">
          <FormControl sx={{ m: 1, minWidth: "25%" }}>
            <Select
              value={selectedStatus.alarmStatus}
              onChange={onChange}
              displayEmpty
              name="alarmStatus"
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderColor: "#707070",
                pl: 2,
              }}
            >
              <MenuItem value="">
                <div className="select-item">Status</div>
              </MenuItem>
              {status.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box my={5} />

          <TableContainer component={Paper} sx={{ mx: "0.8rem" }}>
            <Table
              sx={{ minWidth: "auto" }}
              aria-label="custom pagination table"
              className="responsive-table"
            >
              <TableHead>
                <TableRow className="table-header">
                  <TableCell
                    align="left"
                    component="th"
                    className="t-cell"
                    style={{ width: "13%" }}
                  >
                    Site
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Start Time
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Finish Time
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Status
                  </TableCell>
                  <TableCell
                    align="left"
                    component="th"
                    className="t-cell"
                    tyle={{ width: "8%" }}
                  >
                    Guard
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    View License
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    View Profile
                  </TableCell>
                  <TableCell align="left" component="th" className="t-cell">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alarmShifts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="left" className="t-body-cell">
                      {item.site}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      {item.start}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      {item.finish}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="t-body-cell"
                      style={{ width: "20%" }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      <Link
                        to="#"
                        underline="always"
                        style={{ color: "black" }}
                      >
                        {item.guard}
                      </Link>
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      <Link to="#" underline="always" className="file-class">
                        {item.license}
                      </Link>
                    </TableCell>
                    <TableCell align="left" className="t-body-cell">
                      <Link to="#" underline="always" className="file-class">
                        {item.profile}
                      </Link>
                    </TableCell>
                    <TableCell align="center" className="t-body-cell">
                      <Link to="#" underline="always" className="file-class">
                        {item.action}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
