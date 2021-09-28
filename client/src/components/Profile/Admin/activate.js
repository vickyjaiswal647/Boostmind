import React, { useState } from 'react'
import './Activate.css'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//import { Redirect } from 'react-router';


const useStyles = makeStyles((theme) => ({
    textField: {
        margin:theme.spacing(1),
        width : '80%',
    },
    button: {
        marginTop:theme.spacing(1),
        alignItems:'center',
        height: theme.spacing(7),
        borderRadius:'px',
        width:'30%'
    }
}));

const Activate = () => {

    const classes = useStyles();

    const [code, setCode] = useState('');
    const [active,setActive] = useState(null);

    const handleChange = (e) => {
        setCode(e.target.value);
    }

    const activatehandle = () => {
        setActive(true);
    }

    const deactivatehandle = () => {
        setActive(false);
    }

    const diffToast = (message) => {
        toast.success(message,{
            position:"top-right",autoClose: 3000
        })
    }
    
      const errormgs = (message) => {
          toast.error(message,{
              position:"top-right",autoClose: 3000
          })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(active){
            const testCode = code;
            const response = await fetch("/users/admin/activate-test", {
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({testCode})
            });
            const res = await response.json();
            if(res.status.code === 200){
                diffToast(res.status.message)
            }else{
                errormgs(res.status.message)
            }

        }else{
            const testCode = code;
            const response = await fetch("/users/admin/deactivate-test", {
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({testCode})
            });
            const res = await response.json();
            if(res.status.code === 200){
                diffToast(res.status.message)
            }else{
                errormgs(res.status.message)
            }
        }
    }


    return (
        <>
            <form method = "POST" onSubmit={handleSubmit}>
                <div className = "Activate">
                    <h1>Test Activation</h1> 
                    <h1>Test Code</h1>
                    <TextField autoFocus className = {classes.textField} id = "outlined-basic" label = "Test Code" variant = "outlined" name = "testcode" value = {code}  onChange = {handleChange}/>
                    <div className = "button">
                        <Button onClick = {activatehandle} type="submit" className = {classes.button} variant="contained" color="primary" disableElevation>Activate Test</Button>
                        <Button onClick = {deactivatehandle} type="submit" className = {classes.button} variant="contained" color="primary" disableElevation>Deactivate Test</Button>
                    </div>
                </div>
            </form> 
            <ToastContainer/>
        </>   
    )
}

export default Activate;
