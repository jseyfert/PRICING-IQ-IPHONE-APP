import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class LocalButtonLogout extends Component {

  async onButtonClick (props) {
    await props.localLogout();
    // await props.clearAppState(); //fix figure out how to clear state here without app haging on spinner
    props.navigation.navigate('auth')
  }

  render() {
      return (
            <Button
              onPress={ () => this.onButtonClick(this.props.props)}
              icon={{name: 'sign-out', type: 'font-awesome'}}
              title='Sign out'
              backgroundColor='#4267B2'
              borderRadius={4}
            />
      );
  }
}

export default connect(null, actions)(LocalButtonLogout);
