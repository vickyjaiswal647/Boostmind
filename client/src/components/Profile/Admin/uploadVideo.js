import React, {useState,useEffect} from 'react'
import Select from 'react-select'
import './uploadVideo.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'

const options = [
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

const UploadVideo1 = () => {

    const history = useHistory();

    const [dropDownSubject, setDropDownSubject] = useState([{
        value:'',label:''
    }])

    const [semester, setSemester] = useState("")
    const [viedo, setFile] = useState("")
    const [subject, setSubject] = useState("")
    const [displayName, setdisplayName] = useState("")
    const [branch, setBranch] = useState('')

    

    const semesterHandler = (e) => {
        setSemester(e.value);
        // const semester = e.value;
        // const response = await fetch("/users/admin/get-subject",{
        //     method : "POST",
        //     mode:"cors",
        //     header:{
        //         "Content-Type" : "application/json",
        //         'Accept': 'application/json',
        //         'x-auth-token':localStorage.getItem('token')
        //     },
        //     body:JSON.stringify({semester,branch})  
        // })
        // console.log(await response.json());
    }

    const branchHandler = (e) => {
        setBranch(e.value);
    }

    const subjectHandler = (e) => {
        setSubject(e.value)
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

    const HandleUploadVideo = async (ev) => {
        ev.preventDefault();        
        const formData = new FormData()
        formData.append('viedo',viedo)
        formData.append('semester',semester)
        formData.append('subject',subject)
        formData.append('displayName',displayName)
        formData.append('branch',branch)
    
        let result = await fetch("/users/admin/upload-viedo", {
          method :"POST",
          body: formData,
            headers : {
              "x-auth-token" : localStorage.getItem('token')
            },
        });
        const res = await result.json();
        if(res.status.code === 200){
            diffToast(res.status.message)
            setTimeout(function(){ history.push('/profilePage'); }, 3000);
        } else {
            errormgs(res.status.message)
        }
      
      }

      const getSubject = async() => {
        const response = await fetch('/users/admin/get-subject',{
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
        });
        const data = await response.json();
        if(data.status.code === 200){
            setDropDownSubject(data.info);
        }
    }

    useEffect(()=>{
        getSubject();
    },[])

    return (
        <>
            <form  onSubmit={HandleUploadVideo} className="form-control">
                <div className="form-heading">
                    <h2>Upload Video</h2>
                </div> 
                <div className = "form-input"> 
                    <div className="input-upload-name">
                        <label className="labell-name" htmlFor="semester">
                            <h4>Branch : </h4>
                        </label>
                        <Select onChange = {branchHandler} options = {options}/>
                    </div> 
                    <div className="select-semester">
                        <label className="labell-name" htmlFor="semester">
                            <h4>Semester : </h4>
                        </label>
                        <Select onChange = {semesterHandler} options = {dropDownSemester}/>
                    </div>    
                    <div className="select-subject">
                        <label className="labell-name" htmlFor="subject">
                            <h4>Subject : </h4> 
                        </label>
                        <Select onChange = {subjectHandler} options = {dropDownSubject}/>
                    </div>
                    <div className="input-upload-file ">
                        <label className="labell-name"> <h4>Select the File :</h4> </label>
                        <input type="file" id="file-select" name = "selectFile" onChange = {(e)=>setFile((e.target.files[0]))} />
                    </div>
                    <div className="input-upload-name">
                        <label className="labell-name"> <h4>Name the File</h4> </label>
                        <input className = 'fileInput' name = "selectFileName" onChange = {(e)=>setdisplayName((e.target.value))} type="text" placeholder="Enter the desired name of file" />
                    </div>
                    <br />
                    <div className = 'btn'>
                        <button className="upload-button">Upload</button>
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </>
    )
}

export default UploadVideo1
