/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  FormLabel,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import LocalDateSelector from "../../common/LocalDateSelector";
import { makeStyles } from "@mui/styles";
import BasicSelector from "../../common/Selector";
import LocalTimeSelector from "../../common/LocalTimeSelector";
import PageTitle from "../../common/PageTitle";

import { useDispatch, useSelector } from "react-redux";
import { addCheckpoints, getSites } from "../../../features/sites/sitesAPI";
import { Controller, useForm } from "react-hook-form";
import { selectTasks } from "../../../features/tasks/tasksSlice";
import { selectSites } from "../../../features/sites/sitesSlice";
import { selectCompanies } from "../../../features/company/companySlice";
import { getCompanies } from "../../../features/company/companyAPI";
import { addTasks } from "../../../features/tasks/tasksAPI";
import { useNavigate } from "react-router-dom";
import { getAPI, postAPI, patchAPI } from "../../network";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useLocation } from "react-router-dom";
import Loader from '../../common/Loader'
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({

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

export default function AddTask() {
  const classes = useStyles();
  const location = useLocation();
  const navigateTo = useNavigate();
  const { loading, error } = useSelector(selectTasks);
  const { data: sitesData } = useSelector(selectSites);
  const { data: companiesData } = useSelector(selectCompanies);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('');
  const [companyError, setCompanyError] = useState(false);
  const [sites, setSites] = useState([]);
  const [site, setSite] = useState('');
  const [siteError, setSiteError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [dueDateError, setDueDateError] = useState(false);
  const [dueTime, setDueTime] = useState(null);
  const [dueTimeError, setDueTimeError] = useState(false);
  const [desc, setDesc] = useState('')
  const [descError, setDescError] = useState('')
  const [action, setAction] = useState('add');
  const [btnTxt, setBtnTxt] = useState('');
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState('');

  useEffect(() => {
    dispatch(getSites());
    dispatch(getCompanies());
    sideLists();
    companyLists();
    if(location){
      if(location.state){
        const task = location.state.task;
        setAction('edit')
        setEditId(task._id);
        setCompany(task.companyId?._id)
        setSite(task.siteId?._id);
        setTitle(task.title);
        setDesc(task.description);
        setDueDate(new Date(task.dueDate));
        var date = new Date(task.dueDate);
        let time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + task.timeDue;
        console.log('TIME', time)
        setDueTime(new Date(time))
      }
    }
  }, [location]);
  

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      siteId: "",
      companyId: "",
      dueDate: new Date(),
      timeDue: new Date(),
      description: "",
    },
  });

  const dateFormat = (date) => {
    var newDate = new Date(date);
    return newDate.getFullYear() + '-' + (newDate.getMonth().toString().length === 1 ? `0${newDate.getMonth()}` : newDate.getMonth()) + '-' + (newDate.getDay().toString().length === 1 ? `0${newDate.getDay()}` : newDate.getDay());
  }

  const timeFormat = (time) => {
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}`.toString() : minutes;
    hours = hours < 10 ? `0${hours}`.toString() : hours;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const toastObj = {position: toast.POSITION.TOP_RIGHT};

  const onSubmit = async(e) => {
    e.preventDefault();
    
    setTitleError(false);
    setSiteError(false);
    setCompanyError(false);
    setDescError(false);
    setDueDateError(false);
    setDueTimeError(false);

    if(title === '' || title.length < 3){
      toast.warning('Tile is required! and at least 3 character long', toastObj);
      setTitleError(true);
      return;
    }
    else if(site === ''){
      toast.warning('Site ID is required!', toastObj);
      setSiteError(true);
      return;
    }
    else if(company === ''){
      toast.warning('Company ID is required!', toastObj);
      setCompanyError(true);
      return;
    }
    else if(dueDate === null){
      toast.warning('Due date is required!', toastObj);
      setDueDateError(true);
      return;
    }
    else if(dueTime === null){
      toast.warning('Due time is required!', toastObj);
      setDueTimeError(true);
      return;
    }


    if(action === 'add'){
      let payload = {
        companyId : company,
        siteId : site,
        title : title,
        dueDate : dateFormat(dueDate),
        timeDue : timeFormat(dueTime),
        description : desc
      };

     
      setLoader(true)
      var saveStatus = await postAPI('/tasks',payload);
      setLoader(false)
      if(saveStatus){
        navigateTo("/tasks/list")
      }
    }
    else if(action === 'edit'){
      let payload = {
        companyId : company,
        siteId : site,
        title : title,
        dueDate : dateFormat(dueDate),
        timeDue : timeFormat(dueTime),
        description : desc
      };
      let url = `/tasks/${editId}`;
      setLoader(true)
      var saveStatus = await patchAPI(url,payload);
      setLoader(false)
      if(saveStatus){
        navigateTo("/tasks/list")
      }
    }
  };

  const sideLists = async() => {
    let process = await getAPI('/sites');
    if(process){
      var sites = [];
      for(var i = 0; i< process.length ; i++){
        sites.push({label : process[i].name, value : process[i]._id})
      }
      setSites(sites);
    }
  }

  const companyLists = async() => {
    let process = await getAPI('/companies');
    if(process){
      var companies = [];
      for(var i = 0; i< process.length ; i++){
        companies.push({label : process[i].name, value : process[i].id})
      }
      setCompanies(companies);
    }
  }

  return (
    <Box>
      <Loader loader={loader} />
      <PageTitle title={action === 'add' ? 'Add Task' : 'Edit Task'} />
      <Box ml={5}>
        {error && <Alert severity="error"> {error}</Alert>}
        <FormControl sx={{ display: "flex" }}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <FormLabel
                style={{
                  fontSize: "larger",
                  color: "black",
                }}
                component="h4"
              >
                Title
              </FormLabel>
            </Grid>
            <Grid item xs={3} py={2}>
              <Controller
                name={"title"}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    type="text"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    sx={{ background: "white" }}
                    placeholder="Title"
                    // error={!!errors.title}
                    helperText={errors.title ? errors.title?.message : null}
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormControl>
        <FormControl sx={{ display: "flex" }}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <FormLabel
                style={{
                  fontSize: "larger",
                  color: "black",
                }}
                component="h4"
              >
                Sites Id
              </FormLabel>
            </Grid>
            <Grid item xs={3} py={2}>
              <Controller
                name={"siteId"}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <BasicSelector
                    disableAll={true}
                    options={sites}
                    selectorHight={"53px"}
                    value={site}
                    onChange={(data) => {setSite(data.target.value)}}
                    name={"Site ID"}
                    error={siteError}
                    helperText={
                      siteError ? 'Site ID is required !' : null
                    }
                  />
                 )}
               /> 
            </Grid>
          </Grid>
        </FormControl>

        <FormControl sx={{ display: "flex" }}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <FormLabel
                style={{
                  fontSize: "larger",
                  color: "black",
                }}
                component="h4"
              >
                Company Id
              </FormLabel>
            </Grid>
            <Grid item xs={3} py={2}>
              <Controller
                name={"companyId"}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <BasicSelector
                    disableAll={true}
                    options={companies}
                    selectorHight={"53px"}
                    value={company}
                    onChange={(data) => {setCompany(data.target.value)}}
                    name={"Company ID"}
                    error={companyError}
                    helperText={
                      companyError ? 'Company ID is required !' : null
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormControl>

        <FormControl sx={{ display: "flex" }}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <FormLabel
                style={{
                  fontSize: "larger",
                  color: "black",
                }}
                component="h3"
              >
                Due Date
              </FormLabel>
            </Grid>
            <Grid item xs={5} py={2}>
              <FormControl sx={{ mb: 2 }}>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LocalDateSelector
                      label="none"
                      onChange={(text) => setDueDate(text)}
                      value={dueDate}
                      inputFormat="YYYY-MM-DD"
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </FormControl>
        <FormControl sx={{ display: "flex" }}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <FormLabel
                style={{
                  fontSize: "larger",
                  color: "black",
                }}
                component="h3"
              >
                Due Time
              </FormLabel>
            </Grid>
            <Grid item xs={5} py={2}>
              <FormControl sx={{ mb: 2, background: "white" }}>
                <Controller
                  name="timeDue"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LocalTimeSelector
                      label="none"
                      onChange={(text) => setDueTime(text)}
                      value={dueTime}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </FormControl>
        <FormControl sx={{ display: "flex" }}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <FormLabel
                style={{
                  fontSize: "larger",
                  color: "black",
                }}
                component="h3"
              >
                Description
              </FormLabel>
            </Grid>
            <Grid item xs={6} py={2}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is Required",
                  minLength: {
                    value: 4,
                    message: "Value can't be more than 4!",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    label="Description"
                    variant="standard"
                    multiline
                    rows={3}
                    onChange={(e) => {
                      setDesc(e.target.value)
                    }}
                    value={desc}
                    error={descError}
                    helperText={
                     'Description is required! and at least 10 character long'
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormControl>
        <FormControl>
          <Button
            variant="outlined"
            sx={{
              py: "10px !important",
              px: "50px !important",
            }}
            className={classes.buttoRoot}
            // disabled={loading}
            onClick={(e) => onSubmit(e)}
          >
            {action === 'add' ? 'Add' : 'Update'} Task
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
