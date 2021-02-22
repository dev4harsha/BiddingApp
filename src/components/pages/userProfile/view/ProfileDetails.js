import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HistoryIcon from '@material-ui/icons/History';

import {   Container, Grid,Typography , TextField, Paper} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
          }
    },
    container:{
        paddingTop: theme.spacing(3)
    },
    
    formButton:{
        margin: '8px',
        height:'60px',
        fontSize:'20px',
        backgroundColor:'#1c2237',
        '&:hover': {
            backgroundColor:'#1c2237',
            color: '#FFF',
            border: '3px solid #f00946'
        }
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center', 
      
    },
    

  }));

function ProfileDetails(){
    const classes = useStyles();
    return(
        <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom align='center'>
            auction
            </Typography>
        </Paper>
    );
}



export default ProfileDetails;
