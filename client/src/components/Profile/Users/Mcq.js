import { FormControlLabel, FormLabel, RadioGroup } from '@material-ui/core'
import React, {useState, useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import './mcq.css';
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Mcq = () => {

    const history = useHistory()
    const [answer, setAnswer] = useState([]);
    const [enable, setEnable] = useState(null);

    const [question, setQuestion] = useState([{
        _id:'',qStatement:'',option1:'',option2:'',option3:'',option4:''
    }])

    const diffToast = (message) => {
        toast.error(message,{
            position:"top-right",autoClose: 3000
        })
    }
    
    const getQuestion = async() => {
        const response = await fetch('/users/student/attempt-test',{
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
        });
        const data = await response.json();
        if(data.status.code === 200){
            setQuestion(data.info);
            setEnable(true);
        } else {
            setEnable(false);
            diffToast("You have already attempted this test")
            setTimeout(function(){ history.push('/profilePage'); }, 3000);
        }
    }

    useEffect(()=>{
        getQuestion();
    },[])

    const handleRadioChange = (e) => {
        var objIndex = answer.findIndex((obj => obj.id === e.target.name));
        if(objIndex !== -1){
            answer[objIndex].ans = e.target.value;
        } else {
        setAnswer(prevalue => [...prevalue,{
            id:e.target.name,
            ans:e.target.value
        }]);}
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const lenght = question.length
        const answers = answer;
        const response = await fetch('/users/student/submit-test',{
            method:"POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({answers,lenght})
        });
        const data = await response.json();
        if(data.status.code === 200){
        localStorage.setItem('score',data.status.message);
        }
        history.push('/score');

    }

    return (
        <>
            <form className = 'mcq' onSubmit = {handleSubmit}>
                
                {question.map((data) => { 
                    return(
                        <div key={data._id} className = "idq">
                            <FormControl component = "fieldset">
                                <FormLabel className = "question"><p>{data.qStatement}</p></FormLabel>
                                <RadioGroup aria-label="quiz" name={data._id} value={answer._id} onChange={handleRadioChange} className = "radio">
                                    <FormControlLabel value = {data.option1} control = {<Radio/>} label = {data.option1}/>
                                    <FormControlLabel value = {data.option2} control = {<Radio/>} label = {data.option2}/>
                                    <FormControlLabel value = {data.option3} control = {<Radio/>} label = {data.option3}/>
                                    <FormControlLabel value = {data.option4} control = {<Radio/>} label = {data.option4}/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    ) 
                })}
                <div className = 'btn'>
                    <Button type='submit' variant='contained' color = 'primary' size = 'large' disabled = {!enable}>Submit Answer</Button>
                </div>
            </form>
            <ToastContainer/>
        </>
    )
}

export default Mcq
