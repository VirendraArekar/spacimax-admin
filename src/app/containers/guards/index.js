import React, { useEffect, useState } from "react";
import { Alert, Box, Link, Skeleton,  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid, } from "@mui/material";
import PageTitle from "../../common/PageTitle";
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
import { selectGuards } from "../../../features/sites/sitesSlice";
import { getSiteTeam,getGuards, addSiteTeam } from "../../../features/sites/sitesAPI";
import { useParams } from "react-router-dom";

export default function Guards() {
  const { loading, error, data } = useSelector(selectGuards);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { siteId } = useParams();
  // const sideUserId = localStorage.getItem("siteId");
  useEffect(() => {
    dispatch(getGuards({ id: siteId }));
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(data, "dta")
    const newUsers = data.map((user) => ({
      id: user._id,
      email: user.userId.email,
      name: `${user.userId.firstname} ${user.userId.lastname}`,
      contact: user.userId.phone,
      licenseNumber: user.userId.licenseNumber,
      expiry: user.userId.expiryDate,
      postcode: user.userId.postcode,
    }));

    setUsers(newUsers);
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        title="Security Guards"
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
                  Email
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Name
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Contact
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Security License Number
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Expiry
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Postcode
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
                  <TableCell align="left">
                    {item.email}
                  </TableCell>
                  <TableCell align="left" >
                    {item.name}
                  </TableCell>
                  <TableCell align="left">
                    {item.contact}
                  </TableCell>
                  <TableCell align="left">
                    {item.licenseNumber}
                  </TableCell>
                  <TableCell align="left">
                    {item.expiry}
                  </TableCell>
                  <TableCell align="left">
                    {item.postcode}
                  </TableCell>
                  <TableCell align="center">
                    <Link href="#" underline="none">
                      {"View"}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow key="last">
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
              </TableRow> */}
            </TableBody>
          </Table>
          {/* </div> */}
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
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
