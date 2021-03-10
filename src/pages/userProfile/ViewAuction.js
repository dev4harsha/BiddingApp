import React from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import moment from 'moment';
import {
  IconButton,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TableContainer,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Edit, Delete } from '@material-ui/icons';
import DomainDialog from './DomainDialog';
import { Component } from 'react';

const styles = (theme) => ({
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
    padding: '6px',
  },
});

const override = `
        display: flex;
        align-items: center;
        justify-content: center;
        border-color: red;
    `;

class ViewAction extends Component {
  state = {
    domains: null,
  };

  componentDidMount() {
    axios
      .get('/domains')
      .then((res) => {
        console.log(res.data);
        this.setState({
          domains: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }
  render() {
    const { classes } = this.props;
    let recentDomainsMarkup = this.state.domains ? (
      this.state.domains.map((cust) => (
        <TableRow key={cust.id}>
          <TableCell className={classes.cell}>
            <Typography variant="body1">{cust.domainname}</Typography>
          </TableCell>
          <TableCell className={classes.cell}>
            <Typography variant="body1">{cust.domaintype}</Typography>
          </TableCell>
          <TableCell className={classes.cell}>
            <Typography variant="body1">{cust.age}</Typography>
          </TableCell>
          <TableCell className={classes.cell}>
            <Typography variant="body1">{cust.registrar}</Typography>
          </TableCell>
          <TableCell className={classes.cell}>
            <Typography variant="body1">
              {moment(cust.expires).format('MMMM Do YYYY')}
            </Typography>
          </TableCell>
          <TableCell className={classes.cell}>
            <Typography variant="body1">{cust.bidamount}</Typography>
          </TableCell>
          <TableCell className={classes.cell}>
            <Typography variant="body1">
              {moment(cust.endDateTime).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
          </TableCell>
          <TableCell className={classes.cell}>
            <IconButton
              onClick={() => getOneDomain(cust.id)}
              color="primary"
              aria-label="update domain"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => deleteHandler(cust.id)}
              color="secondary"
              aria-label="delete domain"
            >
              <Delete />
            </IconButton>
            <IconButton
              // onClick={handleAdd}
              color="secondary"
              aria-label="delete domain"
            >
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={8}>
          <ScaleLoader
            css={override}
            size={150}
            color={'#eb4034'}
            loading={this.loading}
          />
        </TableCell>
      </TableRow>
    );
    return (
      <Container>
        <ToastContainer />
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell className={classes.head}>
                  <Typography variant="subtitle1">Type</Typography>
                </TableCell>
                <TableCell className={classes.head}>
                  <Typography variant="subtitle1">Age</Typography>
                </TableCell>
                <TableCell className={classes.head}>
                  <Typography variant="subtitle1">Registrar</Typography>
                </TableCell>
                <TableCell className={classes.head}>
                  <Typography variant="subtitle1">Expires</Typography>
                </TableCell>
                <TableCell className={classes.head}>
                  <Typography variant="subtitle1">Amount</Typography>
                </TableCell>
                <TableCell className={classes.head}>
                  <Typography variant="subtitle1">End Date</Typography>
                </TableCell>
                <TableCell className={classes.head}>
                  <Typography variant="subtitle1">Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{recentDomainsMarkup}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default withStyles(styles)(ViewAction);
