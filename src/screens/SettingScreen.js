// git add-commit -m 'zzz'
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Card, Divider, FormLabel, FormInput } from "react-native-elements";
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
    // let { user } = this.props
    // if (user) {
    // } else {
      this.props.isUserLoggedIn();
      this.props.isTrackingItem();
    // }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('in componentWillReceiveProps_+_+_+_+', nextProps);
  //   // this.props.isTrackingItem();
  //   // if (nextProps.user) {
  //   //   this.props.navigation.navigate('setting')
  //   // }
  // }

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

  render() {
    let { screenLoading, trackingItem } = this.props
    console.log('this.props', this.props);
    // const trackingItem = true
    // const trackingItem = this.props ? this.props.trackingItem : null

    if (screenLoading) {
      return <Loading />;
    }

    if (trackingItem) {
    // if (false) {
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
            />
          </View>
        </Card>

        <Card title={'Set Desired Prices:'} >
          <FormLabel>Amazon</FormLabel>
          <FormInput
            onChangeText={(text) => this.onAmazonPriceChange(text)}
            // editable={false}
            // placeholder={'[33.33]'}
          />
          <FormLabel>3rd Party New</FormLabel>
          <FormInput
            onChangeText={(text) => this.onThirdPartyNewChange(text)}
          />
          <FormLabel>3rd Party Used</FormLabel>
          <FormInput
            onChangeText={(text) => this.onThirdPartyUsedChange(text)}
          />
        </Card>

        <Text style={styles.errorTextStyle}>
          {this.props.appError}
        </Text>

        <Card>
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
    marginTop: 10,
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
});

const mapStateToProps = ({ auth, app }) => {
  const { user, screenLoading } = auth;
  const { appError, trackingItem } = app;
  return { appError, trackingItem, user, screenLoading };
};

export default connect(mapStateToProps, actions)(SettingScreen);
