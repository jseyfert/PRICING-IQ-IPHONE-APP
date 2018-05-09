import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from "react-native-elements";
import { connect } from 'react-redux';

import * as actions from '../actions';
import MainHeader from '../components/MainHeader'

class SettingScreen extends Component {

    static navigationOptions = { drawerLabel: 'Submit'};

    componentWillMount() {
      this.props.isUserLoggedIn();
    }

    render() {
      return (
          <View>
            <MainHeader title='Submit' props={this.props} />
            <Text>submit</Text>
        </View>
        );
    }
}

// const mapStateToProps = ({ auth }) => {
//   const { userLocal } = auth;
//   return { userLocal };
// };


export default connect(null, actions)(SettingScreen);
