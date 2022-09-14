import React,{useEffect} from "react";
import { Box, Grid } from "@mui/material";
import PageTitle from "../../../../common/PageTitle";
import SiteDetailCard from "../../../../components/sites/DetailCard";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSites } from "../../../../../features/sites/sitesAPI";
import { selectSites } from "../../../../../features/sites/sitesSlice";

export default function SiteFixedRoasterPage() {
  const siteId = window.location.pathname.split('/')[2]; 
  const { loading, error, data } = useSelector(selectSites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSites());
  },[siteId])


  const siteDetails = [
    {
      id: 1,
      title: "Edit Fixed Roaster",
      url : `/sites/${siteId}/edit-fixed-roaster`
    },

    {
      id: 2,
      title: "View Fixed Roaster",
      url : `/sites/${siteId}/site-view-fixed-roaster`
    },
    {
      id: 3,
      title: "Create Roaster",
      url : `/sites/${siteId}/fixed-roaster/create-fixed-roaster`
    }
  ];

  const getSiteName = () => {
    if(data.length > 0){
      let site =  data.filter((item) => item._id === siteId)[0];
      return site.name + ', ' + site.address + ', ' + site.city + ' / Fixed Roaster'
    }
    else{
      return '';
    }
  }

  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle
        title="Sites View"
        subTitle={getSiteName()}
      />
      <Box display="flex">
        <Grid
          container
          rowSpacing={7}
          columnSpacing={{ xs: 1 }}
          alignContent="center"
          justifyContent="center"
          alignItems="center"
          mt="10%"
        >
          {siteDetails.map((report) => (
            <SiteDetailCard large title={report.title} key={report.id} url={report.url}/>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
