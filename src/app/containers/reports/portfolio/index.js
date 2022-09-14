import React from "react";
import { Box  } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import {faker} from '@faker-js/faker';
// import { blue } from '@mui/material/colors';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

import "./style.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function PorfolioReportPage() {
    const options = {
        responsive: true,
        layout: {
            // padding: {
            //     top: 5,
            //     left: 15,
            //     right: 15,
            //     bottom: 15
            // }
            height : 400,
            fontSize : 18
        },
        plugins: {
          legend: {
            position: 'bottom' ,
          },
          title: {
            display: true,
            text: 'Fixed Roaster Hours Performed',
          },
        },
    };

    const optionsCasual = {
    responsive: true,
    layout: {
        // padding: {
        //     top: 5,
        //     left: 15,
        //     right: 15,
        //     bottom: 15
        // }
        height : 400,
        fontSize : 18
    },
    plugins: {
        legend: {
        position: 'bottom' ,
        },
        title: {
        display: true,
        text: 'Casual Shift Performance',
        },
    },
    };
    const labels = ['Jan - 22', 'Feb - 22', 'Mar - 22', 'Apr - 22', 'May - 22', 'Jun - 22', 'Jul - 22'];
   
    const data = {
        labels,
        datasets: [
          {
            label: 'Operation Manager',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 2500 })),
            backgroundColor: 'rgb(116,103,240)',
          },
          {
            label: 'Day Controller',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 2500 })),
            backgroundColor: 'rgb(243,111,78)',
          },
          {
            label: 'Night Controller',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 2500 })),
            backgroundColor: 'rgb(128,145,170)',
          },
          {
            label: 'Static Guard',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 2500 })),
            backgroundColor: 'rgb(254,202,87)',
          },
          {
            label: 'Day Raving Guard',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 2500 })),
            backgroundColor: 'rgb(39,152,247)',
          },
          {
            label: 'Night Raving guard',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 2500 })),
            backgroundColor: 'rgb(87,234,3)',
          },
          {
            label: 'Other',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 2500 })),
            backgroundColor: 'rgb(30,52,136)',
          },
        ],
    };


    const dataCasual = {
    labels,
    datasets: [
        {
        label: 'Booked Hours',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1400 })),
        backgroundColor: '#2896E9',
        },
        {
        label: 'Actual Hours',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1400 })),
        backgroundColor: '#F36F4E',
        },
        {
        label: 'Lost Time',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1400 })),
        backgroundColor: '#8091AA',
        },
    ],
    };
    
  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Reports"  subTitle="Portfolio Reports"/>
      <Box display="flex" sx={{  mx : "0.5rem", p : "1rem" }} className="bar-box">
        <Bar options={options} data={data} className="bar-chart"/>
      </Box>

      <Box display="flex" sx={{  mx : "0.5rem", p : "1rem" }} className="bar-box">
        <Bar options={optionsCasual} data={dataCasual} className="bar-chart"/>
      </Box>
    </Box>
  );
}


