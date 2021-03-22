import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import {
  Typography,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  IconButton,
  withStyles,
  Snackbar,
} from '@material-ui/core';
import Participent from './Participent';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getAuction, postBid } from '../../redux/actions/auctionActions';
import PropTypes from 'prop-types';
import { ScaleLoader } from 'react-spinners';
import moment from 'moment';
import { CLEAR_ERRORS, CLEAR_AUCTION, CLEAR_MESSAGE } from '../../redux/types';
import store from '../../redux/store';
import { toast, ToastContainer } from 'react-toastify';

const styles = (theme) => ({
  root: {},
  paperStyle: {
    borderRadius: 10,
    border: '2px solid #ed5a05',
    padding: theme.spacing(4),
  },
  paperStyleHighestBid: {
    borderRadius: 25,
    backgroundColor: '#e3e3e3',

    paddingInline: '40px',
  },
  container: {
    paddingTop: theme.spacing(1),
  },
  GridContainerHighestBid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  GridItemBidTime: {
    padding: theme.spacing(2),
    backgroundColor: '#1a6331',
    borderRadius: 15,
    color: '#fff',
    margin: '5px',
  },
  GridPlaceBid: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  formButton: {
    height: '60px',
    fontSize: '20px',
    backgroundColor: '#1c2237',
    color: '#FFF',
    borderRadius: '40px',
    border: '2px solid #fff',
    '&:hover': {
      backgroundColor: '#1c2237',
      color: '#fff',
      border: '2px solid #f00946',
    },
  },
  formGridButton: {},
});

const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
        `;

class Bid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxBid: 0,
    };
    this.increaseBidAmount = this.increaseBidAmount.bind(this);
    this.decreasBidAmount = this.decreasBidAmount.bind(this);
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ alert: false, alertType: 'error' });
  };
  increaseBidAmount = () => {
    this.setState({
      maxBid: parseFloat(this.state.maxBid - -0.01).toFixed(2),
    });
  };
  decreasBidAmount = () => {
    this.setState({
      maxBid: parseFloat(this.state.maxBid - 0.01).toFixed(2),
    });
  };

  placeBid = () => {
    if (this.props.authenticated) {
      const bidData = {
        bidAmount: this.state.maxBid,
      };
      this.props.postBid(bidData, this.props.match.params.auctionId);
    } else {
      store.dispatch({ type: CLEAR_ERRORS });

      this.props.history.push('/UserAuth');
    }
  };
  componentWillUnmount() {
    store.dispatch({ type: CLEAR_AUCTION });
  }
  componentDidMount() {
    this.props.getAuction(this.props.match.params.auctionId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.maxBid === 0 && nextProps.auction.auction.maxBid)
      this.setState({
        maxBid: parseFloat(nextProps.auction.auction.maxBid).toFixed(2),
      });
    if (nextProps.UI.errors) {
      toast.error(nextProps.UI.errors.error);
      store.dispatch({ type: CLEAR_ERRORS });
    }
    if (nextProps.UI.message) {
      toast.success(nextProps.UI.message.message);
      store.dispatch({ type: CLEAR_MESSAGE });
    }
  }

  render() {
    const { classes } = this.props;
    const { auction, loading } = this.props.auction;
    let bidToAuction = auction.bidsData ? (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {auction.bidsData.map((bidData) => (
              <Participent key={bidData.bidId} bidData={bidData} />
            ))}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Paper className={classes.paperStyle} elevation={4}>
              <Grid
                container
                item
                justify="center"
                alignItems="center"
                className={classes.container}
              >
                <Typography variant="h5" align="center">
                  Base Price ${auction.initAmount}
                </Typography>
              </Grid>
              <Grid
                className={classes.GridContainerHighestBid}
                item
                container
                justify="center"
                alignItems="center"
              >
                <Paper elevation={0} className={classes.paperStyleHighestBid}>
                  <Grid
                    container
                    justify="space-evenly"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid itemScope>
                      <Typography variant="h4">${auction.maxBid}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">Highest bid</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item container justify="center" alignItems="center">
                <Typography variant="h6" align="center">
                  Domain Type : {auction.auctionType}
                </Typography>
              </Grid>

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">Remaining time</Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item className={classes.GridItemBidTime}>
                    <Typography variant="h4">10h</Typography>
                  </Grid>
                  <Grid item className={classes.GridItemBidTime}>
                    <Typography variant="h4">20m</Typography>
                  </Grid>
                  <Grid item className={classes.GridItemBidTime}>
                    <Typography variant="h4">49s</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    Auction due on{' '}
                    {moment
                      .unix(auction.createdAt._seconds)
                      .format('MM/DD/YYYY h:mm:ss A')}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.GridPlaceBid}
              >
                <Grid item>
                  <IconButton onClick={this.decreasBidAmount}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h3">${this.state.maxBid}</Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={this.increaseBidAmount}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid item className={classes.formGridButton}>
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  className={classes.formButton}
                  onClick={this.placeBid}
                >
                  Participate in auctions
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </>
    ) : (
      <ScaleLoader
        css={override}
        size={150}
        color={'#eb4034'}
        loading={loading}
      />
    );

    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <ToastContainer />
          <Typography variant="h4" align="center">
            Auction information
          </Typography>

          {bidToAuction}
        </Container>
      </>
    );
  }
}
Bid.propType = {
  classes: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  auction: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
const mapStateProps = (state) => ({
  auction: state.auction,
  authenticated: state.user.authenticated,
  UI: state.UI,
});
const mapActionsToProps = {
  getAuction,
  postBid,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(Bid));
