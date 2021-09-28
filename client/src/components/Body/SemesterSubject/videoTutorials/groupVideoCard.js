import React from 'react'
import './groupVideoCard.css'
import VideoCard from './videoCard'
import { useHistory } from 'react-router-dom';

const GroupVideoCard = () => {

    const history = useHistory();
    const [value, setValue] = React.useState([{
        _id:'',displayName:'',viedo:''
    }])

    React.useEffect(() => {
        setValue(JSON.parse(localStorage.getItem('data1')));
    },[])

    const clickHandler = (e,id) => {
        e.preventDefault();
        localStorage.setItem('path',id.viedo);
        history.push('/tutorialPage')
    }

    return (
        <div className = "tutorialVideo">
            <h1>List of Tutorials</h1>
            <div className = "listOfVideo">
                {value.map((data) => {
                    return(
                        <div key = {data._id} onClick={(e) => clickHandler(e,data)} >
                            <VideoCard image = "https://image.freepik.com/free-vector/online-courses-tutorials_23-2148529955.jpg" title = {data.displayName}/>
                        </div>
                )})}
            </div>
        </div>
    )
}

export default GroupVideoCard;
