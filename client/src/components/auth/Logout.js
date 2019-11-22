// Generate Modal for user logout

import React, {Component, Fragment} from 'react';
import {NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  // Add prop types - for validation
  static propTypes = {
    logout: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  onClick = () => {
    // Clear errors via clearErrors action
    this.props.clearErrors();
    this.props.logout();
  };

  // Create logout modal
  render() {
    return (
      <Fragment>
        <NavLink
        onClick={this.onClick}
        href='#'
        >Logout
        </NavLink>
      </Fragment>
    );
  }
}

// Export rendered component to the front-end
export default connect(
  null,
  {clearErrors, logout}
)(Logout);
