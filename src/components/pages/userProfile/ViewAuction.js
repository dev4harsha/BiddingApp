import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import moment from 'moment';
import { IconButton, Container, Grid, Typography, TextField, Paper, InputLabel, OutlinedInput, InputAdornment, TableContainer, Button, TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Edit, Delete } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getDomains, addDomain } from '../../../data/domainsData';
import DomainDialog from './DomainDialog';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            padding: theme.spacing(1),
        }
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
        padding: '4px',

    },
    button: {
        margin: theme.spacing(1),
        flex: 'right',

    },
    cell: {
        padding: '6px'
    }
}));

function AddToAuction() {
    const classes = useStyles();
    const [domains, setDomains] = useState([]);
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [domId, setDomId] = useState('');

    const [domainname, setDomainname] = useState('');
    const [domaintype, setDomaintype] = useState('');
    const [age, setAge] = useState('');
    const [registrar, setRegistrar] = useState('');
    const [expires, setExpires] = useState('');
    const [bidamount, setBidamount] = useState('');
    const [endDateTime, setEndDateTime] = useState(new Date('2014-08-18T21:11:54'));
    const [loading, setLoading] = useState(false);

    const handleDomainname = (event) => {
        setDomainname(event.target.value)
    }
    const handleDomaintype = (event) => {
        setDomaintype(event.target.value)
    }
    const handleAge = (event) => {
        setAge(event.target.value)
    }
    const handleRegistrar = (event) => {
        setRegistrar(event.target.value)
    }
    const handleExpires = (event) => {
        setExpires(event.target.value)
    }
    const handleBidamount = (event) => {
        setBidamount(event.target.value)
    }
    const handleEndDateTime = (date) => {
        setEndDateTime(date)
    }


    const getlist = async () => {
        try {
            setLoading(true);
            const list = await getDomains();
            setDomains(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;

    const handleClose = () => {
        setOpen(false);
    }
    const handleAdd = () => {

        setOpen(true);
        setFormMode(true);
    }

    const getOneDomain = (id) => {

    }

    const deleteHandler = (id) => {

    }

    const addDomainHandler = async () => {
        try {
            const domain = {
                domainname, registrar, domaintype, age, bidamount, endDateTime, expires
            }
            if (formMode) {
                await addDomain(domain);
                toast.success('Domain Added Successfully');
                getlist();
                setOpen(false);
                setDomainname('');
                setDomaintype('');
                setRegistrar('');
                setAge('');
                setBidamount('');
                setEndDateTime(new Date('2014-08-18T21:11:54'));
                setExpires('');

            } else {
                // await updateCustomer(custId, customer);
                // toast.success('Customer Updated Successfully');
                // getlist();
                // setOpen(false);
                // setFirstName('');
                // setLastName('');
                // setPhoneNumber('');
                // setPostCode('');
                // setCity('');
                // setMaritalStatus('Single');
                // setGender('Female'); 
            }
        } catch (error) {
            toast.error(error.message);
        }
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
                            <TableCell className={classes.head}><Typography variant='subtitle1'>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {domains.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8}>
                                    <ScaleLoader
                                        css={override}
                                        size={150}
                                        color={"#eb4034"}
                                        loading={loading} />
                                </TableCell>
                            </TableRow>
                        ) : (
                                <>
                                    <TableRow>

                                    </TableRow>
                                    {domains.map((cust) => (
                                        <TableRow key={cust.id}>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.domainname}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.domaintype}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.age}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.registrar}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.expires}</Typography></TableCell>
                                            <TableCell className={classes.cell}><Typography variant='body1'>{cust.bidamount}</Typography></TableCell>
                                            <TableCell className={classes.cell}>
                                                <Typography variant='body1'>
                                                    {moment(cust.endDateTime).format('MMMM Do YYYY, h:mm:ss a')}

                                                </Typography></TableCell>
                                            <TableCell className={classes.cell}>
                                                <IconButton onClick={() => getOneDomain(cust.id)} color="primary" aria-label="update domain">
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete domain">
                                                    <Delete />
                                                </IconButton>
                                                <IconButton onClick={handleAdd} color="secondary" aria-label="delete domain">
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

            <DomainDialog
                open={open}
                close={handleClose}
                formmode={formMode}
                domainname={domainname}
                domaintype={domaintype}
                age={age}
                registrar={registrar}
                expires={expires}
                bidamount={bidamount}
                endDateTime={endDateTime}

                changeDomainname={handleDomainname}
                changeDomaintype={handleDomaintype}
                changeAge={handleAge}
                changeRegistrar={handleRegistrar}
                changeExpires={handleExpires}
                changeBidamount={handleBidamount}
                changeEndDateTime={handleEndDateTime}
                addDomain={addDomainHandler}
            />
        </Container>


    );
}



export default AddToAuction;
