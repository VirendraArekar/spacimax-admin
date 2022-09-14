/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Grid,
  FormControl,
  Skeleton,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";

import BasicSelector from "../../common/Selector";
import LocalTimeSelector from "../../common/LocalTimeSelector";
import LocalDateSelector from "../../common/LocalDateSelector";
import PageTitle from "../../common/PageTitle";
import { getTasks } from "../../../features/tasks/tasksAPI";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectTasks } from "../../../features/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader"
import { deleteAPI } from "../../network";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";

export default function TaskList() {
  const navigateTo = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteId, setDeleteId] = useState('');
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const { loading, error, data } = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const deleteClick = (id) => {
    setDeleteId(id);
    setOpen(true)
  }

  const handleDelete = () => {
    setLoader(true);
    let empty = deleteAPI(`/tasks/${deleteId}`);
    if(empty){
      dispatch(getTasks());
      setOpen(false);
    }
    setLoader(false);
  }

  return (
    <Box>
      <Loader loader={loader} />
      <PageTitle title="Task List" />
      <Box ml={5}>
        <FormControl
          sx={{
            width: "100%",
          }}
        >
          <Grid sx={{ my: "1rem" }} container spacing={3} width={"100%"}>
            <Grid item xs={6} md={6} lg={2}>
              <BasicSelector
                disableAll={true}
                options={[]}
                selectorHight={"53px"}
                value={""}
                name={"Site Id"}
                selectorWidth={"100%"}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={2}>
              <LocalTimeSelector />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <LocalDateSelector title="Due Date " />
            </Grid>
            <Grid item xs={12} lg={6} style={{ paddingTop: 40 }}>
              <Link
                to="/tasks/create"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: 15,
                  borderRadius: 5,
                  textDecoration: "none",
                }}
              >
                Create Task
              </Link>
            </Grid>
          </Grid>
        </FormControl>
        <Box display="flex" sx={{ my: "3rem" }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TableContainer component={Paper}>
            <div style={{ width: "auto", overflowX: "scroll" }}>
              <Table
                sx={{ minWidth: "auto" }}
                aria-label="custom pagination table"
                className="responsive-table"
              >
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell align="left" component="th" className="t-cell">
                      Title
                    </TableCell>
                    <TableCell align="left" component="th" className="t-cell">
                      Site Id
                    </TableCell>
                    <TableCell align="left" component="th" className="t-cell">
                      Due Date
                    </TableCell>
                    <TableCell align="left" component="th" className="t-cell">
                      Due Time
                    </TableCell>
                    <TableCell align="left" component="th" className="t-cell">
                      Description
                    </TableCell>
                    <TableCell align="center" component="th" className="t-cell">
                      Action
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
                  {data.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" className="t-body-cell">
                        {task.title}
                      </TableCell>
                      <TableCell align="left" className="t-body-cell">
                        {task.siteId?.siteId}
                      </TableCell>
                      <TableCell align="left" className="t-body-cell">
                        {new Date(task.dueDate).toLocaleDateString("en-uk", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </TableCell>
                      <TableCell align="left" className="t-body-cell">
                        {task.timeDue}
                      </TableCell>
                      <TableCell align="left" className="t-body-cell">
                        {task.description.slice(0, 120)}...
                      </TableCell>
                      <TableCell align="center" className="t-body-cell" sx={{textAlign : 'center', width : '15%'}}>
                        <Button variant="outlined" color="info" sx={{mx : 1}} onClick={(e) => {
                          navigateTo('/tasks/create',{state:{action : 'edit', task : task}})
                        }}>
                          <EditIcon />
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => deleteClick(task._id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </TableContainer>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle sx={{ mb: 4 , textAlign :"center" }}>Delete Task</DialogTitle>
        
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >

            <h3 style={{textAlign : 'left', fontWeight :'bold'}}>Do you want's to delete this task</h3>
          </Box>
        </DialogContent>
        <DialogActions sx={{mb : 2 , mx : 4}}>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
          <Button onClick={() => setOpen(false)} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
