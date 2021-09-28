import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./createQuestion.css";

const CreateTest = () => {
  // const [DropdownValue, setDropdownValue] = useState({
  //   correctAnswer : ""
  // });
   
  // const [code,setCode] = useState('')
  const history = useHistory();
  const [data, setData] = useState({
    //quesNumber : "",
    testCode:'',
    qStatement: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer:''
  });

  const ChangeInputField = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitQuestionForm = (e) => {
    e.preventDefault();
    history.push('/profilePage')
  };

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

  const AddMoreQues = async(e) => {
    e.preventDefault();

    const {testCode,qStatement,option1,option2,option3,option4,correctAnswer} = data;
        const response = await fetch("/users/admin/add-question", {
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({testCode,qStatement,option1,option2,option3,option4,correctAnswer})
        });

        const resdata = await response.json();
        if(resdata.status.code === 200){
          diffToast(resdata.status.message);
          setTimeout(function(){ history.push('/createQuestion'); }, 3000);
        } else {
          errormgs(resdata.status.message);
        }
  }

  return (
    <>
      <form className="form-control" onSubmit={submitQuestionForm}>
        <div className="create-ques-heading">
          <div id="test-heading">Test Code :&nbsp;&nbsp;

          <TextField
                  className="ques-options"
                  type="text"
                  onChange={ChangeInputField}
                  value={data.testCode}
                  id="quesOptionA"
                  name="testCode"
                  placeholder="Enter Code"
          />
          </div>

          <div className="ques-input">
            
            <div className="ques-statement">
              <label htmlFor="qname">
                Question : {data.quesNumber}
                <div />
                &nbsp;
                <textarea
                  className="text-area-input"
                  type="text"
                  onChange={ChangeInputField}
                  value={data.qStatement}
                  id="quesStatement"
                  name="qStatement"
                  placeholder="Question description.."
                />
              </label>
            </div>
            
            <div className="ques-option">
              <label htmlFor="qname">Options :</label>
              <br />
              <br />
              <div>
                A &nbsp;&nbsp;
                <TextField
                  className="ques-options"
                  type="text"
                  onChange={ChangeInputField}
                  value={data.option1}
                  id="quesOptionA"
                  name="option1"
                  placeholder="Option A.."
                />
              </div>
              <div>
                B &nbsp;&nbsp;
                <TextField
                  className="ques-options"
                  type="text"
                  onChange={ChangeInputField}
                  value={data.option2}
                  id="quesOptionB"
                  name="option2"
                  placeholder="Option B.."
                />
              </div>
              <div>
                C &nbsp;&nbsp;
                <TextField
                  className="ques-options"
                  type="text"
                  onChange={ChangeInputField}
                  value={data.option3}
                  id="quesOptionC"
                  name="option3"
                  placeholder="Option C.."
                />
              </div>
              <div>
                D &nbsp;&nbsp;
                <TextField
                  className="ques-options"
                  type="text"
                  onChange={ChangeInputField}
                  value={data.option4}
                  id="quesOptionD"
                  name="option4"
                  placeholder="Option D.."
                />
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="correct-answer">
              <label>Correct Answer :</label>
              <div />
              &nbsp;
              <select id="correctAns" name="correctAnswer" value = {data.correctAnswer} onChange={ChangeInputField} >
                <option value="--Select Correct Answer">
                  --Select Correct Answer--
                </option>
                <option  value={data.option1}>
                  {data.option1}
                </option>
                <option  value={data.option2}>
                  {data.option2}
                </option>
                <option  value={data.option3}>
                  {data.option3}
                </option>
                <option  value={data.option4}>
                  {data.option4}
                </option>
              </select>
            </div>
            
            
          </div>

          <div className="submit-button">
            <button type="submit" id="add-ques"onClick={AddMoreQues} >
              Add More Question
            </button>
            <button type="submit" id="submit-button" >
              Done
            </button>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
};

export default CreateTest;