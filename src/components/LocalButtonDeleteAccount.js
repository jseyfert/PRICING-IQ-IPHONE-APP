import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class LocalButtonDeleteAccount extends Component {

  // onNewEmailChange(text) {
  //   this.props.newEmailChanged(text);
  // }

  onButtonClick (props) {
    AlertIOS.alert(
      'Delete Account?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            props.localDeleteAccount();
            props.navigation.navigate('auth');
          },
        },
      ]
    );
  }

  render() {
      return (
          <View>
            <Button
              onPress={ () => this.onButtonClick(this.props.props)}
              title='Delete Account'
              backgroundColor='#4267B2'
              borderRadius={4}
              // buttonStyle={{ width: 210}}
            />
          </View>
      );
  }
}

export default connect(null, actions)(LocalButtonDeleteAccount);
