import React from "react";
import { Box, Link  } from "@mui/material";
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
import AddCircleIcon from '@mui/icons-material/AddCircle';

import "./style.css";

export default function UserPage() {
  const users = [
    {
      id: 1,
      email: "virendra.arekar@gmail.com",
      name : "Virendra Arekar",
      contact : "+91848398837",
      licenseNumber : "DSGF547GJSA7",
      expiryDate : "27 June 2023",
      postcode : 401502
    },

    {
        id: 2,
        email: "abc.arekar@gmail.com",
        name : "John Cena",
        contact : "+91848398837",
        licenseNumber : "UHHW879529",
        expiryDate : "14 dEC 2023",
        postcode : 423455
    },
    {
        id: 3,
        email: "virendra.arekar@gmail.com",
        name : "Virendra Arekar",
        contact : "+91848398837",
        licenseNumber : "DSGF547GJSA7",
        expiryDate : "27 June 2023",
        postcode : 401502
    },
    {
        id: 4,
        email: "virendra.arekar@gmail.com",
        name : "Virendra Arekar",
        contact : "+91848398837",
        licenseNumber : "DSGF547GJSA7",
        expiryDate : "27 June 2023",
        postcode : 401502
    },
    {
        id: 5,
        email: "virendra.arekar@gmail.com",
        name : "Virendra Arekar",
        contact : "+91848398837",
        licenseNumber : "DSGF547GJSA7",
        expiryDate : "27 June 2023",
        postcode : 401502
    },
    {
        id: 6,
        email: "virendra.arekar@gmail.com",
        name : "Virendra Arekar",
        contact : "+91848398837",
        licenseNumber : "DSGF547GJSA7",
        expiryDate : "27 June 2023",
        postcode : 401502
    },
    {
        id: 7,
        email: "virendra.arekar@gmail.com",
        name : "Virendra Arekar",
        contact : "+91848398837",
        licenseNumber : "DSGF547GJSA7",
        expiryDate : "27 June 2023",
        postcode : 401502
    },
    {
        id: 8,
        email: "virendra.arekar@gmail.com",
        name : "Virendra Arekar",
        contact : "+91848398837",
        licenseNumber : "DSGF547GJSA7",
        expiryDate : "27 June 2023",
        postcode : 401502
    },
    {
        id: 9,
        email: "virendra.arekar@gmail.com",
        name : "Virendra Arekar",
        contact : "+91848398837",
        licenseNumber : "DSGF547GJSA7",
        expiryDate : "27 June 2023",
        postcode : 401502
    },
    {
        id: 10,
        email: "virendra.arekar@gmail.com",
        name : "Virendra Arekar",
        contact : "+91848398837",
        licenseNumber : "DSGF547GJSA7",
        expiryDate : "27 June 2023",
        postcode : 401502
    },
  ];
  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Security Guards"  />
      <Box display="flex" sx={{ my: "3rem" }}>
        <TableContainer component={Paper} sx={{ mx: "0.8rem" }} >
          <div style={{width: 'auto', overflowX: 'scroll'}}>
            <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
                <TableHead >
                    <TableRow className="table-header">
                        <TableCell align="left" component="th" className="t-cell">Email</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Name</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Contact</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Security License Number</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Expiry</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Postcode</TableCell>
                        <TableCell align="left" component="th" className="t-cell" style={{width : '15%'}}>View License</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell  align="left" className="t-body-cell">
                                    {item.email}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell">
                                    {item.name}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell">
                                    {item.contact}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell">
                                    {item.licenseNumber}
                                </TableCell>
                                <TableCell  align="left" className="t-body-cell">
                                    {item.expiryDate}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell">
                                    {item.postcode}
                                </TableCell>
                                <TableCell  align="center" className="t-body-cell">
                                <Link href="#" underline="always" className="file-class">
                                    {'Open File'}
                                </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell className="t-body-cell" direction="column" justifyContent="center">
                      <Link href="#" underline="none" >
                         {/* Add Guard <AddCircleOutlineIcon  className="add-icon"/> */}
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
                    </TableCell>
                    <TablePagination
                    align="right"
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={users.length}
                    rowsPerPage={10}
                    page={1}
                    SelectProps={{
                        inputProps: {
                        'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    // onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActions}
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


