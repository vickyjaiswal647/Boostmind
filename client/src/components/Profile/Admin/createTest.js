import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./createTest.css";
const CreateTest = () => {

  const history = useHistory();

  const [data, setData] = useState({
    testName :  '',
    testCode : '',
    totalQuestions : '',
    attemptableQuestion : '',
    testTime : '',
    semester : '',
    branch:''
  });

  const changeInputField = (e) => {
    const {name,value} = e.target;
    setData({...data, [name]: value});
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

  const submitTest = async(e) => {
    e.preventDefault();
    const {testName,testCode,totalQuestions,attemptableQuestion,testTime,semester,branch} = data;
        const response = await fetch("/users/admin/new-test", {
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({testName,testCode,totalQuestions,attemptableQuestion,testTime,semester,branch})
        });

        const data1 = await response.json();
        if(data1.status.code === 200 ){
          diffToast(data1.status.message)
          setTimeout(function(){ history.push('/createQuestion'); }, 3000);
        } else {
          errormgs(data1.status.message)
        }
  }


  return (
    <>
      <form className="form-control" onSubmit={submitTest} autoComplete = "off">
        <div className="create-test-heading">
          <div id="test-heading">
              <h3>-- Test Status --</h3>    
          </div>
          <div className="test-input">
            <div className="test-name">
              <label htmlFor="tname">Test Name :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.testName}
                id="fname"
                name="testName"
                placeholder="Test name.."
              />
            </div>

            <div className="test-code">
              <label htmlFor="tcode">Test Code :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.testCode}
                id="tcode"
                name="testCode"
                placeholder="Test code.."
              />
            </div>

            <div className="total-question-uploaded">
              <label htmlFor="quploaded">Number of Questions Uploaded :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.totalQuestions}
                id="quploaded"
                name="totalQuestions"
                placeholder="Number of questions uploaded.."
              />
            </div>

            <div className="total-question-attempted">
              <label htmlFor="qattempted">Number of Questions Attempted :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.attemptableQuestion}
                id="qattempted"
                name="attemptableQuestion"
                placeholder="Your name.."
              />
            </div>

            <div className="test-time-duration">
              <label htmlFor="tduration">Test Time Duration :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.testTime}
                id="tduration"
                name="testTime"
                placeholder="Test duration.."
              />
            </div>
            <div className="semester1">
              <label htmlFor="semester">Semester :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.semester}
                id="semester"
                name="semester"
                placeholder="Semester.."
              />
            </div>
            <div className="semester1">
              <label htmlFor="semester">Branch :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.branch}
                id="semester"
                name="branch"
                placeholder="Branch.."
              />
            </div>
            <div className="test-button">
            <button className="upload-button">Submit</button>
              {/* <input type="submit" placeholder="Submit"/> */}
            </div>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
};

export default CreateTest;