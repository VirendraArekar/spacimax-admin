import React, {useEffect, useState} from "react";
import { Box, Button, Grid, FormControl } from "@mui/material";
import PageTitle from "../../common/PageTitle";
import FAQCard from "../../components/faq/FAQCard";
import { getAPI, postAPI } from "../../network";
import Loader from "../../common/Loader";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { toast } from "react-toastify";


export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [idError, setIdError] = useState(false)
  const [desc, setDesc] = useState('')
  const [descError, setDescError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getFaqs();
  },[])

  const getFaqs = async() => {
    setLoader(true);
    let faqs = await getAPI('/pages');
    if(faqs){
      setFaqs(faqs);
    }
    setLoader(false);
  }
  const questions = [
    {
      id: 1,
      title: "Frequently Asked Questions",
      url : "/faq/frequently-asked-questions"
    },

    // {
    //   id: 2,
    //   title: "Privacy Policy",
    //   url : "/faq/privacy-policy"
    // },
    // {
    //   id: 3,
    //   title: "User Guide",
    //   url : "/faq/user-guide"
    // },
  ];

  const addClick = () => {
    setTitleError(false);
    setDescError(false);
    setIdError(false);
    setTitle('');
    setDesc('');
    setIdentifier('');
    setOpen(true);
  }
   
  const toastObj = {position: toast.POSITION.TOP_RIGHT};

  const addFaq = async() => {
    setTitleError(false);
    setDescError(false);
    setIdError(false);
    var re = /^[a-z]+(?:_+[a-z]+)*$/;

    if(identifier === ''){
        toast.warning('Identifier is required!',toastObj);
        setIdError(true);
        return;
    }
    else if(!re.test(identifier)){
        toast.warning('Identifier allow  only underscore and small letter!',toastObj);
        setIdError(true);
        return;
    }
    else if(title === '' || title.length < 3){
        toast.warning('Title is required! at least 3 character long',toastObj);
        setTitleError(true);
        return;
    }
    else if(desc === '' || desc.length < 10){
        toast.warning('Description is required! at least 10 character long',toastObj);
        setDescError(true);
        return;
    }

    let payload = {
        identifier : identifier,
        title : title,
        description : desc
    }

    setLoader(true);
    let data = await postAPI('/pages', payload);
    if(data){
      getFaqs()
      setOpen(false)
    }
    setLoader(false);
  }



  
  return (
    <Box sx={{ height: "inherit" }}>
      <Loader loader={loader} />
      <PageTitle title="FAQ's" subTitle="Online Reference Documents" />
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{mx : 8}}
      >
        <Button variant="contained" style={{backgroundColor : "grey"}} sx={{ height: 50 }} onClick={addClick}>
          <AddCircleOutlineIcon />&nbsp;
          Add Page
        </Button>
      </Box>
      <Box display="flex">
        <Grid
          container
          rowSpacing={7}
          columnSpacing={{ xs: 1 }}
          alignContent="center"
          justifyContent="center"
          alignItems="center"
          mt="2%"
        >
          {questions.map((report) => (
            <FAQCard large title={report.title} key={report.id} url={report.url}/>
          ))}
          {faqs.map((faq) => (
            <FAQCard large title={faq.title} key={faq.id} url={`/faq/${faq?.id}`}/>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle sx={{ mb: 4 , textAlign :"center" }}>Add Page</DialogTitle>
  
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
          <FormControl sx={{  minWidth : '97%', mx : 0, px :0 }}>
            <TextField 
              id="identifier" 
              label="Identifier" 
              variant="outlined" 
              type="text" 
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value)
              }}
              error={idError}
              fullWidth
              sx={{m : 0}}
            />
          </FormControl>
          
          

          <FormControl sx={{  minWidth : '97%', mx : 0, px :0 }}>
            <TextField 
              id="title" 
              label="Title" 
              variant="outlined" 
              type="text" 
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
              }}
              error={titleError}
              fullWidth
              sx={{m : 0}}
            />
          </FormControl>

          <FormControl sx={{  minWidth : '97%' }}>
            <TextField 
              id="desc" 
              label="Description" 
              variant="outlined" 
              type="text" 
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value)
              }}
              error={descError}
              fullWidth
            />
          </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{mb : 2 , mx : 4}}>
          <Button onClick={addFaq} variant="contained">Add</Button>
          <Button onClick={() => setOpen(false)} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
