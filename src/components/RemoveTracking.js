import React, { Component } from 'react';
import { AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class RemoveTracking extends Component {

  onButtonClick (){
    console.log('in RemoveTracking');
    const { userLocal } = this.props;
    this.props.removeItem(userLocal);
  }

  render() {
      return (
        <Button
          onPress={ () => this.onButtonClick(this.props)}
          icon={{name: 'trash', type: 'font-awesome'}}
          title='Remove Item'
          backgroundColor='#4267B2'
          borderRadius={4} />
      );
  }
}

const mapStateToProps = ({ app, auth }) => {
  const { userLocal } = auth;
  return { userLocal };
};

export default connect(mapStateToProps, actions)(RemoveTracking);
