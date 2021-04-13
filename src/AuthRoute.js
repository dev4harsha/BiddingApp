import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/UserAuth',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  auth: !state.firebase.auth.isEmpty,
});
AuthRoute.propTypes = {
  auth: PropTypes.bool.isRequired,
};
export default withRouter(connect(mapStateToProps)(AuthRoute));
