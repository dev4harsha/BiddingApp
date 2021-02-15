import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';

import { IconButton,Container, Grid, Typography, TextField, Paper, InputLabel, OutlinedInput, InputAdornment, TableContainer, Button, TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AddCircle ,Edit, Delete} from '@material-ui/icons';
import { getDomains } from '../../../data/domainsData';


const useStyles = makeStyles((theme) => ({
    root: {

        '& .MuiTextField-root': {
            padding: theme.spacing(1),
        }
    },
    container: {
      

    },

    formButton: {
        margin: '8px',
        height: '60px',
        fontSize: '20px',
        backgroundColor: '#1c2237',
        '&:hover': {
            backgroundColor: '#1c2237',
            color: '#FFF',
            border: '1px solid #f00946'
        },
        //float:'right'
    },
    paper: {
       

    },
    table: {
        minWidth: 300,
    },
    title: {
        flex: '1 1 100%',
        padding: '10px',
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding:'4px',
        
    },
    button: {
        margin: theme.spacing(1),
        flex: 'right',

    },
    cell:{
        padding: '6px'
    }
}));

function AddToAuction() {
    const classes = useStyles();
    const [domains, setDomans] = useState([]);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [loading, setLoading] = useState(false);
    const getlist = async () => {
        try {
            setLoading(true);
            const list = await getDomains();
            setDomans(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleAdd = () => {

    }

    const getOneDomain = (id) =>{

    }

    const deleteHandler = (id) => {

    }
    useEffect(() => {
        getlist();

    }, [])
    return (


        <Container className={classes.container}>

            <ToastContainer />
            <TableContainer component={Paper}>
                
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>Name</Typography></TableCell>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>Type</Typography></TableCell>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>Age</Typography></TableCell>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>Registrar</Typography></TableCell>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>Expires</Typography></TableCell>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>Amount</Typography></TableCell>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>End Date</Typography></TableCell>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>End Time</Typography></TableCell>
                        <TableCell className={classes.head}><Typography variant='subtitle1'>Actions</Typography></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {domains.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9}> 
                                    <ScaleLoader
                                        css={override}
                                        size={150}
                                        color={"#eb4034"}
                                        loading={loading} />
                                </TableCell>
                            </TableRow>
                        ) : (
                                <>
                                    {domains.map((cust) => (
                                        <TableRow key={cust.id}>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.name}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.type}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.age}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.registrar}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.expires}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.amount}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.endDate}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.endTime}</Typography></TableCell>
                                            <TableCell className={classes.cell}>
                                                <IconButton onClick={() => getOneDomain(cust.id)} color="primary" aria-label="update domain">
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete domain">
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>

                            )}

                    </TableBody>
                
                </Table>
            </TableContainer>
            {/* <Grid container justify="space-evenly" alignItems="center">
                     
                        <Grid item>
                            <form className={classes.root} noValidate autoComplete="on">

                                <TextField fullWidth id="name" label="Domain Name" variant="outlined" />
                                <TextField fullWidth id="type" label="Domain Type" variant="outlined" />
                                <TextField fullWidth id="number" label="Age" variant="outlined" />
                                <TextField fullWidth id="registrar" label="Registrar" variant="outlined" />
                                <TextField fullWidth id="expires" label="Expires" variant="outlined" />
                                <TextField fullWidth id="bid" label="Bid Amount($)" variant="outlined" />
                              

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container direction="row" justify="space-around">
                                        <Grid item sm={5}>
                                            <KeyboardDatePicker
                                                fullWidth
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Auction end date"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={5}>
                                            <KeyboardTimePicker
                                                fullWidth
                                                margin="normal"
                                                id="time-picker"
                                                label="Auction end time"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </Grid>


                                    </Grid>
                                </MuiPickersUtilsProvider>
                                
                                <Button fullWidth className={classes.formButton} variant="contained" color="primary">
                                    Add to auction
                                </Button>

                            </form>
                        </Grid>
                    </Grid> */}

        </Container>


    );
}



export default AddToAuction;
