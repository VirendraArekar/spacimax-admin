import React from "react";
import {
  Box,
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TableCell,
  FormControl,
  FormLabel,
  Button,
  TextField,
} from "@mui/material";
import PageTitle from "../../common/PageTitle";
import BasicSelector from "../../common/Selector";
import { makeStyles } from "@mui/styles";
import LocalDateSelector from "../../common/LocalDateSelector";

const useStyles = makeStyles(() => ({
  inputRoot: {
    borderRadius: "10px !important",
    backgroundColor: "white",
    padding: "0 5px",
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
    "& .MuiOutlinedInput-input": {
      padding: "14px !important",
    },
  },
  buttoRoot: {
    borderColor: "#707070 !important;",
    color: "#202E43 !important;",
    borderRadius: "8px !important;",
    fontSize: "16px  !important;",
    textTransform: "none !important;",
    padding: "5px 30px !important;",
    marginRight: "15px !important;",
    "&:hover": {
      backgroundColor: " #42505C !important;",
      color: "white !important",
    },
  },
}));

export default function CreateAlarmResponse() {
  const classes = useStyles();
  const role = [
    "Manager",
    "Asst.Manager",
    "Controller",
    "Rover",
    "Static",
    "Loss Prevention",
    "Engineer/Techincian",
    "Investigator",
    "Analyst",
    "Other",
  ];

  const sites = [
    {
      id: "1",
      site: "Branch 1",
      startTime: "HH:MM",
      finishTime: "HH:MM",
      sitesNote:
        "check front door is locked.Conduct external check.Report alarms and incidents",
    },
    {
      id: "2",
      site: "Branch 2",
      startTime: "HH:MM",
      finishTime: "HH:MM",
      sitesNote:
        "check front door is locked.Conduct external check.Report alarms and incidents",
    },
  ];
  return (
    <Box>
      <PageTitle title={"Scheduler"} subTitle={"Create Alarm Response"} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
        mx={5}
      >
        <BasicSelector
          disableAll={true}
          options={role}
          selectorHight={"53px"}
          value={role}
          name={"Select Role"}
          selectorWidth={"350px"}
        />

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: "auto" }}
            aria-label="custom pagination table"
            className="responsive-table"
          >
            <TableHead>
              <TableRow className="table-header">
                <TableCell component="th" className="t-cell">
                  Select Site
                </TableCell>
                <TableCell component="th" className="t-cell">
                  Add Start Time
                </TableCell>
                <TableCell component="th" className="t-cell">
                  Add Finish Time
                </TableCell>
                <TableCell width={"50%"} component="th" className="t-cell">
                  Sites Notes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="t-body-cell">{item.site}</TableCell>
                  <TableCell className="t-body-cell">
                    <Box
                      sx={{
                        color: "#43515D",
                        textAlign: "center",
                        border: "0.1px solid rgb(0,0,0,0.4)",
                        fontWeight: "500",
                        py: 2,
                        cursor: "pointer",
                      }}
                    >
                      {item.startTime}
                    </Box>
                  </TableCell>
                  <TableCell className="t-body-cell">
                    <Box
                      sx={{
                        color: "#43515D",
                        textAlign: "center",
                        border: "0.1px solid rgb(0,0,0,0.4)",
                        fontWeight: "500",
                        py: 2,
                        cursor: "pointer",
                      }}
                    >
                      {item.finishTime}
                    </Box>
                  </TableCell>
                  <TableCell className="t-body-cell" style={{ width: "20%" }}>
                    <Box
                      sx={{
                        color: "#43515D",
                        textAlign: "center",
                        border: "0.1px solid rgb(0,0,0,0.4)",
                        fontWeight: "500",
                        py: 2,
                        cursor: "pointer",
                      }}
                    >
                      {item.sitesNote}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 2px 4px 3px rgba(0, 0, 0, 0.08)",
            borderRadius: "10px",
            px: 5,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            py: 4,
          }}
        >
          <FormControl sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container alignItems={"center"}>
              <Grid>
                <FormLabel
                  style={{
                    fontWeight: 900,
                    fontSize: "x-large",
                    color: "black",
                  }}
                  component="h3"
                >
                  Appointment Recurance:
                </FormLabel>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="start">
              <Grid item>
                <BasicSelector
                  disableAll={true}
                  options={role}
                  isTimeSelector={true}
                  selectorHight={"53px"}
                  value={role}
                  name={"Start Time"}
                  selectorWidth={"350px"}
                />
              </Grid>
              <Grid item>
                <BasicSelector
                  disableAll={true}
                  isTimeSelector={true}
                  options={role}
                  selectorHight={"53px"}
                  value={role}
                  name={"Finish Time"}
                  selectorWidth={"350px"}
                />
              </Grid>
              <Grid item>
                <BasicSelector
                  disableAll={true}
                  options={role}
                  selectorHight={"53px"}
                  isTimeSelector={true}
                  value={role}
                  name={"Duration"}
                  selectorWidth={"350px"}
                />
              </Grid>
            </Grid>
          </FormControl>

          <FormControl sx={{ display: "flex" }}>
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <FormLabel
                  style={{
                    fontWeight: 900,
                    fontSize: "x-large",
                    color: "black",
                  }}
                  component="h3"
                >
                  Recurrence Patterns :
                </FormLabel>
              </Grid>
              <Grid item xs={12} pb={2}>
                <FormControl
                  sx={{
                    my: 1,
                    minWidth: "100%",
                    display: "flex !important",
                    columnGap: "10px !important",
                    rowGap: "10px !important",
                    flexDirection: "row !important",
                    flexWrap: "wrap !important",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button variant="outlined" className={classes.buttoRoot}>
                    Daily
                  </Button>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    Weekly
                  </Button>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    Monthly
                  </Button>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    Yearly
                  </Button>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    Every Day(1)
                  </Button>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    Every Weekday
                  </Button>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    Every Weekend
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>

          <FormControl sx={{ display: "flex", width: "100%" }}>
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <FormLabel
                  style={{
                    fontWeight: 900,
                    fontSize: "x-large",
                    color: "black",
                  }}
                  component="h3"
                >
                  Range of Recurrence :
                </FormLabel>
              </Grid>

              <Grid container spacing={5} justifyContent={"start"}>
                <Grid item>
                  <LocalDateSelector title="Start Date" />
                </Grid>
                <Grid item alignSelf={"center"}>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    End by
                  </Button>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    End after
                  </Button>
                  <Button variant="outlined" className={classes.buttoRoot}>
                    No end date
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </FormControl>

          <FormControl
            sx={{
              my: 1,
              minWidth: "100%",
              display: "flex !important",
              columnGap: "20px",
              flexDirection: "row !important",
              flexWrap: "wrap !important",
              justifyContent: "center",
            }}
          >
            <Button variant="outlined" className={classes.buttoRoot}>
              Ok
            </Button>
            <Button variant="outlined" className={classes.buttoRoot}>
              Cancel
            </Button>
          </FormControl>
        </Box>

        <Grid
          container
          justifyContent={"space-between"}
          spacing={5}
          alignContent="center"
          lg={6}
        >
          <Grid item md={5} xs={12} lg={5}>
            <TextField
              id="out-line-basic"
              variant="outlined"
              placeholder="Enter Guard Mobile Number"
              sx={{
                width: "100%",
                height: "100%",
                boxShadow: "0px 2px 4px 3px rgba(0, 0, 0, 0.08)",
                borderRadius: "10px",
              }}
            />
          </Grid>
          <Grid item md={5} xs={6} lg={5} alignSelf={"center"}>
            <Button
              variant="outlined"
              sx={{
                py: "10px !important",
              }}
              className={classes.buttoRoot}
            >
              Send Request
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
