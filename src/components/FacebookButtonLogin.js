import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class FacebookButtonLogin extends Component {

  render() {
      return (
          <View>
            <Button
              onPress={this.props.facebookLogin}
              icon={{name: 'facebook', type: 'font-awesome'}}
              title='Continue With Facebook'
              backgroundColor='#4267B2'
              borderRadius={4}
              // buttonStyle={{ width: 210}}
            />
          </View>
      );
  }
}

export default connect(null, actions)(FacebookButtonLogin);
