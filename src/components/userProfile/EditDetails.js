import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
import { Button, CircularProgress } from '@material-ui/core';
import { SET_USER_MENU_INDEX } from '../../redux/types';
import store from '../../redux/store';
const style = (theme) => ({
  ...theme.spreadThis,
});
class EditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      firstName: '',
      lastName: '',
      mobile: '',
      open: true,
    };
  }

  handleClose = () => {
    this.props.close();
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  handleSubmit = () => {
    const userDetails = {
      country: this.state.country,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobile: this.state.mobile,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }
  mapUserDetailsToState = (user) => {
    this.setState({
      country: user.country ? user.country : '',
      firstName: user.firstName ? user.firstName : '',
      lastName: user.lastName ? user.lastName : '',
      mobile: user.mobile ? user.mobile : '',
    });
  };
  render() {
    const {
      classes,
      user: { isLoaded },
    } = this.props;
    return (
      <>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Edit your Details</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              margin="dense"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.firstName}
            />
            <TextField
              variant="outlined"
              margin="dense"
              label="Last Name"
              name="lastName"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.lastName}
            />
            <TextField
              variant="outlined"
              margin="dense"
              name="mobile"
              label="Mobile number"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.mobile}
            />
            <TextField
              variant="outlined"
              margin="dense"
              name="country"
              label="Country"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.country}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.firebase.profile,
});
EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { editUserDetails })(
  withStyles(style)(EditDetails)
);
