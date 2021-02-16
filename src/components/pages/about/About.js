import React from 'react'
import { Container, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Feedbacks from '../home/Feedbacks';


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
function About() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg"  className={classes.container}>

            <Typography variant="h4" gutterBottom align='center'>
                About Us
            </Typography>
            <Paper className={classes.paper}>
                <Typography variant="body1" align='justify'>
                Samsys is a Technology Solutions company, providing services for small to mid-sized organisations across Australia and Asia Pacific.  Our aim is to get you away from the stress of IT management altogether and simply focus on you do best; your business.  Our wide range of products and services include the following:
        <br/>
        <br/>
+  Cyber Security Solutions<br/>
​+  Cloud and Hyperconverged Packages<br/>
​+  Disaster Recovery and Backup Solutions<br/>
+  IT Support Teams<br/>
​+  Managed Network Services<br/>
+  Documentation and Credentials Management<br/>
+  Desktop Software Developing<br/>
+  Mobile Application Development<br/>
+  Hardware Procurement<br/>
+  Reselling of IT Software & Hardware<br/><br/>
Samsys Group is a Cisco, Citrix, Sophos, Fortinet, VMWare and Microsoft-focused company providing IT professional and managed services and solutions throughout Asia Pacific.  We help our customers across all industries, leveraging productivity and collaboration technologies to grow their businesses, increasing their efficiency and performance and fundamentally reducing overall day-to-day costs.  We aim to provide IT services of the highest standards to businesses across all industries.  Our team of experienced Australian based engineers ensures you will receive a first class service from people that are proficient, friendly and flexible.
                </Typography>
            </Paper>
            <Typography className={classes.container} variant='h4' align='center'> 
Customer Feedbacks
            </Typography>
            <Feedbacks/>
        </Container>
        
    )
}

export default About
