import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from "react-native-elements";
import MainHeader from '../components/MainHeader'

class DetailScreen extends Component {

    static navigationOptions = { drawerLabel: 'Detail'};

    render() {
        return (
          <View>
            <MainHeader title='Detail' props={this.props} />
        </View>
        );
    }
}


export default DetailScreen;
