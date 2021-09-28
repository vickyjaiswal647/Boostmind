import React, { useState, useEffect } from 'react'
import './cseSem1.css';
import {useHistory} from 'react-router-dom'

const Subject = () => {

    const history = useHistory();

    const [subject,setSubject] = useState([{
        label:'',id:'',value:''
    }])

    const getSubjectName = async() => {
        const response = await fetch('/users/student/user-subject',{
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
        });
        const data = await response.json();
        if(data.status.code === 200){
            setSubject(data.info);
        } 
    }

    useEffect(()=>{
        getSubjectName();
    },[])

    const subjectClick = async(e,value) => {
        e.preventDefault();
        const data = value;
        const response = await fetch('/users/student/go-to-course',{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({data})
        })
        const resdata = await response.json();
        if(resdata.status.code === 200){
            const data1 = resdata.info;
            localStorage.setItem('data1',JSON.stringify(data1));
            history.push('/videoTutorials')
        }    
    }
    return (
        <>
            <h1 style = {{marginLeft:'200px', padding:'40px 0px 0px 0px'}}>Choose Your Subject</h1>
                <div className="semester1-container">
                    {subject.map((data) => { 
                        return (
                            <div key = {data.id} onClick = {(e) => subjectClick(e,data.value)} className="semester1-card">
                                <img alt="subjects" src= "https://www.sparknotes.com/images/banner-othersubjects.svg" />
                                <div className="semester1-info">
                                    <div className="semester1-sub-title">
                                        <span className="semester1-sub-description">
                                            {data.label}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )})}
                </div>
        </>
    )
}

export default Subject