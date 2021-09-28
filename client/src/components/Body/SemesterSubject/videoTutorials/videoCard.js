import React from 'react'
import './videoCard.css'

const VideoCard = ({image,title}) => {
    return (
        <div className = "videoCard">
            <img className = "videoCard__thumbnail" src = {image} alt = ""/>
            <h4 className = 'videoCard__info'>{title}</h4>
        </div>
    )
}

export default VideoCard
