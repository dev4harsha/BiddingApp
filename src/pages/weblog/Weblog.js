import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import PostThum from './PostThum';


const useStyles = makeStyles((theme) => ({
    root: {
        
      },
    container: {
        paddingTop: theme.spacing(3)
    }

}));

function Weblog() {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" gutterBottom align='center'>
                    Blog post
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
                    <Grid item xs={12} sm={6} md={4}>
                        <PostThum/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <PostThum/>
                    </Grid>
                    
                </Grid>
               
            </Container>
        </>

    )
}

export default Weblog
