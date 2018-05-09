import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Card, Divider, FormLabel, FormInput, CheckBox, SearchBar } from "react-native-elements";
import { connect } from 'react-redux';
// import Modal from "react-native-modal";

import * as actions from '../actions';
import Loading from './Loading';
import MainHeader from '../components/MainHeader'
import LocalButtonLogout from '../components/LocalButtonLogout'
import LocalButtonDeleteAccount from '../components/LocalButtonDeleteAccount'
import TrackUrlButton from '../components/TrackUrlButton'


class SettingScreen extends Component {

  static navigationOptions = { drawerLabel: 'Settings'};

  componentWillMount() {
    this.props.isUserLoggedIn();
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

  render() {
    let { screenLoading } = this.props

    let displayName = this.props.userLocal ? this.props.userLocal.displayName : null
    displayName = _.isNull(displayName) ? '' : displayName
    const email = this.props.userLocal ? this.props.userLocal.email : null
    const provider = this.props.userLocal ? this.props.userLocal.providerData[0].providerId : null
    const oAuthProvider = (provider === 'facebook.com' || provider === 'google.com') ? true : false
    console.log('providerproviderprovider===', provider);
    console.log('oAuthProvider===', oAuthProvider);

    if (screenLoading) {
      return <Loading />;
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
          <TrackUrlButton props={this.props}/>
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
  const { appError } = app;
  const { userLocal, screenLoading } = auth;
  return { userLocal, screenLoading, appError };
};

export default connect(mapStateToProps, actions)(SettingScreen);
