import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {  Button,  Divider, Grid,Typography ,Hidden, Box} from '@material-ui/core';
import { People } from '@material-ui/icons';
import TimerIcon from '@material-ui/icons/Timer';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Redirect } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
       
        border: `1px solid ${theme.palette.divider}`,
        borderRadius:'25px',
        height:'70px',
        marginBottom: theme.spacing(1),
        backgroundColor:'#fff',
        boxShadow:'0px 0px 20px #8888883b'
    },
    container:{
        paddingTop: theme.spacing(3)
    },
    formButton:{
        margin: '8px',
        height:'30px',
        fontSize:'15px',
        border: '1px solid #fff',
        borderRadius:'25px',
        backgroundColor:'#1c2237',
        '&:hover': {
            backgroundColor:'#1c2237',
            color: '#FFF',
            border: '1px solid #f00946'
        }
    },
    deviderStyl:{
        height:'65%',
    },
    typoIcon:{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    icons:{
        marginRight: '5px',
    }
    

  }));

function AuctionCommon() {
    const classes = useStyles();
    const [viwePost, setViewBid] = useState(true);

    if(!viwePost){
        return <Redirect to="/bid"/>
    }
    
    
      
    return (
        
        
        
            <Grid  className={classes.root}  container  justify="space-evenly" alignItems="center" > 
              
                <Grid>
                <Typography variant="h5"  align='center'>
                    Sam.au.com
                </Typography>
                </Grid>  
                <Divider orientation="vertical" className={classes.deviderStyl} />
                
                    <Grid>
                    <Typography variant="h6"  align='center'className={classes.typoIcon}>
                        <LocalOfferIcon className={classes.icons}/>50$
                    </Typography>
                    </Grid> 
                    <Divider orientation="vertical" className={classes.deviderStyl} />
                    
                    <Hidden smDown> 
                    <Grid>
                    <Typography variant="h6"  align='center' className={classes.typoIcon}>
                    <People className={classes.icons}/>82
                    </Typography>
                    </Grid> 
                    <Divider orientation="vertical" className={classes.deviderStyl} />
                    </Hidden>

                    <Hidden xsDown>  
                    <Grid>
                    <Typography variant="h6"  align='center' className={classes.typoIcon}>
                        <TimerIcon className={classes.icons}/>5h:20m:56s
                    </Typography>
                    </Grid>
                    <Divider orientation="vertical" className={classes.deviderStyl} />
                    </Hidden>
                    
                    
                
                <Grid>
                <Button  className={classes.formButton} variant="contained" color="primary" onClick={()=> setViewBid(false)}>
                            Bid now 
                </Button>
                </Grid>
                
            </Grid>
            
     
    )
}

export default AuctionCommon;
