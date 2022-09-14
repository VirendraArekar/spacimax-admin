import React, { useEffect } from "react";
import {
  Box,
  Button,
  Skeleton,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSiteInspectionForm } from "../../../../features/sites/sitesSlice";
import {
  addQuestions,
  getSitesInspectionForm,
} from "../../../../features/sites/sitesAPI";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { red } from "@mui/material/colors";

import "./style.css";

export default function SiteFormPage() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(selectSiteInspectionForm);
  const { siteId, id } = useParams();

  const [open, setOpen] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      question: "",
      type: "",
      notes: "",
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (form) => {
    dispatch(addQuestions({ ...form, reportType: siteId }));
    handleClose();
    dispatch(getSitesInspectionForm({ reportType: siteId }));
    reset();
  };

  useEffect(() => {
    dispatch(getSitesInspectionForm({ reportType: siteId, id: id }));
  }, []);
  const choices = [
    { id: 1, name: "Yes", checked: false },
    { id: 2, name: "No", checked: false },
    { id: 3, name: "NA", checked: false },
  ];
  // const changeOption = (docId, selectedId) => {
  //   setDocuments(data)
  //   setDocuments((prevState) => {
  //     const newState = prevState.map((obj) => {
  //       if (obj.id === docId) {
  //         var arr = [];

  //         for (var i = 0; i < obj.choices.length; i++) {
  //           if (obj.choices[i].id === selectedId) {
  //             arr.push({
  //               id: selectedId,
  //               name: obj.choices[i].name,
  //               checked: true,
  //             });
  //           } else {
  //             arr.push({
  //               id: selectedId,
  //               name: obj.choices[i].name,
  //               checked: false,
  //             });
  //           }
  //         }
  //         return { ...obj, choices: arr };
  //       }
  //       return obj;
  //     });

  //     return newState;
  //   });
  // };

  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle
        title="Site View"
        subTitle="111, ABC Street, Sydney / Site Inspection / Create Form"
        headerTitle="Fire Alarm Report"
      />
      <Box
        Box
        display="flex"
        ml={4}
        flexDirection="column"
        rowGap={10}
        mb="20%"
      >
        {error && <Alert severity="error">{error}</Alert>}
        <TableContainer component={Paper} sx={{ mx: "0.8rem" }}>
          {/* <div style={{width: 'auto', overflowX: 'scroll'}}> */}
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
                  Enter Question
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Choices
                </TableCell>
                <TableCell align="left" component="th" className="t-cell">
                  Notes
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
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="left" className="t-body-cell">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    {item.question}
                  </TableCell>
                  <TableCell
                    align="left"
                    className="t-body-cell"
                    style={{ width: "23%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      {choices.map((opt, ind) => (
                        <Button
                          variant="outlined"
                          onClick={() => {}}
                          key={ind}
                          displayEmpty
                          className={
                            opt.checked ? "opt-button-active" : "opt-button"
                          }
                        >
                          {opt.name}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell align="left" className="t-body-cell">
                    <TextField
                      id="outlined-basic"
                      label="Enter your Note"
                      variant="outlined"
                      size="small"
                      value={item.notes}
                    />
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Question</DialogTitle>
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
                  name={"question"}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Question"
                      variant="standard"
                      type="text"
                      required
                      onChange={onChange}
                      value={value}
                      sx={{ borderColor: red[100] }}
                      error={!!errors.question}
                      helperText={
                        errors.question ? errors.question?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="type"
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
                      label="Type"
                      variant="standard"
                      type={"number"}
                      required
                      onChange={onChange}
                      value={value}
                      error={!!errors.type}
                      helperText={errors.type ? errors.type?.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="notes"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Notes"
                      variant="standard"
                      multiline
                      rows={3}
                      onChange={onChange}
                      value={value}
                      error={!!errors.notes}
                      helperText={errors.notes ? errors.notes?.message : null}
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
