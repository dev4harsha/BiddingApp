import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {

    },
   
    
  }));

function Faq() {
    const classes = useStyles();
    return (
        
        <Container maxWidth="lg" className={classes.root}>
            <Typography variant="h4" gutterBottom align='center'>
            Frequently Asked Questions
            </Typography>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography variant="h6">The rules and regulations of the website</Typography>
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
          <Typography variant="h6">The rules and regulations of the website</Typography>
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
          <Typography variant="h6">The rules and regulations of the website</Typography>
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
          <Typography variant="h6">The rules and regulations of the website</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dear users of the website "Nam" (nam.ir), please read the rules well and be diligent in observing them. Note that the "Nam" website is available with two addresses nam.ir and naam.ir and no other address belongs to this collection.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        
      </Container>
    )
}

export default Faq
