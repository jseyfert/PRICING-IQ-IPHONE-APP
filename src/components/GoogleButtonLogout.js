import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class GoogleButtonLogout extends Component {

  onButtonClick (props) {
    props.googleLogout();
    props.navigation.navigate('auth')
  }

  render() {
      return (
          <View>
            <Button
              onPress={ () => this.onButtonClick(this.props.props)}
              icon={{name: 'google-plus', type: 'font-awesome'}}
              title='Sign out of Google'
              backgroundColor='#CF543D'
              borderRadius={4}
              buttonStyle={{ width: 210}}
            />
          </View>
      );
  }
}

export default connect(null, actions)(GoogleButtonLogout);
