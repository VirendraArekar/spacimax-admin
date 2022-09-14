import React, { useEffect, useState } from "react";
import { Alert, Box, Link, Skeleton,  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid, } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
// import { blue } from '@mui/material/colors';
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import "./style.css";
import { selectSiteTeams } from "../../../../features/sites/sitesSlice";
import { getSiteTeam, addSiteTeam } from "../../../../features/sites/sitesAPI";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../constant";

export default function SiteTeamPage() {
  const { loading, error, data } = useSelector(selectSiteTeams);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();


  const { siteId } = useParams();
  useEffect(() => {
    dispatch(getSiteTeam({ id: siteId }));
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newUsers = data.map((user) => ({
      id: user._id,
      email: user.email,
      name: `${user.firstname} ${user.lastname}`,
      contact: user.phone,
      role: user.role,
    }));

    setUsers(newUsers);
  }, [data]);

  const getSite = async() => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({})
   }; 

   var result = await fetch(BASE_URL + `/sites/`,requestOptions)
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

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSiteName = () => {
    if(data.length > 0){
      let site =  data.filter((item) => item._id === siteId)[0];
      return site.name + ', ' + site.address + ', ' + site.city + ' / Fixed Roaster / Edit Fixed Roster'
    }
    else{
      return '';
    }
    
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (form) => {
    dispatch(addSiteTeam({ ...form,  id: siteId }));
    handleClose();
    // dispatch(getSitesInspectionForm({ reportType: siteId }));
    reset();
  };

  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle
        title="Site View"
        subTitle="111, ABC Street Sydney / Site Team"
      />
      <Box display="flex" sx={{ my: "3rem" }}>
        {error && <Alert severity="error">{error}</Alert>}

        <TableContainer component={Paper} sx={{ mx: "0.8rem" }}>
          {/* <div style={{width: 'auto', overflowX: 'scroll'}}> */}
          {loading && (
            <Skeleton
              variant="rectangular"
              sx={{
                width: {
                  xs: "80%",
                },
              }}
              height={118}
            />
          )}
          <Table
            sx={{ minWidth: "auto" }}
            aria-label="custom pagination table"
            className="responsive-table"
          >
            <TableHead>
              <TableRow className="table-header">
                <TableCell align="left" component="th" className="t-cell">
                  Role
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Name
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Contact
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  component="th"
                  className="t-cell"
                  style={{ width: "13%" }}
                >
                  Licenses
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="left" className="t-body-cell">
                    {item.role}
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    {item.name}
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    {item.contact}
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    {item.email}
                  </TableCell>
                  <TableCell align="center" className="t-body-cell">
                    <Link href="#" underline="none" className="file-class">
                      {"View"}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow key="last">
                <TableCell
                  align="left"
                  className="t-body-cell"
                  component={Button}
                  sx={{
                    fontWeight: "bold !important",
                    py: 1,
                    ml: 1,
                    color: "#75859D !important",
                  }}
                  onClick={handleClickOpen}
                >
                  Add
                  <AddCircleIcon className="add-icon" fontSize="large" />
                </TableCell>
                <TableCell align="left" className="t-body-cell"></TableCell>
                <TableCell align="left" className="t-body-cell"></TableCell>
                <TableCell align="left" className="t-body-cell"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* </div> */}
        </TableContainer>
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <DialogTitle>Enter Email</DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              my={3}
              component="form"
            >
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name={"email"}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="email"
                      variant="standard"
                      type="email"
                      required
                      onChange={onChange}
                      value={value}
                      sx={{ borderColor: red[100] }}
                      error={!!errors.email}
                      helperText={
                        errors.email ? errors.email : null
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              my={3}
              component="form"
            >
              <Grid item xs={7} justifyContent="space-around" display="flex">
                <Button
                  disabled={loading}
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={handleSubmit(onSubmit)}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
