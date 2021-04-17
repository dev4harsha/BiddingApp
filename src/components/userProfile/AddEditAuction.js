import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { SET_USER_MENU_INDEX } from '../../redux/types';
import store from '../../redux/store';
import moment from 'moment';
import {
  addNewAuction,
  updateAuctionDetails,
} from '../../redux/actions/auctionActions';
import { Button, CircularProgress } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { CLEAR_ERRORS, CLEAR_MESSAGE } from '../../redux/types';
import SnackBar from '../SnackBar';
import { toast, ToastContainer } from 'react-toastify';

const style = (theme) => ({
  ...theme.spreadThis,
  textField: {
    marginTop: theme.spacing(1),
  },
});
class AddEditAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctionName: '',
      auctionType: '',
      endDateTime: moment(),
      initAmount: '',
      itemDescription: '',
      buyNowAmount: '',
      open: this.props.open,
      errors: {},
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.close();
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleChangeEndDateTime = (value) => {
    this.setState({ endDateTime: value });
  };

  handleSubmit = () => {
    const newAuctionDetails = {
      auctionName: this.state.auctionName,
      auctionType: this.state.auctionType,
      endDateTime: this.state.endDateTime,
      initAmount: this.state.initAmount,
      itemDescription: this.state.itemDescription,
      buyNowAmount: this.state.buyNowAmount,
    };

    this.props.addNewAuction(newAuctionDetails);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (nextProps.UI.messages) {
      this.handleClose();
      //toast.success(nextProps.UI.message.message);
    }
  }
  componentDidMount() {
    if (this.props.userAuction) {
      this.setState({
        auctionName: this.props.userAuction.auctionName,
        auctionType: this.props.userAuction.auctionType,
        endDateTime: moment(
          new Date(
            this.props.userAuction.endDateTime.seconds * 1000
          ).toISOString()
        ),
        initAmount: this.props.userAuction.initAmount,
        itemDescription: this.props.userAuction.itemDescription,
        buyNowAmount: this.props.userAuction.buyNowAmount,
      });
    }
  }
  handleSubmitUpdate = () => {
    const updateAuctionDetails = {
      auctionName: this.state.auctionName,
      auctionType: this.state.auctionType,
      endDateTime: this.state.endDateTime,
      initAmount: this.state.initAmount,
      itemDescription: this.state.itemDescription,
      buyNowAmount: this.state.buyNowAmount,
      auctionId: this.props.userAuction.id,
    };
    console.log(updateAuctionDetails);
    this.props.updateAuctionDetails(updateAuctionDetails);
  };
  render() {
    const { classes, edit } = this.props;
    const { errors } = this.state;

    return (
      <>
        <ToastContainer />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick={true}
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Add item to auction</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              margin="dense"
              name="auctionName"
              label="Auction Name"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.auctionName}
              helperText={errors.auctionName}
              error={errors.auctionName ? true : false}
            />
            <TextField
              variant="outlined"
              margin="dense"
              name="itemDescription"
              label="Description"
              type="text"
              multiline={true}
              fullWidth
              rows={3}
              onChange={this.handleChange}
              value={this.state.itemDescription}
              helperText={errors.itemDescription}
              error={errors.itemDescription ? true : false}
            />
            <TextField
              variant="outlined"
              margin="dense"
              label="Auction Type"
              name="auctionType"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.auctionType}
              helperText={errors.auctionType}
              error={errors.auctionType ? true : false}
            />
            <TextField
              variant="outlined"
              margin="dense"
              name="initAmount"
              label="Base Price"
              type="number"
              fullWidth
              onChange={this.handleChange}
              value={this.state.initAmount}
              helperText={errors.initAmount}
              error={errors.initAmount ? true : false}
            />
            <TextField
              variant="outlined"
              margin="dense"
              name="buyNowAmount"
              label="Buy Now Price"
              type="number"
              pattern="[0-9]+(\\.[0-9][0-9]?)?"
              fullWidth
              onChange={this.handleChange}
              value={this.state.buyNowAmount}
              helperText={errors.buyNowAmount}
              error={errors.buyNowAmount ? true : false}
            />
            <DateTimePicker
              inputVariant="outlined"
              label="Auction end date/time "
              className={classes.textField}
              value={this.state.endDateTime}
              //value="2021-03-31T1:25:00"
              format="MM/DD/yyyy hh:mm A"
              onChange={this.handleChangeEndDateTime}
              fullWidth
              //ampm={false}
              helperText={errors.endDateTime}
              error={errors.endDateTime ? true : false}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {edit ? (
              <Button onClick={this.handleSubmitUpdate} color="primary">
                Update Auction
              </Button>
            ) : (
              <Button onClick={this.handleSubmit} color="primary">
                Add Auction
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
});
AddEditAuction.propTypes = {
  addNewAuction: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  addNewAuction,
  updateAuctionDetails,
})(withStyles(style)(AddEditAuction));
