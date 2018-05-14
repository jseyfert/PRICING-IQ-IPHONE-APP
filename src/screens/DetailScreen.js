import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from "react-native-elements";
import { connect } from 'react-redux';

import * as actions from '../actions';
import MainHeader from '../components/MainHeader'

class DetailScreen extends Component {

    static navigationOptions = { drawerLabel: 'DETAIL'};

    componentWillMount() {
      this.props.isUserLoggedIn();
    }

    render() {
        return (
          <View>
            <MainHeader title='Detail' props={this.props} />
            <Text>detial</Text>
        </View>
        );
    }
}

// const mapStateToProps = ({ auth }) => {
//   const { userLocal } = auth;
//   return { userLocal };
// };

export default connect(null, actions)(DetailScreen);
