import React,{useEffect} from "react";
import { Box, Grid } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import SiteDetailCard from "../../../components/sites/DetailCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSites } from "../../../../features/sites/sitesAPI";
import { selectSites } from "../../../../features/sites/sitesSlice";


export default function SiteDetailPage() {
  const { siteId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(selectSites);
  const siteDetails = [
    {
      id: 1,
      title: "Live View",
      url: `/sites/${siteId}/site-data`,
    },

    // {
    //   id: 2,
    //   title: "Site View",
    //   url: `/sites/${siteId}/site-data`,
    // },
    {
      id: 2,
      title: "Site Team",
      url: `/sites/${siteId}/team`,
    },
    {
      id: 3,
      title: "Site Settings",
      url: `/sites/${siteId}/setting`,
    },
    {
      id: 4,
      title: "Fixed Roster",
      url: `/sites/${siteId}/fixed-roaster`,
    },
    {
      id: 5,
      title: "Site Documents",
      url: `/sites/${siteId}/documents`,
    },
    {
      id: 6,
      title: "Site Overview",
      url: `/sites/${siteId}/overview`,
    },
    {
      id: 7,
      title: "Site Inspection",
      url: `/sites/${siteId}/inspection`,
    },
    // {
    //   id: 8,
    //   title: "Site Inspection Forms",
    //   url: `/sites/${siteId}/inspection/form`,
    // },
    {
      id: 9,
      title: "Site Reports",
      url: "#",
    },
  ];

  useEffect(() => {
    dispatch(getSites());
  },[siteId])

  const getSiteName = () => {
    if(data.length > 0){
      let site =  data.filter((item) => item._id === siteId)[0];
      return site.name + ', ' + site.address + ', ' + site.city;
    }
    else{
      return '';
    }
  }



  return (
    <Box>
      <PageTitle title="Sites View" subTitle={getSiteName()} />
      <Grid container rowSpacing={7} columnSpacing={{ xs: 1 }}>
        {siteDetails.map((report) => (
          <SiteDetailCard
            title={report.title}
            key={report.id}
            url={report.url}
          />
        ))}
      </Grid>
    </Box>
  );
}
