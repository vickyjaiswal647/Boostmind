import Button from '@material-ui/core/Button';
import React from 'react'
import './score.css'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop:theme.spacing(1),
        alignItems:'center',
        height: theme.spacing(7),
        borderRadius:'px',
        width:'30%'
    }
}));

const Score = () => {

    const classes = useStyles();

    return (
        <div className = 'score'>
            <h1>{localStorage.getItem('score')}</h1>
                <Link to = "/cseSem1Sub" style = {{textDecoration:'none'}}>
                    <div className = 'btn'>
                        <Button type="submit" className = {classes.button} variant="contained" color="primary" disableElevation>Go To Course </Button>
                    </div>
                </Link>
        </div>
    )
}

export default Score
