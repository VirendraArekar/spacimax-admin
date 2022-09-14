import React,{useEffect} from "react";
import { Box, Link,Button,Dialog,Skeleton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,  } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useDispatch, useSelector } from "react-redux";
import { selectSiteInspection } from "../../../../features/sites/sitesSlice";
// import { blue } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from "react-hook-form";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField, Select } from "@mui/material";
import { red } from "@mui/material/colors";
import "./style.css";
import {
  siteInspection,
  getSitesInspection,
} from "../../../../features/sites/sitesAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SiteInspectionPage() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { siteId } = useParams();
  const { loading, error, data } = useSelector(selectSiteInspection);
  // const documents = [
  //   {
  //     id: 1,
  //     category: "HSW & Compliance",
  //     type : "Introduction",
  //     desc : "Site Introduction",
  //     upload : "Attachment"
  //   },
  //   {
  //       id: 1,
  //       category: "HSW & Compliance",
  //       type : "Hazmat Register",
  //       desc : "Register",
  //       upload : "Attachment"
  //   },
  //   {
  //       id: 1,
  //       category: "HSW & Compliance",
  //       type : "Evacuation Plan",
  //       desc : "Register",
  //       upload : "Attachment"
  //   },
  //   {
  //       id: 1,
  //       category: "Operational",
  //       type : "Site Hazards",
  //       desc : "Register",
  //       upload : "Attachment"
  //   },
  //   {
  //       id: 1,
  //       category: "Operational",
  //       type : "Traffic Plan",
  //       desc : "Management Plan",
  //       upload : "Attachment"
  //   },
  //   {
  //       id: 1,
  //       category: "Operational",
  //       type : "Site Team",
  //       desc : "Team Structure",
  //       upload : "Attachment"
  //   },
  //   {
  //       id: 1,
  //       category: "Operational",
  //       type : "SOP",
  //       desc : "Site Operations",
  //       upload : "Attachment"
  //   },
  //   {
  //       id: 1,
  //       category: "General",
  //       type : "Privacy Policy",
  //       desc : "Policy",
  //       upload : "Attachment"
  //   }, 
  // ];
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      position: data.length + 1,
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (form) => {
    dispatch(siteInspection({ ...form, siteId: siteId }));
    handleClose();
    // dispatch(getSitesInspectionForm({ reportType: siteId }));
    reset();
  };

  useEffect(() => {
    dispatch(getSitesInspection({ siteId: siteId }));
  }, []);

  const handleNavigateForm = (id) => {
    navigate(`${window.location.pathname}/form/${id}`);
  }

  

  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Site View"  subTitle="111, ABC Street, Sydney / Site Inspection"/>
      <Box display="flex" sx={{ my: "4rem" }}>
      {error && <Alert severity="error">{error}</Alert>}
        <TableContainer component={Paper} sx={{ mx: "0.8rem" }} >
          {/* <div style={{width: 'auto', overflowX: 'scroll'}}> */}
            <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
                <TableHead >
                    <TableRow className="table-header">
                        <TableCell align="left" component="th" className="t-cell">Category</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Document Type</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Description</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Form</TableCell>
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
                    {
                        data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell  align="left" className="t-body-cell">
                                  {item.category}
                                </TableCell>
                                <TableCell  align="left" className="t-body-cell">
                                    {item.name}
                                </TableCell>
                                <TableCell  align="left" className="t-body-cell">
                                    {item.description}
                                </TableCell>
                                <TableCell  align="left" className="t-body-cell font-bold" onClick={() => handleNavigateForm(item.id)}>
                                    {'Create Form'}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell className="t-body-cell" direction="column" justifyContent="center" onClick={handleClickOpen}>
                      <Link href="#" underline="none" >
                         <div className="custom-table-cell">
                            <span className="add-title">Add Inspection</span>
                            <AddCircleIcon className="add-icon" fontSize="large" />
                        </div>  
                      </Link>
                    </TableCell>
                    <TableCell  align="left" className="t-body-cell">
                    </TableCell>
                    <TableCell  align="left" className="t-body-cell">
                    </TableCell>
                    <TableCell  align="left" className="t-body-cell">
                    </TableCell>
                </TableRow>
                </TableFooter>
            </Table>
            {/* </div> */}
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Enter Details</DialogTitle>
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
                      label="name"
                      variant="standard"
                      type="text"
                      required
                      onChange={onChange}
                      value={value}
                      sx={{ borderColor: red[100] }}
                      error={!!errors.name}
                      helperText={
                        errors.name ? errors.name?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: true,
                    min: {
                      message: "Minimum Value Is Zero",
                      value: 0,
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Description"
                      variant="standard"
                      type="text"
                      required
                      onChange={onChange}
                      value={value}
                      error={!!errors.description}
                      helperText={errors.description ? errors.description?.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      fullWidth
                      label="Category"
                      variant="standard"
                      onChange={onChange}
                      value={value}
                      error={!!errors.category}
                      helperText={errors.category ? errors.category?.message : null}
                    >
                      <MenuItem value={"HSW "}>HSW </MenuItem>
                      <MenuItem value={"Compliance"}>Compliance</MenuItem>
                      <MenuItem value={"Operational"}>Operational</MenuItem>
                      <MenuItem value={"General "}>General </MenuItem>
                      <MenuItem value={"Mandatory"}>Mandatory</MenuItem>
                      <MenuItem value={"Other "}>Other </MenuItem>
                    </Select>
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


