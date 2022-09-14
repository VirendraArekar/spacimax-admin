import React from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Paper,
  List,
  Typography,
  ListItem,
  ListItemText,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import PageTitle from "../../common/PageTitle";
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
    padding: "0px 30px !important;",
    marginRight: "15px !important;",
    "&:hover": {
      backgroundColor: " #42505C !important;",
      color: "white !important",
    },
  },
}));

export default function CasualShiftsPage() {
  const [selectedStatus, setSelectedStatus] = React.useState({
    shiftStatus: "",
    alarmStatus: "",
  });
  const [client, setClient] = React.useState("");

  const classes = useStyles();
  const onChange = (event) => {
    if (event.target.name === "client") {
      setClient(event.target.value);
    } else
      setSelectedStatus({
        [event.target.name]: event.target.value,
        ...selectedStatus,
      });
  };

  const clientLists = [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Alice Bob",
    },
  ];
  const shiftDuties = [
    "Monitor and operate CCTV cameras and associated equipment.",
    "Maintain and improve effective processes.",
    "Provide security responses in a corrective manner including alarm investigations and preparing accurate profile",
    "Lorem ipsum dolor sit amet, consetetur",
    "Lorem ipsum dolor sit amet, consetetur",
    "Lorem ipsum dolor sit amet, consetetur",
    "Lorem ipsum dolor sit amet, consetetur",
    "Lorem ipsum dolor sit amet, consetetur",
    "Lorem ipsum dolor sit amet, consetetur",
    "Lorem ipsum dolor sit amet, consetetur",
    "Lorem ipsum dolor sit amet, con setetur",
    "Lorem ipsum dolor sit amet, consetetur",
    "Required Skills and Experience",
    "Lorem ipsum dolor sit amet, consetetur",
    "Lorem ipsum dolor sit amet, consetetur",
  ];
  return (
    <Box sx={{ minHeight: "inherit" }}>
      <PageTitle title="Scheduler" subTitle="Casual Shifts" />
      <Box ml={4}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: "25%" }}>
            <Select
              value={client}
              onChange={onChange}
              displayEmpty
              name="client"
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderColor: "#707070",
                pl: 2,
              }}
            >
              <MenuItem value="">
                <div className="select-item">Select Client</div>
              </MenuItem>
              {clientLists.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box my={5} />
          <Grid container m={1} py={5}>
            <Grid item xs={11}>
              <Paper elevation={3}>
                <Grid container p={5} spacing={5}>
                  <Grid item md={10} lg={8}>
                    <Paper elevation={3} p={3}>
                      <Box p={3}>
                        <Typography
                          sx={{ mt: 1, mb: 2 }}
                          variant="h6"
                          component="div"
                        >
                          Key Shift Duties
                        </Typography>
                        <List
                          dense={true}
                          sx={{ listStyle: "disc" }}
                          component="ul"
                        >
                          {shiftDuties.map((duty, index) => (
                            <ListItem key={index} sx={{ py: 0 }}>
                              <ListItemText
                                sx={{
                                  display: "list-item",
                                  textAlign: "-webkit-match-parent",
                                }}
                                primary={duty}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item md={10} lg={4}>
                    <FormControl sx={{ display: "flex" }}>
                      <Grid container alignItems="center">
                        <Grid item xs={5}>
                          <FormLabel
                            style={{
                              fontWeight: "bolder",
                              fontSize: "larger",
                              color: "black",
                            }}
                            component="h4"
                          >
                            Post Site :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={7} py={2}>
                          <TextField
                            fullWidth
                            InputProps={{
                              classes: {
                                root: classes.inputRoot,
                              },
                            }}
                            placeholder="Search postcode or address"
                          />
                        </Grid>
                      </Grid>
                    </FormControl>
                    <FormControl sx={{ display: "flex" }}>
                      <Grid container alignItems="center">
                        <Grid item xs={5}>
                          <FormLabel
                            style={{
                              fontWeight: "bolder",
                              fontSize: "larger",
                              color: "black",
                            }}
                            component="h4"
                          >
                            Hourly Rate :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={7} py={2}>
                          <TextField
                            fullWidth
                            InputProps={{
                              classes: {
                                root: classes.inputRoot,
                              },
                            }}
                            placeholder=" Enter hourly rate"
                          />
                        </Grid>
                      </Grid>
                    </FormControl>
                    <FormControl sx={{ display: "flex" }}>
                      <Grid container alignItems="center">
                        <Grid item xs={5}>
                          <FormLabel
                            style={{
                              fontWeight: "bolder",
                              fontSize: "larger",
                              color: "black",
                            }}
                            component="h4"
                          >
                            Parking :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={7} py={2}>
                          <FormControl sx={{ my: 1, minWidth: "100%" }}>
                            <Select
                              value={client}
                              onChange={onChange}
                              displayEmpty
                              name="client"
                              inputProps={{ "aria-label": "Without label" }}
                              sx={{
                                borderRadius: "10px",
                                borderColor: "#707070",
                                pl: 2,
                              }}
                            >
                              <MenuItem value="">
                                <div className="select-item">Yes</div>
                              </MenuItem>
                              <MenuItem>No</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </FormControl>
                    <FormControl sx={{ display: "flex" }}>
                      <Grid container alignItems="center">
                        <Grid item xs={5}>
                          <FormLabel
                            style={{
                              fontWeight: "bolder",
                              fontSize: "larger",
                              color: "black",
                            }}
                            component="h4"
                          >
                            Shift Type :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={7} py={2}>
                          <FormControl sx={{ my: 1, minWidth: "100%" }}>
                            <Select
                              value={client}
                              onChange={onChange}
                              displayEmpty
                              name="client"
                              inputProps={{ "aria-label": "Without label" }}
                              sx={{
                                borderRadius: "10px",
                                borderColor: "#707070",
                                pl: 2,
                              }}
                            >
                              <MenuItem value="">
                                <div className="select-item">Select</div>
                              </MenuItem>
                              <MenuItem>Test</MenuItem>
                            </Select>
                          </FormControl>
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
                            Appointment Recurrence :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={7} pb={2}>
                          <FormControl sx={{ my: 1, minWidth: "100%" }}>
                            <Select
                              value={client}
                              onChange={onChange}
                              displayEmpty
                              name="client"
                              inputProps={{ "aria-label": "Without label" }}
                              sx={{
                                borderRadius: "10px",
                                borderColor: "#707070",
                                pl: 2,
                              }}
                            >
                              <MenuItem value="">
                                <div className="select-item">Start Time</div>
                              </MenuItem>
                              <MenuItem>Test</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{ my: 1, minWidth: "100%" }}>
                            <Select
                              value={client}
                              onChange={onChange}
                              displayEmpty
                              name="client"
                              inputProps={{ "aria-label": "Without label" }}
                              sx={{
                                borderRadius: "10px",
                                borderColor: "#707070",
                                pl: 2,
                              }}
                            >
                              <MenuItem value="">
                                <div className="select-item">Finish Time</div>
                              </MenuItem>
                              <MenuItem>Test</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{ my: 1, minWidth: "100%" }}>
                            <Select
                              value={client}
                              onChange={onChange}
                              displayEmpty
                              name="client"
                              inputProps={{ "aria-label": "Without label" }}
                              sx={{
                                borderRadius: "10px",
                                borderColor: "#707070",
                                pl: 2,
                              }}
                            >
                              <MenuItem value="">
                                <div className="select-item">Duration</div>
                              </MenuItem>
                              <MenuItem>Test</MenuItem>
                            </Select>
                          </FormControl>
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
                            <Button
                              variant="outlined"
                              className={classes.buttoRoot}
                            >
                              Daily
                            </Button>
                            <Button
                              variant="outlined"
                              className={classes.buttoRoot}
                            >
                              Weekly
                            </Button>
                            <Button
                              variant="outlined"
                              className={classes.buttoRoot}
                            >
                              Monthly
                            </Button>
                            <Button
                              variant="outlined"
                              className={classes.buttoRoot}
                            >
                              Yearly
                            </Button>
                            <Button
                              variant="outlined"
                              className={classes.buttoRoot}
                            >
                              Every Day(1)
                            </Button>
                            <Button
                              variant="outlined"
                              className={classes.buttoRoot}
                            >
                              Every Weekday
                            </Button>
                            <Button
                              variant="outlined"
                              className={classes.buttoRoot}
                            >
                              Every Weekend
                            </Button>
                          </FormControl>
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
                            Range of Recurrence :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} pb={2}>
                          <FormControl sx={{ mb: 2 }}>
                            <LocalDateSelector
                              label="none"
                              title="Start Date"
                            />
                          </FormControl>

                          <Grid container>
                            <Grid item xs={4}>
                              <Button
                                variant="outlined"
                                className={classes.buttoRoot}
                                sx={{ mr: "0 !important" }}
                              >
                                End by
                              </Button>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                variant="outlined"
                                className={classes.buttoRoot}
                                sx={{ mr: "0 !important" }}
                              >
                                End after
                              </Button>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                variant="outlined"
                                className={classes.buttoRoot}
                                sx={{
                                  mr: "0 !important",
                                  p: "0 20px !important",
                                }}
                              >
                                No end date
                              </Button>
                            </Grid>
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

                    <FormControl sx={{ display: "flex" }}>
                      <Grid container alignItems="center">
                        <Grid item xs={5}>
                          <FormLabel
                            style={{
                              fontWeight: "bolder",
                              fontSize: "larger",
                              color: "black",
                            }}
                            component="h4"
                          >
                            Total Shifts :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={3} py={2}>
                          <Paper
                            elevation={3}
                            sx={{ p: 1.4, textAlign: "center" }}
                          >
                            5
                          </Paper>
                        </Grid>
                      </Grid>
                    </FormControl>

                    <FormControl sx={{ display: "flex" }}>
                      <Grid container alignItems="center">
                        <Grid item xs={5}>
                          <FormLabel
                            style={{
                              fontWeight: "bolder",
                              fontSize: "larger",
                              color: "black",
                            }}
                            component="h4"
                          >
                            Charges :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={3} py={2}>
                          <Paper
                            elevation={3}
                            sx={{ p: 1.4, textAlign: "center" }}
                          >
                            $15.65
                          </Paper>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6} mt={5} alignSelf="center">
              <Button
                sx={{
                  float: "right",
                  mt: 2,
                  backgroundColor: "#42505C",
                  color: "white",
                  borderRadius: "10px",
                  px: 5,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#343636",
                  },
                }}
                type="submit"
                variant="contained"
              >
                Advertise Shift
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
