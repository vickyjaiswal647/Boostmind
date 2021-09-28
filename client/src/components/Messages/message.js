import React, {useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = (props) => {

    const diffToast = (message) => {
        toast.success(message,{
            position:"top-center",autoClose: 3000
        })
    }
    return (
        <div>
            {diffToast(props.message)}
            <ToastContainer/>
        </div>
    )
}

export default Message;
