import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';

import GoogleMapsContainer from './GoogleMapsContainer';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
          }
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center', 
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
    container:{
        paddingTop: theme.spacing(3)
    }
    

  }));

function Contact() {
    const classes = useStyles();
    return (
        
        <Container maxWidth="lg"  className={classes.container}>
            
            <Typography variant="h4" gutterBottom align='center'>
                Contact Us
            </Typography>
            <Grid container spacing={3}>
                
                <Grid item xs ={12} sm={12} md={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom align='center'>
                    Get in touch with us
                    </Typography>
                    
                    <form className={classes.root} noValidate autoComplete="on">
                        
                        <TextField fullWidth id="name" label="Name and surename" variant="outlined" />
                        <TextField fullWidth id="mobile" label="Mobile number" variant="outlined" />
                        <TextField fullWidth id="email" label="Email" variant="outlined" />
                        <TextField fullWidth  id="message" label="Message" variant="outlined" />
                        <Button fullWidth className={classes.formButton} variant="contained" color="primary">
                            Submit 
                        </Button>
                    </form>
                </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} alignItems='center'>
                <Paper className={classes.paper}>
                   
                    
                        <Grid>
                            <Typography variant="h5" gutterBottom align='center'>
                            Contact Us
                            </Typography>
                            <Typography variant="body1" gutterBottom align='left'>
                                <MdLocationOn/> Queen Victoria Building NSW 1230
                            </Typography>
                            <Typography variant="body1" gutterBottom align='left'>
                                <MdPhone/> 1300 438 968
                            </Typography>
                            <Typography variant="body1" gutterBottom align='left'>
                                <MdEmail/> Support@SamsysGroup.com.au
                            </Typography>
                        </Grid>
                        <Grid sp={12}  style={{position: 'relative', height: '275px'}}>
                        <GoogleMapsContainer/> 
                        </Grid>
                    
                    
                         
                    
                </Paper>
                </Grid>
                
            </Grid>
        
      </Container>
    )
}

export default Contact
