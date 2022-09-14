import React,{useState, useEffect} from "react";
import { Box, Grid } from "@mui/material";
import BasicSelector from "../../../../common/Selector/index";
import PageTitle from "../../../../common/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getSiteTeam ,getSites} from "../../../../../features/sites/sitesAPI";
import { selectSites } from "../../../../../features/sites/sitesSlice";

export default function EditFixedRoster() {
  const [userRole, setUserRole] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startFullTime, setStartFullTime] = useState(new Date());
  const [endTime, setEndTime] = useState('');
  const [endFullTime, setEndFullTime] = useState(new Date());
  const [dayFrequency, setDayFrequency] = useState('');
  const siteId = window.location.pathname.split('/')[2]; 
  const { loading, error, data } = useSelector(selectSites);
  const dispatch = useDispatch();
  const [startTimeOption,setStartTimeOption] = useState([])
  const [endTimeOption,setEndTimeOption] = useState([])

  const role = [
    "Manager",
    "Asst.Manager",
    "Controller",
    "Rover",
    "Static",
    "Loss Prevention",
    "Engineer/Technician",
    "Investigator",
    "Analyst",
    "Other",
  ];
  const frequency = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    dispatch(getSites());
  },[siteId])

  const getSiteName = () => {
    if(data.length > 0){
      let site =  data.filter((item) => item._id === siteId)[0];
      return site.name + ', ' + site.address + ', ' + site.city + ' / Fixed Roaster / Edit Fixed Roster'
    }
    else{
      return '';
    }
    
  }

  
  return (
    <Box>
      <PageTitle
        title="Sites View"
        subTitle={getSiteName()}
      />
      <Grid container spacing={3} justifyContent="start">
        <Grid item md={5} xs={12} lg={3}>
          <BasicSelector
            disableAll={true}
            options={role}
            selectorHight={"53px"}
            value={userRole}
            name={"Select Role"}
            onChange={(data) => {setUserRole(data.target.value)}}
          />
        </Grid>
        <Grid item md={5} xs={12} lg={3}>
          <BasicSelector
            disableAll={true}
            options={startTimeOption}
            isTimeSelector={true}
            selectorHight={"53px"}
            value={startFullTime}
            shortValue={startTime}
            changeTime={(data) => {setStartTime(data)}}
            changeFullTime={(data) => {setStartFullTime(data)}}
            setTimeOption={(data) => setStartTimeOption(data)}
            name={"Start Time"}
           
          />
          {console.log(startTimeOption)}
           {console.log(startFullTime)}
           {console.log(startTime)}
        </Grid>
        <Grid item md={5} xs={12} lg={3}>
          <BasicSelector
            disableAll={true}
            options={endTimeOption}
            isTimeSelector={true}
            selectorHight={"53px"}
            value={endFullTime}
            shortValue={endTime}
            changeTime={(data) => {setEndTime(data)}}
            changeFullTime={(data) => {setEndFullTime(data)}}
            setTimeOption={(data) => setEndTimeOption(data)}
            name={"Finish Time"}
            // width="100%"
          />
        </Grid>
        <Grid item md={5} xs={12} lg={3}>
          <BasicSelector
            disableAll={true}
            options={frequency}
            selectorHight={"53px"}
            value={dayFrequency}
            onChange={(data) => {setDayFrequency(data.target.value)}}
            name={"Frequency"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
