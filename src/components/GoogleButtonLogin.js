import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class GoogleButtonLogin extends Component {

  render() {
      return (
          <View>
            <Button
              onPress={this.props.googleLogin}
              icon={{name: 'google-plus', type: 'font-awesome'}}
              title='Continue With Google'
              backgroundColor='#CF543D'
              borderRadius={4}
              // buttonStyle={{ width: 210}}
            />
          </View>
      );
  }
}

export default connect(null, actions)(GoogleButtonLogin);
