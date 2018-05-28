// git add-commit -m 'zzz'
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, PushNotificationIOS } from 'react-native';
import { Card, Divider, FormLabel, FormInput, CheckBox } from "react-native-elements";
import { connect } from 'react-redux';

import * as actions from '../actions';
import Loading from './Loading';
import MainHeader from '../components/MainHeader'
import LocalButtonLogout from '../components/LocalButtonLogout'
import LocalButtonDeleteAccount from '../components/LocalButtonDeleteAccount'
import TrackItemButton from '../components/TrackItemButton'
import RemoveTrackingButton from '../components/RemoveTrackingButton'
import ChangeTrackingButton from '../components/ChangeTrackingButton'


class SettingScreen extends Component {

  static navigationOptions = { drawerLabel: 'Settings'};

  componentWillMount() {
    this.props.isTrackingItem();
    PushNotificationIOS.requestPermissions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemRequest) {
      this.props.navigation.navigate('detail')
    }
  }

  onDetailUrlChange(text) {
    this.props.detailUrlChanged(text);
  }

  onAmazonPriceChange(text) {
    this.props.amazonPriceChanged(text);
  }

  onThirdPartyNewChange(text) {
    this.props.thirdPartyNewChanged(text);
  }

  onThirdPartyUsedChange(text) {
    this.props.thirdPartyUsedChanged(text);
  }

  onEmailNotificationsChange() {
    let { emailNotification_u } = this.props
    this.props.emailNotificationsChange(emailNotification_u);
  }

  onPushNotificationsChange() {
    PushNotificationIOS.checkPermissions((permissions) => {
      console.log(permissions);
      console.log(permissions.alert)
      console.log(permissions.badge)
      if (permissions.alert === 0 || permissions.badge === 0) {
        alert('To enabled push notifications go to: Settings > Notifications > FrigginYeah')
      } else {
        this.props.pushNotificationsChange(this.props.pushNotification_u);
      }
    });
  }

  render() {
    let { screenLoading, itemRequest, item_u, priceAmazon_u, priceThirdNew_u, priceThirdUsed_u, pushNotification_u,
       emailNotification_u  } = this.props

    if (screenLoading) {
      return <Loading />;
    }

    if (_.isNull(itemRequest)) {
      return <Loading />;
    }

    if (itemRequest) {
      return (
        <ScrollView >
          <MainHeader title='SETTINGS' props={this.props} />
          <Card
            containerStyle={{ marginTop: 40 }}
            title={'You are already tracking an item.' + '\n' + 'Click a button below to make a change.'}>

            <View style={styles.marginBottom}>
              <ChangeTrackingButton props={this.props}/>
            </View>

            <View style={styles.marginBottom}>
              <Divider/>
            </View>

            <RemoveTrackingButton props={this.props}/>

          </Card>
        </ScrollView>
      )
    }

    return (
      <ScrollView >

        <MainHeader title='SETTINGS' props={this.props} />

        <Card title={'Amazon Url or ASIN to Track:'} >
          <View style={styles.marginBottom}>
            <TextInput
              style={{
                marginRight: 20,
                marginLeft: 20,
                borderBottomColor: '#bcdecf',
                borderBottomWidth: 1,
              }}
              onChangeText={(text) => this.onDetailUrlChange(text)}
              multiline = {true}
              placeholder = 'Paste URL or ASIN...'
              value={item_u}
            />
          </View>
        </Card>

        <Card title={'Set Desired Prices:'} >
          <FormLabel>Amazon</FormLabel>
          <FormInput
            onChangeText={(text) => this.onAmazonPriceChange(text)}
            value={priceAmazon_u}
          />
          <FormLabel>3rd Party New</FormLabel>
          <FormInput
            onChangeText={(text) => this.onThirdPartyNewChange(text)}
            value={priceThirdNew_u}
          />
          <FormLabel>3rd Party Used</FormLabel>
          <FormInput
            onChangeText={(text) => this.onThirdPartyUsedChange(text)}
            value={priceThirdUsed_u}
          />

          <CheckBox
            center
            title='Email Notifications'
            checked={emailNotification_u}
            onIconPress={(bool) => this.onEmailNotificationsChange(bool)}
            onPress={(bool) => this.onEmailNotificationsChange(bool)}
          />
          <CheckBox
            center
            title='Push Notifications'
            checked={pushNotification_u}
            onIconPress={(bool) => this.onPushNotificationsChange(bool)}
            onPress={(bool) => this.onPushNotificationsChange(bool)}
          />

          <Text style={styles.errorTextStyle}>
            {this.props.appError}
          </Text>
          <TrackItemButton props={this.props}/>
        </Card>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 10,
  },
  errorTextStyle: {
    // marginTop: 10,
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
});

const mapStateToProps = ({ auth, app }) => {
  const { user, screenLoading } = auth;
  const { appError, itemRequest, item_u, priceAmazon_u, priceThirdNew_u, priceThirdUsed_u, pushNotification_u, emailNotification_u } = app;
  return { appError, itemRequest, item_u, priceAmazon_u, priceThirdNew_u, priceThirdUsed_u, pushNotification_u, emailNotification_u, user, screenLoading };
};


export default connect(mapStateToProps, actions)(SettingScreen);
