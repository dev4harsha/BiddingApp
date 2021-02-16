import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { Typography, Container, Grid, Paper } from '@material-ui/core';
import AuctionCommon from '../auction/AuctionCommon';
import PostThum from '../weblog/PostThum';
import Feedbacks from './Feedbacks';


const useStyles = makeStyles((theme) => ({
    root: {
       
    },container: {
        paddingTop: theme.spacing(3)
    },
  }));

function Home() {
    const classes = useStyles();
    return (
        <>
        <Container maxWidth="lg"  className={classes.container} >
            
            <Grid item >
                <Typography variant="h4" gutterBottom align='center'>
                    The latest auctions
                </Typography>
                <AuctionCommon/>
                <AuctionCommon/>
                <AuctionCommon/>
                <AuctionCommon/>
                <AuctionCommon/>
            </Grid>
            <Grid item className={classes.container}>
                <Typography variant="h4" gutterBottom align='center'>
                   Happy Customers
                </Typography>
              <Feedbacks/>
            </Grid>
            <Grid item className={classes.container}>
                <Typography variant="h4" gutterBottom align='center'>
                    Latest Blog post
                </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <PostThum/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <PostThum/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <PostThum/>
                        </Grid>
                    
                        
                    </Grid>
            </Grid>
            

           
            
               
            
        </Container>
        
        </>
        
    )
}

export default Home
