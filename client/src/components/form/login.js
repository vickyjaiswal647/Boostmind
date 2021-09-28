import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link,useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        padding:'0px 0px 60px',
        width: '500px',
        margin: '70px auto',
        boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2)',
        borderRadius:'10px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'column',
        alignItems:'center'
    },
    textField: {
        margin:theme.spacing(1),
        width: '80%',
    },
    button: {
        marginTop:theme.spacing(1),
        alignItems:'center',
        height: theme.spacing(7),
        borderRadius:'px',
        width:'40%'
    },
    forgetpassword: {
        marginTop:'2rem',
        fontFamily: 'Poppins,sans-serif'
    },
    heading: {
        marginTop:'1rem',
        marginBottom:'50px',
        fontFamily: 'Poppins,sans-serif'
    },
    remember: {
        margin:'40px',
        fontFamily: 'Poppins,sans-serif',
    } 
}));

const Login = ({changed}) => {

    const history = useHistory();

    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({...values,[name]: value});
    };

    const diffToast = (message) => {
        toast.error(message,{
            position:"top-right",autoClose: 3000
        })
    }

    // const successmgs = (message) => {
    //     toast.success(message,{
    //         position:"top-right",autoClose: 5000
    //     })
    // }
    
    const submitForm = async(e) => {
        e.preventDefault();
        const {email,password} = values;
        const response = await fetch("/users/sign-in", {
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json'
            },
            body:JSON.stringify({email,password})
        });

        const data = await response.json();
        localStorage.setItem('token',data.info);
        if(data.status.code === 200){
            // successmgs("Welcome to Boostmind, Happy Learning!!!")
            // setTimeout(function(){ history.push('/'); }, 2000);
            
                changed(true);
           
            history.push('/')
        }else{
            diffToast(data.status.message);
        } 
    }

    return (
        <>
            <form className = {classes.root} autoComplete = "off" onSubmit={submitForm} ><br/>
                <h1 className = {classes.heading} >Welcome Geeks!</h1>
                <TextField autoFocus className = {classes.textField} id = "outlined-basic" label = "Email" variant = "outlined" name = "email" values = {values.email} onChange = {handleChange}/>
                <TextField className = {classes.textField} id="outlined-password-input" label="Password" type="password" autoComplete="current-password" name = "password" variant="outlined" values = {values.password} onChange = {handleChange}/>
                <Button type="submit" className = {classes.button} variant="contained" color="primary" disableElevation>Login</Button>
                <p className = {classes.forgetpassword}>or <Link to = '#'>Forget Password</Link></p>
                <p className  = {classes.remember}>Don't have an Account <Link to = '/signUp'>SignUp</Link></p>
            </form>
            <ToastContainer/>  
        </>
    )
}

export default Login
