import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import {Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        flexWrap: 'wrap',
        position: 'relative',
        padding:'0px 0px 60px',
        width: '500px',
        margin: '70px auto',
        boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2)',
        borderRadius:'10px'
    },
    textField: {
        margin: theme.spacing(0.9),
        width: '80%',
    },
    button: {
        marginTop:theme.spacing(1),
        alignItems:'center',
        height: theme.spacing(7),
        borderRadius:'px',
        width:'40%'
    },
    heading: {
        marginTop:'1rem',
        marginBottom:'50px',
        fontFamily: 'Poppins,sans-serif'
    },
    remember: {
        margin:'30px',
        fontFamily: 'Poppins,sans-serif',
    },
    select:{
        margin: theme.spacing(0.9),
        width:'80%',
    }
}));


const branch = [
    { value: 'CSE', label: 'Computer Science and Engineering'},
    { value: 'IT', label: 'Information Technology' },
    { value: 'ME', label: 'Mechnical Engineering' },
    { value: 'EE', label: 'Electrical Engineering' },
    { value: 'TE', label: 'Textile Engineering' },
    { value: 'ECE', label: 'Electronics and Communication Engineering' },
    { value: 'CE', label: 'Civil Engineering' },
  ];

const dropDownSemester = [
    {value:'1',label:"First Semester"},
    {value:'2',label:"Second Semester"},
    {value:'3',label:"Third Semester"},
    {value:'4',label:"Fourth Semester"},
    {value:'5',label:"Fifth Semester"},
    {value:'6',label:"Sixth Semester"},
    {value:'7',label:"Seventh Semester"},
    {value:'8',label:"Eight Semester"},
]

const SignUp1 = () => {

    const history = useHistory();

    const classes = useStyles();

    const [evalues, setEvalues] = useState({email:''});

    const [values, setValues] = useState({
        otp:'',
        fullname: '',
        password: '',
        confirmpassword: '',
        semester:'',
        branch:'',
    });

    const semesterHandler = (e) => {
        setValues({...values,semester:e.value})
    }

    const branchHandler = (e) => {
        setValues({...values,branch:e.value})
    }

    const [formsubmission, setFormsubmission] = useState(false);

    const handleemailChange = e => {
        const {name, value} = e.target;
        setEvalues({...evalues,[name]:value});
    };

    const diffToast = (message) => {
        toast.error(message,{
            position:"top-right",autoClose: 3000
        })
    }

    const successmgs = (message) => {
        toast.success(message,{
            position:"top-right",autoClose: 3000
        })
    }

    const handleformChange = e => {
        const { name, value } = e.target;
        setValues({...values,[name]: value});
    };

    async function submitemailForm(e){
        e.preventDefault();
        const {email} = evalues;
        
        const response = await fetch("/users/sign-up", {
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json'
            },
            body:JSON.stringify({email})
        });

        const data = await response.json();

        if(data.status.code === 200) {
            setFormsubmission(true);
        } else {
            diffToast(data.status.message);
        }
    }

    const submitForm = async(e) => {
        e.preventDefault();
        const {otp,fullname,password,confirmpassword,semester,branch} = values;
        const response = await fetch("/users/create", {
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json'
            },
            body:JSON.stringify({otp,fullname,password,confirmpassword,semester,branch})
        });

        const data = await response.json();
        if(data.status.code === 200){
            history.push('/login');
            successmgs("Account Created. Singin to continue..")
        } else {
            diffToast(data.status.message)
        }
        
    }

    return (
        <>
            {formsubmission?
                <form method = "POST" className = {classes.root} autoComplete = "off" onSubmit={submitForm} ><br/>
                    <h1 className = {classes.heading} >Personal Details</h1>
                    <TextField autoFocus className = {classes.textField} id="outlined-basic" label="OTP" variant="outlined" name = "otp" size = "small" value = {values.otp} onChange = {handleformChange}/>
                    <TextField className = {classes.textField} id = "outlined-basic" label = "FullName" name = "fullname" variant = "outlined" size = "small" value = {values.fullname} onChange = {handleformChange}/>
                    <TextField className = {classes.textField} id="outlined-password-input" label="Password" type="password" autoComplete="current-password" name = "password" variant="outlined" size = "small" value = {values.password} onChange = {handleformChange}/>
                    <TextField className = {classes.textField} id="outlined-password-input" label="ConfirmPassword" type="password" autoComplete="current-password" name = "confirmpassword" variant="outlined" size = "small" value = {values.confirmpassword} onChange = {handleformChange}/>
                    {/* <TextField className = {classes.textField} id="outlined-number" label="Semester" type="number" InputLabelProps={{ shrink: true, }} variant="outlined" name = "semester" size = "small" value = {values.semester} onChange = {handleformChange}/> */}
                    <Select className = {classes.select} placeholder = "Select Semester" onChange = {semesterHandler} options = {dropDownSemester}/>
                    <Select className = {classes.select} onChange = {branchHandler} placeholder = "Select Branch" options = {branch}/>
                    {/* <TextField className = {classes.textField} id = "outlined-basic" label = "Branch" variant = "outlined" size = "small" name = "branch" value = {values.branch} onChange = {handleformChange}/> */}
                    <Button type="submit" className = {classes.button} variant="contained" color="primary" disableElevation>SignUp</Button>
                </form> : 
                <form method = "POST" className = {classes.root} autoComplete = "off" onSubmit = {submitemailForm} ><br/>
                    <h1 className = {classes.heading} >SignUp and Start Learning!</h1>
                    <TextField autoFocus className = {classes.textField} id = "outlined-basic" label = "Email" variant = "outlined" name = "email" value = {evalues.email} onChange = {handleemailChange}/>
                    <Button type="submit" className = {classes.button} variant="contained" color="primary" disableElevation>Send Otp</Button>
                    <p className = {classes.remember}>Already have an account? <Link to = '/login'>Log In</Link></p>
                </form>}
                <ToastContainer/>
        </>
    )
}

export default SignUp1