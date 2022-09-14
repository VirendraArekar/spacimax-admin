import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Skeleton,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { red } from "@mui/material/colors";

import PageTitle from "../../common/PageTitle";
import { selectSiteCheckpoints } from "../../../features/sites/sitesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCheckpoints,
  getSiteCheckpoints,
  deleteCheckpoint
} from "../../../features/sites/sitesAPI";
import { Controller, useForm } from "react-hook-form";

function SiteSettingsPage() {
  const { loading, error, data } = useSelector(selectSiteCheckpoints);
  const dispatch = useDispatch();

  const { siteId } = useParams();

  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (form) => {
    dispatch(addCheckpoints({ ...form, siteId }));
    handleClose();
    dispatch(getSiteCheckpoints({ id: siteId }));
    reset();
  };
  const deleteCheckpoints = async (id,siteId) => {
    // 
    console.log(siteId, "siteID")
    dispatch(deleteCheckpoint({ id:id }))
    setTimeout(()=>{
      dispatch(getSiteCheckpoints({ id: siteId }));
    },1000)
    reset();
  };

  useEffect(() => {
    dispatch(getSiteCheckpoints({ id: siteId }));
  }, []);

  return (
    <Box>
      <PageTitle title="Sites View" />
      <Box display="flex" ml={4} flexDirection="column" rowGap={10} mb="20%">
        <Box ml={1} mb={5}>
          <Button
            variant="outlined"
            sx={{ pr: 5, pl: 2, fontWeight: "bold", py: 1 }}
            color="inherit"
          >
            Decommission Site
          </Button>
        </Box>
        <Grid container justifyContent="center">
          <Grid item md={10}>
            {error && <Alert severity="error">{error}</Alert>}
            <TableContainer component={Paper}>
              <Table
                aria-label="custom pagination table"
                className="responsive-table"
              >
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell
                      align="left"
                      component="th"
                      className="t-cell"
                      style={{ width: "75%" }}
                    >
                      Floor Number / Checkpoint
                    </TableCell>
                    <TableCell align="left" component="th" className="t-cell">
                      Floor QR Code
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && (
                    <Skeleton
                      component={TableRow}
                      variant="rectangular"
                      sx={{
                        width: {
                          xs: "80%",
                        },
                      }}
                      height={118}
                    />
                  )}
                  {data.map((Checkpoint) => (
                    <TableRow key={Checkpoint.id}>
                      <TableCell
                        align="left"
                        className="t-body-cell"
                        sx={{ fontWeight: "bold !important", py: 1, ml: 1 }}
                      >
                        {Checkpoint.name}
                        <span style={{ float: "right" }}>
                          <RemoveCircleIcon onClick={() => deleteCheckpoints(Checkpoint.id,siteId)}/>
                        </span>
                      </TableCell>
                      <TableCell
                        align="left"
                        className="t-body-cell"
                        sx={{ fontWeight: "bold !important", py: 1, ml: 1 }}
                      >
                        ADD QR Code
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
                      Add Floor
                      <span style={{ float: "right", color: "black" }}>
                        <AddCircleIcon />
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      className="t-body-cell"
                      sx={{ fontWeight: "bold !important", py: 1, ml: 1 }}
                    >
                      Add QR Code Number
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Checkpoint</DialogTitle>
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
                  name={"name"}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Name"
                      variant="standard"
                      type="text"
                      required
                      onChange={onChange}
                      value={value}
                      sx={{ borderColor: red[100] }}
                      error={!!errors.name}
                      helperText={errors.name ? errors.name?.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="latitude"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Latitude"
                      id="latitude"
                      variant="standard"
                      name="latitude"
                      required
                      onChange={onChange}
                      value={value}
                      error={!!errors.latitude}
                      helperText={
                        errors.latitude ? errors.latitude?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="longitude"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Longitude"
                      id="longitude"
                      variant="standard"
                      name="longitude"
                      required
                      onChange={onChange}
                      value={value}
                      error={!!errors.longitude}
                      helperText={
                        errors.longitude ? errors.longitude?.message : null
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

export default SiteSettingsPage;
