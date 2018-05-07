import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from "react-native-elements";
import MainHeader from '../components/MainHeader'

class SubmitScreen extends Component {

    static navigationOptions = { drawerLabel: 'Submit'};

    render() {
      return (
          <View>
            <MainHeader title='Submit' props={this.props} />
        </View>
        );
    }
}


export default SubmitScreen;
