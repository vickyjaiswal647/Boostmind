import ReactVideo from 'react-player'
import './tutorialpage.css'
import React from "react";

const Content = () => {
    const path = localStorage.getItem('path')
    return (
        <div className = "content">
            <h1>Video Tutorial</h1>
            <ReactVideo controls url={require(`../../../../uploads/${path}`).default} width = {800} height = {500}/>
        </div>
    )
}

export default Content;