import React from "react";
import { Box, Grid } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
// import ModernCalender from "../../../common/ModernCalender";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./style.css";
import LocalDateSelector from "../../../common/LocalDateSelector";

export default function CustomReportPage() {
  const users = [
    {
      id: 1,
      name: "Final Alarm Report",
      reportDate: "27 Apr 2022",
      siteNumber: "9052379",
      address: "111, ABC Street, Sydney",
      desc: "Fired alarm occurred on level 12",
    },
    {
      id: 2,
      name: "Final Alarm Report 2",
      reportDate: "27 Apr 2022",
      siteNumber: "9052379",
      address: "111, ABC Street, Sydney",
      desc: "Fired alarm",
    },
    {
      id: 3,
      name: "Final Alarm Report",
      reportDate: "27 Apr 2022",
      siteNumber: "9052379",
      address: "111, ABC Street, Sydney",
      desc: "Fired alarm occurred on level 10",
    },
    {
      id: 4,
      name: "Final Alarm Report",
      reportDate: "27 Apr 2022",
      siteNumber: "9052379",
      address: "111, ABC Street, Sydney",
      desc: "Fired alarm occurred on level 12",
    },
    {
      id: 5,
      name: "",
      reportDate: "",
      siteNumber: "",
      address: "",
      desc: "",
    },
    {
      id: 6,
      name: "",
      reportDate: "",
      siteNumber: "",
      address: "",
      desc: "",
    },
    {
      id: 7,
      name: "",
      reportDate: "",
      siteNumber: "",
      address: "",
      desc: "",
    },
  ];

  const sites = [
    { id: 1, name: "111,ABC Street,Sydney" },
    { id: 2, name: "112,ABC Street,Sydney" },
    { id: 3, name: "113,ABC Street,Sydney" },
    { id: 4, name: "114,ABC Street,Sydney" },
    { id: 5, name: "115,ABC Street,Sydney" },
  ];

  const reports = [
    { id: 1, name: "Report 1" },
    { id: 2, name: "Report 2" },
    { id: 3, name: "Report 3" },
    { id: 4, name: "Report 4" },
    { id: 5, name: "Report 5" },
  ];

  const [selectedSite, setSelectedSite] = React.useState("");
  const [selectedReport, setSelectedReport] = React.useState("");

  const changeSite = (event: SelectChangeEvent) => {
    setSelectedSite(event.target.value);
  };

  const changeReport = (event: SelectChangeEvent) => {
    setSelectedReport(event.target.value);
  };

  const handleChangePage = () => {};

  const handleChangeRowsPerPage = () => {};

  const TablePaginationActions = () => {};

  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Reports" subTitle="Custom Reports" />
      <Grid
        container
        className="sort-box"
        sx={{ mx: "0.4rem", mt: "5rem", pr: "2rem" }}
      >
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
            <Select
              value={selectedReport}
              onChange={changeReport}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderColor: "#707070",
              }}
            >
              <MenuItem value="">
                <div className="select-item">Select Report</div>
              </MenuItem>
              {reports.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
            <Select
              value={selectedSite}
              onChange={changeSite}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderColor: "#707070",
              }}
            >
              <MenuItem value="">
                <div className="select-item">Select Site</div>
              </MenuItem>
              {sites.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: "90%" }}>
            <LocalDateSelector title="Start Date" />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: "90%" }}>
            <LocalDateSelector title="End Date" />
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" sx={{ my: "2rem" }}>
        <TableContainer component={Paper} sx={{ mx: "0.8rem" }}>
          {/* <div style={{width: 'auto', overflowX: 'scroll'}}> */}
          <Table
            sx={{ minWidth: "auto" }}
            aria-label="custom pagination table"
            className="responsive-table"
          >
            <TableHead>
              <TableRow className="table-header">
                <TableCell align="left" component="th" className="t-cell">
                  Report Name
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Date Reported
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Site Number
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Site Address
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Report Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="left" className="t-body-cell">
                    {item.name}
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    {item.reportDate}
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    {item.siteNumber}
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    {item.address}
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    {item.desc}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {/* <TableCell className="t-body-cell" direction="column" justifycontent="center" colSpan={2}>
                      <Link href="#" underline="none" >
                         <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'

                        }}>
                            
                            <span className="add-title">Add Guard</span>
                            <AddCircleIcon className="add-icon" fontSize="large"/>
                        </div>  
                      </Link>
                    </TableCell> */}
                <TablePagination
                  align="right"
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={users.length}
                  rowsPerPage={10}
                  page={0}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
          {/* </div> */}
        </TableContainer>
      </Box>
    </Box>
  );
}
