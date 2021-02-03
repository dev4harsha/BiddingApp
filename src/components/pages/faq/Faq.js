import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '24px',
        padding: '24px'
        
    },
    title:{
        color:'#1c2237',
        marginBottom:'10px',
        fontSize: '15px'
    },
    heading: {
      fontSize:'15px' 
    },
  }));

function Faq() {
    const classes = useStyles();
    return (
        
        <div className={classes.root}>
            <div className={classes.title}>
                <h1>Frequently Asked Questions</h1>
            </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
      </div>
    )
}

export default Faq
