import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import {
  getUserAuctions,
  getUserAuctionsSell,
  getUserAuctionsBuy,
  getUserBidAuctions,
} from '../../redux/actions/auctionActions';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../../redux/store';
import { CLEAR_ERRORS, CLEAR_MESSAGE } from '../../redux/types';
import SnackBar from '../SnackBar';
import ViewAuctionItem from './ViewAuctionItem';
import { componentType } from '../../constant';
import { Typography } from '@material-ui/core';
import { ScaleLoader } from 'react-spinners';
import { overrideScaleLoaderCSS } from '../../constant';

const styles = (theme) => ({});

class ViewAction extends Component {
  state = {};

  componentWillMount() {
    this.loadDataToRedux(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.componentType != nextProps.componentType)
      this.loadDataToRedux(nextProps);
  }
  loadDataToRedux(props) {
    if (props.componentType === 'auctions') {
      props.getUserAuctions();
    } else if (props.componentType === 'bidAuctions') {
      props.getUserBidAuctions();
    } else if (props.componentType === 'sell') {
      props.getUserAuctionsSell();
    } else if (props.componentType === 'buy') {
      props.getUserAuctionsBuy();
    }
  }
  render() {
    const { userAuctions, loading } = this.props.auction;

    let recentDomainsMarkup = !loading ? (
      userAuctions.map((userAuction, index) => (
        <ViewAuctionItem
          userAuction={userAuction}
          key={userAuction.auctionId}
          index={index}
        />
      ))
    ) : (
      <ScaleLoader
        css={overrideScaleLoaderCSS}
        size={150}
        color={'#eb4034'}
        loading={loading}
      />
    );

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

  getUserAuctionsSell,
  getUserAuctionsBuy,
  getUserBidAuctions,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(ViewAction));
