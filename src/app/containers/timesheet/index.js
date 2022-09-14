import React, {useEffect} from "react";
import { Box, Link , Grid, Button } from "@mui/material";
import PageTitle from "../../common/PageTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
// import { blue } from '@mui/material/colors';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalDateSelector from "../../common/LocalDateSelector";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils/axiosSetup";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { getSites } from "../../../features/sites/sitesAPI";
import { selectSites } from "../../../features/sites/sitesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectGuards } from "../../../features/sites/sitesSlice";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export default function TimesheetPage(props) {

  const navigate = useNavigate();
  const current = new Date();

  // const {state} = useLocation();
 
  const sites = [
    {id : 1, name : '111,ABC Street,Sydney'},
    {id : 2, name : '112,ABC Street,Sydney'},
    {id : 3, name : '113,ABC Street,Sydney'},
    {id : 4, name : '114,ABC Street,Sydney'},
    {id : 5, name : '115,ABC Street,Sydney'},
  ]

  const guards = [
    {id : 1, name : 'Pan Singh Tomar'},
    {id : 2, name : 'Rajiv Kumar'},
    {id : 3, name : 'Santosh Rastogi'},
    {id : 4, name : 'Brijesh Pandey'},
    {id : 5, name : 'Atul Bihari'},
  ]

  const statuses = [
    {id : 1, name : 'Submitted'},
    {id : 2, name : 'Approved'},
  ]

  const [selectedSite, setSelectedSite] = React.useState('');
  const [selectedGuard, setSelectedGuard] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [guardList, setGuardList] = React.useState([]);
  const [statusList, setStatusList] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(null);
 
  useEffect(() => {
    getTimeSheet();
  }, []);
  const { loading, error, data } = useSelector(selectSites);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSites());
  }, []);
  
  useEffect(() => {
    getGuardData();
    getTimeSheetStatus();
  }, []);

  const getGuardData = async () => {
    try {
      const res = await axiosInstance.get(`/guards`);
      console.log(res.data.data);
      setGuardList(res.data.data);
      return res.data.data;
    } catch (error) {
      return error.message || error.msg;
    }
  };

  const getTimeSheet = async () => {
    try {
      const res = await axiosInstance.get(`/admin/timesheet`);
      // console.log(res.data.data);
      setUsers(res.data.data);
      return res.data;
    } catch (error) {
      return error.message || error.msg;
    }
  };

  const formatDate = (date) => {
    var d = new Date(date);
    return  (d.getFullYear().toString().length === 1 ? `0${d.getFullYear()}` : d.getFullYear()) + '-' + (d.getMonth().toString().length === 1 ? `0${d.getMonth()}` : d.getMonth()) + '-' + (d.getDate().toString().length === 1 ? `0${d.getDate()}` : d.getDate())  ;
  }
  
  const getTimeSheetFiltered = async (siteId = null, guardId = null, date = null, statusId = null) => {
    try {
      console.log('DATE ---------------------------')
      console.log(date)
      console.log('DATE ---------------------------')
      var siteId = siteId !== null ? siteId : selectedSite;
      var guardId = guardId !== null ? guardId : selectedGuard;
      var date = date !== null ? date : selectedDate;
      var statusId = statusId !== null ? statusId : selectedStatus;
      console.log(formatDate(date));

      var extension = '';
      var first = true;
      if(siteId !== ''){
        extension += (first ? '?' : '&') + `siteId=${siteId}`;
        first = false;
      }
      if(guardId !== ''){
        extension += (first ? '?' : '&') + `guardId=${guardId}`;
        first = false;
      }
      if(date !== '' && date !== null){
        extension += (first ? '?' : '&') + `createdAt=${formatDate(date)}`;
        first = false;
      }
      if(statusId !== ''){
        extension += (first ? '?' : '&') + `statusId=${statusId}`;
        first = false;
      }

      console.log(`/admin/timesheet${extension}`)
      const res = await axiosInstance.get(`/admin/timesheet${extension}`);
      console.log('RESPONSE --------------------')
      console.log(res.data.data);
      console.log('RESPONSE --------------------')
      setUsers(res.data.data);
      // return res.data;
    } catch (error) {
      return error.message || error.msg;
    }
  };

  const getTimeSheetStatus = async () => {
    try {
      const res = await axiosInstance.get(`/timesheet-statuses`);
      console.log(res.data.data);
      setStatusList(res.data.data);
      return res.data;
    } catch (error) {
      return error.message || error.msg;
    }
  };

  const changeSite = (event) => {
    setSelectedSite(event.target.value);
    getTimeSheetFiltered(event.target.value, null, null, null);
  };

  const changeGuard = (event) => {
    setSelectedGuard(event.target.value);
    getTimeSheetFiltered(null, event.target.value, null, null);
  };

  const changeStatus = (event) => {
    setSelectedStatus(event.target.value);
    getTimeSheetFiltered(null, null, null, event.target.value);
  };

  const handleChangePage = (id) => {
    navigate(`${window.location.pathname}/result`, {state: id});
  }

  const handleSiteId= (id) => {
    props.onHandler(id);
    handleChangePage(id);
  }

  const handleChangeRowsPerPage = () =>{

  }

  const TablePaginationActions = () => {

  }

  const changeDate = (event) => {
    setSelectedDate(event);
    getTimeSheetFiltered(null, null, event, null);
  };

  const clearFilter = () => {
    setSelectedDate(null);
    setSelectedGuard('');
    setSelectedSite('');
    setSelectedStatus('');
    getTimeSheet();
  }


  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Timesheets"  />
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{mx : 8}}
      >
        <Button variant="contained" style={{backgroundColor : "grey"}} sx={{ height: 50 }} onClick={clearFilter}>
          <FilterAltOffIcon />
          Clear Filter
        </Button>
      </Box>

      <Grid container  className="sort-box" sx={{mx : "0.4rem",mt: "2rem", pr : "2rem"}} >
            <Grid item xs={3}>
            <FormControl sx={{ m: 1, width : "90%" }}>
                <Select
                    value={selectedSite}
                    onChange={changeSite}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{borderRadius : 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor : "#707070", backgroundColor : 'white'}}
                    // IconComponent={() => (
                    //     <KeyboardArrowDownIcon />
                    // )}
                    >
                    <MenuItem value="">
                    <div className="select-item">Select City</div>
                    </MenuItem>
                    {
                        data.map((item, index) => (
                            <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl sx={{ m: 1, width : "90%" }}>
                <Select
                    value={selectedGuard}
                    onChange={changeGuard}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{borderRadius : 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor : "#707070" , backgroundColor : 'white'}}
                    >
                    <MenuItem value="">
                    <div className="select-item">Select Guard</div>
                    </MenuItem>
                    {
                        guardList.map((item, index) => (
                            <MenuItem value={item._id} key={index}>{item.userId.firstname} {item.userId.firstname}</MenuItem>
                        ))
                    }
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
            </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl sx={{ m: 1, width : "90%" }}>
                        
                        <LocalDateSelector label="none" value={selectedDate} onChange={changeDate}/>
                    
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl sx={{ m: 1, width : "90%" }}>
                    <Select
                        value={selectedStatus}
                        onChange={changeStatus}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{borderRadius : 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor : "#707070", backgroundColor : 'white'}}
                        
                        >
                        <MenuItem value="" className="select-item">
                            <div className="select-item">Approval Status</div>
                        </MenuItem>
                        {
                            statusList.map((item, index) => (
                                <MenuItem value={item.id} key={index} className="select-item">{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                    {/* <FormHelperText>Without label</FormHelperText> */}
                </FormControl>
            </Grid>
      </Grid>
      <Box display="flex" sx={{ my: "2rem" }}>
        <TableContainer component={Paper} sx={{ mx: "0.8rem" }} >
          <div style={{width: 'auto', overflowX: 'scroll'}}>
            <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
                <TableHead >
                    <TableRow className="table-header">
                        <TableCell align="left" component="th" className="t-cell" style={{width : "13%"}}>Guard Name</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Week Starting</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Week Ending</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Site Name</TableCell>
                        <TableCell align="left" component="th" className="t-cell" tyle={{width : "8%"}}>Hours Worked</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Date Submitted</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Status</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell  align="left" className="t-body-cell">
                                    {`${item.userId.firstname} ${item.userId.lastname}`}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell">
                                    {moment(item.startTime).format("MMM Do YY")}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell">
                                    {moment(item.endTime).format("MMM Do YY")}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell" style={{width : "20%"}}>
                                    {item.siteId.name}
                                </TableCell>
                                <TableCell  align="left" className="t-body-cell">
                                    {item.totalHours}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell">
                                    {moment(item.createdAt).format("MMM Do YY")}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell">
                                    {item.statusId.name}
                                </TableCell>
                                <TableCell  align="center" className="t-body-cell">
                                <Link href="#" underline="always" className="file-class" onClick={() => handleSiteId(item.id)}>
                                    View
                                </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
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
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={7}
                    count={users.length}
                    rowsPerPage={10}
                    page={0}
                    SelectProps={{
                        inputProps: {
                        'aria-label': 'rows per page',
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
            </div>
        </TableContainer>

      </Box>
    </Box>
  );
}


