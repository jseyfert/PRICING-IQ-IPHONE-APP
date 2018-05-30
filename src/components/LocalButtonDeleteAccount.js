import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class LocalButtonDeleteAccount extends Component {

  async onYesClick () {
    let { user } = this.props
    await this.props.localDeleteAccount();
    this.props.removeItem(user);
  }

  onButtonClick () {
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
            this.onYesClick();
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
              icon={{name: 'trash', type: 'font-awesome'}}
              title='Delete Account'
              backgroundColor='#4267B2'
              borderRadius={4}
            />
          </View>
      );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps, actions)(LocalButtonDeleteAccount);
