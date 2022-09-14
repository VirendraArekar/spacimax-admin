import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const Loader =  (props) => {
 return(
    props.loader ?
    <Box sx={{  position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex : 900, backgroundColor : 'white' }}>
        <CircularProgress /> <br></br>
        <h5 style={{textAlign : 'center'}}>Loading ...</h5>
    </Box>
    :
    <>
    </>
 )
}

export default Loader;