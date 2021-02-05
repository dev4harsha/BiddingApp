import React from 'react'
import { Container, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },paper: {
        padding: theme.spacing(2),
        textAlign: 'center', 
      },
    container:{
        paddingTop: theme.spacing(3)
    }
  }));
function Terms() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg"  className={classes.container}>

            <Typography variant="h4" gutterBottom align='center'>
                Terms and Conditions
            </Typography>
            <Paper className={classes.paper}>
                <Typography variant="body1" align='justify'>
                
                <Typography variant="h6">1- The rules and regulations of the website</Typography>
                Dear users of the "Nam" (nam.ir) website, please read the rules carefully and be diligent in observing them. Note that the "Nam" website is available with two addresses, nam.ir and naam.ir, and no other address belongs to this collection.
                </Typography>

                <Typography variant="body1" align='justify'>
                <Typography variant="h6">2- Introduction</Typography>
                    The "Nam" website is subject to the laws of the Islamic Republic of Iran and users are required to comply with all the contents of the list of instances of criminal content (subject to Article 21 of the Computer Crimes Law). All domains in the auction belong to the users and the "Name" site does not own any domain. Therefore, any problem or abuse will be reported to the advertiser
                </Typography>
            </Paper>
           
        </Container>
        
    )
}

export default Terms
