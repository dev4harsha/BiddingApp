import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const DomainDialog = (props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={props.open}
      onClose={props.close}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle>{props.formmode ? 'Add New' : 'Update'} Domains</DialogTitle>
      <ValidatorForm onSubmit={props.addDomain}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Domain Name"
                onChange={props.changeDomainname}
                name="domainname"
                value={props.domainname}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Domain Type"
                onChange={props.changeDomaintype}
                name="domaintype"
                value={props.domaintype}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Age"
                onChange={props.changeAge}
                name="Age"
                value={props.age}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Registrar"
                onChange={props.changeRegistrar}
                name="registrar"
                value={props.registrar}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  fullWidth
                  margin="normal"
                  id="date-picker-dialog"
                  label="Expires"
                  format="MM/dd/yyyy"
                  value={props.expires}
                  onChange={props.changeExpires}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Bid Amount"
                onChange={props.changeBidamount}
                name="bidamount"
                value={props.bidamount}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  fullWidth
                  margin="normal"
                  id="date-picker-dialog"
                  label="Auction end date"
                  format="MM/dd/yyyy"
                  value={props.endDateTime}
                  onChange={props.changeEndDateTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardTimePicker
                  fullWidth
                  margin="normal"
                  id="time-picker"
                  label="Auction end time"
                  value={props.endDateTime}
                  onChange={props.changeEndDateTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="secondary">
            {props.formmode ? 'Add' : 'Update'}
          </Button>
          <Button onClick={props.close} color="primary">
            Close
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default DomainDialog;
