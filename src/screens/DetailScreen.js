import React, { Component } from 'react';
import { View, Text, PushNotificationIOS, AppState } from 'react-native';
import { Button } from "react-native-elements";
import { connect } from 'react-redux';

import * as actions from '../actions';
import MainHeader from '../components/MainHeader'

class DetailScreen extends Component {

    static navigationOptions = { drawerLabel: 'Detail'};

    onPress (){
      PushNotificationIOS.checkPermissions((permissions) => {
        console.log(permissions);
      });

      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: "Shit Yeah!", // (required)
        alertBody: "Its working:)", // (required)
        // applicationIconBadgeNumber: 1,
        fireDate: new Date(Date.now() + (5 * 1000)) // in 60 secs
      });
    }

    render() {
      let { priceResponse, itemResponse, itemRequest } = this.props
      if (itemResponse) {
        return (
          <View>
            <MainHeader title='DETAIL' props={this.props} />
            <Text>priceResponse = {priceResponse}</Text>
            <Text>priceResponse = {priceResponse}</Text>
            <Text>priceResponse = {priceResponse}</Text>
            <Text>priceResponse = {priceResponse}</Text>
            <Button
              onPress={this.onPress}
              title='notification' />
          </View>
          );
      } else if (itemRequest) {
        return (
          <View>
            <MainHeader title='DETAIL' props={this.props} />
            <Text>We are in the process of tracking your price, please check back later for an update.</Text>
          </View>
        );
      } else {
        return (
          <View>
            <MainHeader title='DETAIL' props={this.props} />
              <Text>Please submit a url or asin</Text>
            </View>
          );
      }
    }
}

const mapStateToProps = ({ app }) => {
  const { priceResponse, itemResponse, itemRequest } = app;
  return { priceResponse, itemResponse, itemRequest };
};

export default connect(mapStateToProps, actions)(DetailScreen);
