import React, { Component } from 'react';
import { withEarthoOne } from '@eartho/one-client-react';

class Profile extends Component {
  render() {
    // `this.props.earthoOne` has all the same properties as the `useEarthoOne` hook
    const { user, logout } = this.props.earthoOne;
    return <div>Hello {user.name}</div>;
  }
}

export default withEarthoOne(Profile);
