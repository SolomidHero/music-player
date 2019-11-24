import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export default class UserProfile extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    clickHandler: PropTypes.func,
  };

  render() {
    return (
      <div>
        <Button onClick={this.props.clickHandler}>{this.props.name}</Button>
      </div>
    );
  }
}