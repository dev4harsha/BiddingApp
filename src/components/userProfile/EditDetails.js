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
      open: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
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
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  mapUserDetailsToState = (credentials) => {
    this.setState({
      country: credentials.country ? credentials.country : '',
      firstName: credentials.firstName ? credentials.firstName : '',
      lastName: credentials.lastName ? credentials.lastName : '',
      mobile: credentials.mobile ? credentials.mobile : '',
    });
  };
  render() {
    const {
      classes,
      user: { loading },
    } = this.props;
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={this.handleOpen}
          disabled={loading}
        >
          {loading ? <CircularProgress size={25} /> : `Edit Details`}
        </Button>
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
  credentials: state.user.credentials,
  user: state.user,
});
EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { editUserDetails })(
  withStyles(style)(EditDetails)
);
