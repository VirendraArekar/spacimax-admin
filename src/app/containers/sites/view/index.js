import React from "react";
import { Box, Button, Grid  } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
// import { blue } from '@mui/material/colors';


import "./style.css";

export default function ViewPage() {
  const users = [
    {
        id: 1,
        title: "Manager",
        start : 1,
        end : 10,
        color : '#FF7600'
    },
    {
        id: 2,
        title: "Assistant Manager",
        start : 0,
        end : 8,
        color : '#6796DC'
    },
    {
        id: 3,
        title: "Day Controller",
        start : 8,
        end : 14,
        color : '#00DD8C'
    },
    {
        id: 4,
        title: "Afternoon Controller",
        start : 8,
        end : 14,
        color : '#EBD400'
    },
    {
        id: 5,
        title: "Night Controller",
        start : 12,
        end : 16,
        color : '#FF7600'
    },
    {
        id: 6,
        title: "Day Rover",
        start : 0,
        end : 8,
        color : '#6796DC'
    },
    {
        id: 7,
        title: "Afternoon Rover",
        start : 9,
        end : 14,
        color : '#00DD8C'
    },
    {
        id: 8,
        title: "Night Rover",
        start : 8,
        end : 16,
        color : '#EBD400'
    }
  ];

  const loops = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Site View"  subTitle={'111, ABC Street, Sydney / Fixed Roaster / View Fixed Roaster'}/>
      <Grid
          container
          className="grid-row"
        >
          <Grid item xs={12} >
             <div className="btn-row">
                <Button variant="outlined" className="row-btn">Daily</Button>
                <Button variant="outlined" className="row-btn">Weekly</Button>
                <Button variant="outlined" className="row-btn">Monthly</Button>
                <Button variant="outlined" className="row-btn">Yearly</Button>
                <Button variant="outlined" className="row-btn">Every Day(1)</Button>
                <Button variant="outlined" className="row-btn">Every Weekday</Button>
                <Button variant="outlined" className="row-btn">Every Weekend</Button>
             </div>
            
          </Grid>
        </Grid>
      <Box display="flex" sx={{ my: "2rem" }}>
        
        <TableContainer component={Paper} sx={{ mx: "0.8rem" }} >
          {/* <div style={{width: 'auto', overflowX: 'scroll'}}> */}
            <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
                <TableHead >
                    <TableRow className="table-header">
                        <TableCell align="left" component="th" className="t-cell">Roles</TableCell>
                        {
                            loops.map((item, index) => (
                                <TableCell align="left" component="th" className="t-cell" key={index}>{item+6}</TableCell>
                            ))
                        }
                        
                       
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell  align="left" className="t-body-cell" style={{width : '25%'}}>
                                    {item.title}
                                </TableCell>
                                <TableCell align="left" className="t-body-cell" colSpan={loops.length}>
                                    <div style={{backgroundColor : item.color, height : 30, marginLeft : 28 * item.start , marginRight : (18 - item.end) * 30, borderRadius : 5 }}></div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
               
            </Table>
            {/* </div> */}
        </TableContainer>

      </Box>
    </Box>
  );
}


