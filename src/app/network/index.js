import { axiosInstance } from "../../utils/axiosSetup";
import { toast } from "react-toastify";


const toastObj = {position: toast.POSITION.TOP_RIGHT};

const responseCheck = (res) => {
    if(res.code === 200 || res.code === 201 || res.code === 204){
        return true;
    }
    else{
        return false;
    }
}

export  const getAPI = async(url) => {
    try {
        const response = await axiosInstance.get(url);
        if(responseCheck){
            // toast.success(response.data.message,toastObj);
            return response.data.data;
            
        }
        else{
            toast.error(response.data.message,toastObj);
            return false;
        }
    } catch (err) {
        toast.error(err.response.data, toastObj);
        return false;
        // return rejectWithValue(err.response.data);
    }
}


export  const postAPI = async(url,data) => {
    try {
        const response = await axiosInstance.post(url, data);
        if(responseCheck){
            toast.success(response.data.message,toastObj);
            return response.data;
        }
        else{
            toast.error(response.data.message,toastObj);
            return false;
        }
    } catch (err) {
        toast.error(err.response.data, toastObj);
        return false;
        // return rejectWithValue(err.response.data);
    }
}


export  const patchAPI = async(url,data) => {
    try {
        const response = await axiosInstance.patch(url, data);
        if(responseCheck){
            toast.success(response.data.message,toastObj);
            return response.data;
        }
        else{
            toast.error(response.data.message,toastObj);
            return false;
        }
    } catch (err) {
        toast.error(err.response.data, toastObj);
        return false;
        // return rejectWithValue(err.response.data);
    }
}

export  const deleteAPI = async(url) => {
    try {
        const response = await axiosInstance.delete(url);
        if(responseCheck){
            toast.success(response.data.message,toastObj);
            return response.data;
        }
        else{
            toast.error(response.data.message,toastObj);
            return false;
        }
    } catch (err) {
        toast.error(err.response.data, toastObj);
        return false;
        // return rejectWithValue(err.response.data);
    }
}