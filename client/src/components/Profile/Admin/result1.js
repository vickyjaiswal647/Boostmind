import React from 'react'
import MaterialTable from 'material-table';
import './result.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '0px 20px 30px',
      width: '25ch',
    },
  },
}));

const Result1 = () => {
    const classes = useStyles();

    const [code, setCode] = React.useState('')

    const [data, setData] = React.useState([{
        fullname:'',email:'',testScore:''
    }])

    const columns = [
        {
            title:"Name", field:'fullname'
        },
        {
            title:"Email", field:'email'
        },
        {
            title:"Score", field:'testScore'
        }
    ]

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

    const handleData = async(e) => {
        e.preventDefault();
        const testCode = code
        const response = await fetch('/users/admin/get-test-result',{
            method:"POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
                },
            body:JSON.stringify({testCode})
        });
        const data = await response.json();
        if(data.status.code === 200){
            diffToast(data.status.message)
            setData(data.info);
        } else {
            errormgs(data.status.message)
        }
    }

    const onChangehandler = (e) => {
        setCode(e.target.value);
    }
    
    return (
        <div>
            <h1 className = "result">Test Result</h1>
            <form method = "POST" className = {classes.root} autoComplete = "off" onSubmit = {handleData}>
                <TextField id="standard-basic" value = {code} onChange = {onChangehandler} label="EnterTestCode" />
            </form>
            <MaterialTable title = "Student Performance" data = {data} columns = {columns} options = {{paging : false , exportButton:true }}/>
            <ToastContainer/>
        </div>
    )
}

export default Result1
