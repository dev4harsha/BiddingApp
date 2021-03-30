import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { getUserAuctions } from '../../../redux/actions/auctionActions';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../../../redux/store';
import { CLEAR_ERRORS, CLEAR_MESSAGE } from '../../../redux/types';
import SnackBar from '../../SnackBar';
import ViewAuctionItem from './ViewAuctionItem';

const styles = (theme) => ({});

class ViewAction extends Component {
  state = {};

  componentWillMount() {
    this.props.getUserAuctions();
  }

  render() {
    const { userAuctions } = this.props.auction;

    let recentDomainsMarkup = userAuctions
      ? userAuctions.map((userAucton, index) => (
          <ViewAuctionItem
            userAucton={userAucton}
            key={userAucton.auctionId}
            index={index}
          />
        ))
      : null;

    return <>{recentDomainsMarkup}</>;
  }
}

ViewAction.propType = {
  classes: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  auction: state.auction,
  UI: state.UI,
});
const mapActionsToProps = {
  getUserAuctions,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(ViewAction));
