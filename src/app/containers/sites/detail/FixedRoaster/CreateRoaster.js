import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { getSiteTeam } from "../../../../../features/sites/sitesAPI";
import PageTitle from "../../../../common/PageTitle.js";
import LocalDateSelector from "../../../../common/LocalDateSelector";
// import { useParams } from "react-router-dom";
import { selectSiteTeams } from "../../../../../features/sites/sitesSlice";
import { addRoasters} from "../../../../../features/roster/roasterAPI";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { roundToNearestMinutes } from "date-fns";
import { toast } from 'react-toastify';
const userToken = localStorage.getItem("token");
import {BASE_URL} from "../../../../../constant";
import './style.css'


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

export default function CreateRoasterPage() {
  const { data, loading, error } = useSelector(selectSiteTeams);
  const dispatch = useDispatch();
  const [StartValue, setStartValue] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endValue, setEndValue] =  useState(null);
  const siteId = window.location.pathname.split('/')[2];
  const [key, setKey] = useState('');
  const [selectedStatus, setSelectedStatus] = useState({
    shiftStatus: "",
    alarmStatus: "",
  });
  const [userError, setUserError] = useState(false);
  const [keyError, setKeyError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const toastObj = {position: toast.POSITION.TOP_CENTER};
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      latitude: "",
      longitude: "",
    },
  });
  const [client, setClient] = useState("");
  //   console.log(window.location.pathname.split("/"), "id");
    const [id, setId] = useState("");

  useEffect(() => {
    //    await setId() 
    const myId = window.location.pathname.split("/")[2];
    setId(myId)
    dispatch(getSiteTeam({ id: myId }));
  }, []);

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

  const adjustDate = (obj) => {
    var newDate = obj.toDate();
    return newDate.getFullYear() + '-' + (newDate.getMonth().toString().length == 1 ? `0${newDate.getMonth()}` : newDate.getMonth()) + '-' + (newDate.getDate().toString().length === 1 ? `0${newDate.getDate()}` : newDate.getDate());
  }
  const onSubmit = async(data) => {
    setUserError(false);
    setKeyError(false);
    setStartDateError(false);
    setEndDateError(false);
    setStartTimeError(false);
    setEndTimeError(false);

    if(client === ''){
      console.log('client')
      toast.warning('Please select user',toastObj);
      setUserError(true);
      return false;
    }
    else if(key === '' || key.length < 10){
      toast.warning('Shift key description is required and at least 10 character long',toastObj);
      setKeyError(true);
      return false;
    }
   
    else if(startTime === '' || startTime === null){
      toast.warning('Start time is required!',toastObj);
      setStartTimeError(true);
      return false;
    }
    else if(endTime === '' || endTime === null){
      toast.warning('End time is required!',toastObj);
      setEndTimeError(true);
      return false;
    } 

    else if(StartValue === '' || StartValue === null){
      toast.warning('Start date is required!',toastObj);
      setStartDateError(true);
      return false;
    }
    else if(endValue === '' || endValue === null){
      toast.warning('End date is required!',toastObj);
      setEndDateError(true);
      return false;
    } 

    var payload = {
      siteId : id,
      assignedUser : client,
      key : key,
      startDate : adjustDate(StartValue),
      endDate : adjustDate(endValue),
      startTime : startTime.format("hh:mmA"),
      endTime : endTime.format("hh:mmA")
    };
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(payload)
   }; 

    var result = await fetch(BASE_URL + "/company/roster",requestOptions)
             .then(response => {
              return response.json();
             })
             .then(res => {
              console.log(res)
              if(res.code === 201  || res.code === 200){
                toast.success(res.message, toastObj);
                setClient('');
                setKey('');
                setStartTime(null);
                setEndTime(null);
                setStartValue(null);
                setEndValue(null);
              }
              else{
                toast.error(res.message, toastObj);
              }
             })
             .catch(err => {
              console.log(err);
              toast.error('Internal server error', toastObj);
             })

    

    // dispatch(addRoasters(payload));
    // console.log('Error',error)
    // console.log('DATA', data)
    // handleClose();
    // reset();

    console.log(payload);
  };
  const RED = 'red';
  

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
      <PageTitle title="Scheduler" subTitle="Create Roasters" />
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
                boxShadow: (userError ? RED : "rgba(0, 0, 0, 0.24)") + " 0px 3px 8px",
                borderColor: "#707070",
                pl: 2,
              }}
            >
              <MenuItem value="">
                <div className="select-item">Select User</div>
              </MenuItem>
              {data.map((item, index) => (
                <MenuItem value={item._id} key={index}>
                  {item.firstname} {item.lastname}
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
                        {/* <List
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
                        </List> */}
                        <TextareaAutosize
                          aria-label="minimum height"
                          minRows={6}
                          placeholder="Shift key description"
                          defaultValue={key}
                          style={{ width: '70%', fontSize : 18, padding : 10, border : keyError ? '1px solid '+ RED : '1px solid gray'}}
                          onChange={(e) => setKey(e.target.value)}
                        />
                     
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item md={10} lg={4}>


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
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                              <TimePicker
                                className={startTimeError ? "timePicker" : null}
                                label="Start Time"
                                value={startTime}
                                onChange={(newValue) => {
                                  setStartTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                              {/* {console.log('startTime --- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',startTime)}
                              {console.log('endTime --- .........................................',endTime)}
                              {console.log('StartDate --- ########################################',StartValue)}
                              {console.log('EndDate --- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',endValue)} */}
                            </LocalizationProvider>
                          </FormControl>
                          <FormControl sx={{ my: 1, minWidth: "100%" }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <TimePicker
                                className={endTimeError ? "timePicker" : null}
                                label="Finish Time"
                                value={endTime}
                                onChange={(newValue) => {
                                  setEndTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
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
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <DatePicker
                                className={startDateError ? "timePicker" : null}
                                label="Start Date"
                                value={StartValue}
                                onChange={(newValue) => {
                                  setStartValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                          </FormControl>

                          <Grid container>


                            <Grid item xs={12}>
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                  className={endDateError ? "timePicker" : null}
                                  label="Finish Date"
                                  value={endValue}
                                  onChange={(newValue) => {
                                    setEndValue(newValue);
                                  }}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </LocalizationProvider>
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
                      <Button variant="outlined" onClick={handleSubmit(onSubmit)} className={classes.buttoRoot}>
                        Ok
                      </Button>
                      <Button variant="outlined" className={classes.buttoRoot}>
                        Cancel
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* <Grid item xs={6} mt={5} alignSelf="center">
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
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
