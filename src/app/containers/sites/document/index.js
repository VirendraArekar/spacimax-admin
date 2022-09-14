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
// import { blue } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectSiteDocument } from "../../../../features/sites/sitesSlice";
import {
  getSiteDocument,
  siteDeleteDocument,
  siteSaveDocument,
} from "../../../../features/sites/sitesAPI";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import Image from 'material-ui-image';
import { useParams } from "react-router-dom"
import "./style.css";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { axiosInstance } from "../../../../utils/axiosSetup";

export default function SiteDocumentPage() {
    const [open, setOpen] = React.useState(false);
    const { siteId } = useParams();
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector(selectSiteDocument);
    const [category, setCategory] = React.useState("");
    const [visibility, setVisibility] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [docType, setDocType] = React.useState("");
    const [image, setImage] = React.useState("");

  // const [selectedOption, setSelectedOption] = useState(1);
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
    // handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      docType: "",
      category: "",
      description: "",
      access: "",
      file: "",
    },
  });

  useEffect(() => {
    dispatch(getSiteDocument({ siteId: siteId }));
  }, []);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = async (category, visibility, image, docType, desc) => {
    // console.log("onSave");
    console.log(category, visibility, image, docType, desc, "data")
    var formData = new FormData();
    formData.append("category", category);
    formData.append("picture", image);
    formData.append("visibility", visibility);
    formData.append("siteId", category);
    formData.append("title", docType);
    formData.append("keyword", desc);
    formData.append("siteId", siteId);
    console.log(formData, "form")
        await axiosInstance.post("user/site-specific-induction", formData);
        // dispatch(getSiteDocument({ siteId: siteId }));
          return res.data;
      

  };


  console.log(data, "data");

  const deleteCheckpoint = async (siteId) => {
    // const res = await axiosInstance.delete(`/checkpoints/${id}`);
    dispatch(siteDeleteDocument({ id: siteId }));
    reset();

    console.log(siteId, "siteID")
  };

  const onChangeImage = (event) => {
    event.preventDefault();
    console.log(event, "event")
    const fileUpload = event.target.files[0];
    setImage(fileUpload);
  }


  return (
    <Box sx={{ height: "inherit" }}>
      <PageTitle title="Site View"  subTitle="111, ABC Street, Sydney / Site Documents"/>
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
                        <TableCell align="left" component="th" className="t-cell">Upload File</TableCell>
                        <TableCell align="left" component="th" className="t-cell">Accessible on App</TableCell>
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
                                  <div  className="custom-table-cell" align="center">
                                        <span className="add-title">{item.category}</span>
                                        <RemoveCircleIcon className="add-icon" fontSize="large" onClick={() => deleteCheckpoint(item.id)}/>
                                    </div>
                                </TableCell>
                                   
                                     
                                
                                
                                <TableCell  align="left" className="t-body-cell">
                                
                                    {item.title}
                                </TableCell>
                                <TableCell  align="left" className="t-body-cell">
                                    {item.keyword}
                                </TableCell>
                                <TableCell  align="left" className="t-body-cell">
                                <Image
                                      src={item.document}
                                    />
                                </TableCell>
                                <TableCell  align="left" className="t-body-cell">
                                {/* <FormControl sx={{ m: 0, p : 0, width : "70%" }}>
                                    <Select
                                        value={selectedOption}
                                        onChange={changeOption}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        style={{borderRadius : 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor : "#707070", padding : "0px 10px", height : 40, backgroundColor : 'white'}}
                                        >
                                       
                                      
                                        {
                                            options.map((item, index) => (
                                                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl> */}
                                {item.visibility ? "Yes" : "No"}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell className="t-body-cell" direction="column" justifyContent="center"  onClick={handleClickOpen}>
                      <Link href="#" underline="none" >
                         <div className="custom-table-cell">
                            <span className="add-title">Add Document</span>
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
                  name="category"
                  control={control}
                  render={() => (
                    <Select
                      fullWidth
                      label="Category"
                      variant="standard"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
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
                      label="Document Type"
                      variant="standard"
                      type="text"
                      required
                      onChange={(e) => setDocType(e.target.value)}
                      value={docType}
                      sx={{ borderColor: red[100] }}
                      error={!!errors.docType}
                      helperText={
                        errors.docType ? errors.docType?.message : null
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
                  render={() => (
                    <TextField
                      fullWidth
                      label="Description"
                      variant="standard"
                      type="text"
                      required
                      onChange={(e) => setDesc(e.target.value)}
                      value={desc}
                      error={!!errors.description}
                      helperText={errors.description ? errors.description?.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="Upload File"
                  control={control}
                  rules={{
                    required: true,
                    min: {
                      message: "Minimum Value Is Zero",
                      value: 0,
                    },
                  }}
                  render={() => (
                    <>
                       <label>Upload file</label>
                    <input name="file" type="file"  onChange={onChangeImage}/>
                    </>
                   
                  )}
                />
              </Grid>
              <Grid item xs={7} justifyContent="center" display="flex">
                <Controller
                  name="Accesable on Phone"
                  control={control}
                  // rules={{
                  //   required: true,
                  //   min: {
                  //     message: "Minimum Value Is Zero",
                  //     value: 0,
                  //   },
                  // }}
                  render={() => (
                    <Select
                    fullWidth
                    label="Accessible on App"
                    name="Accessible on App"
                    // variant="standard"
                    onChange={(e) => setVisibility(e.target.value)}
                    value={visibility}
                    error={!!errors.access}
                    helperText={errors.access ? errors.category?.access : null}
                        >
                        
                        <MenuItem value={"true"}>Yes </MenuItem>
                      <MenuItem value={"false"}>No</MenuItem>
                       
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
                <Button onClick={() => onSave(category, visibility, image, docType, desc)}>
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


