// git add-commit -m 'zzz'
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux';

import * as actions from '../actions';
import Loading from './Loading';
import MainHeader from '../components/MainHeader'
import LocalButtonLogout from '../components/LocalButtonLogout'
import LocalButtonDeleteAccount from '../components/LocalButtonDeleteAccount'
import LocalButtonChangeEmail from '../components/LocalButtonChangeEmail'


class ProfileScreen extends Component {

  static navigationOptions = { drawerLabel: 'Profile'};

  componentWillMount() {
    console.log('in ProfileScreen');
    this.props.isUserLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      this.props.navigation.navigate('auth')
    }
  }

  onNewEmailChange(text) {
    this.props.newEmailChanged(text);
  }

  render() {
    const { screenLoading } = this.props

    const email = this.props.user ? this.props.user.email : null
    const provider = this.props.user ? this.props.user.providerData[0].providerId : null
    const oAuthProvider = (provider === 'facebook.com' || provider === 'google.com') ? true : false

    let displayName = this.props.user ? this.props.user.displayName : null
    displayName = _.isNull(displayName) ? '' : displayName

    if (screenLoading) {
      return <Loading />;
    }

    if (true) {
      return (
        <View>

          <MainHeader title='PROFILE' props={this.props} />

          <Card title={displayName + '\n\n' + email} >

            <View style={styles.marginBottom}>
              <LocalButtonLogout props={this.props}/>
            </View>

            <View style={styles.marginBottom}>
              <Divider/>
            </View>

            <View style={styles.marginBottom}>
              <LocalButtonDeleteAccount props={this.props}/>
            </View>

            <View style={styles.marginBottom}>
              <Divider/>
            </View>

            { oAuthProvider || <View style={styles.marginBottom}>
              <LocalButtonChangeEmail props={this.props}/>
            </View> }

            { oAuthProvider || <View style={styles.marginBottom}>
              <FormLabel>New Email</FormLabel>
              <FormInput onChangeText={this.onNewEmailChange.bind(this)}/>
            </View> }

          </Card>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

      </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 10,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
});

const mapStateToProps = ({ auth }) => {
  // console.log('v=====PROFILEstate=====v\n', {auth} );
  const { user, error, screenLoading } = auth;
  return { user, error, screenLoading };
};

export default connect(mapStateToProps, actions)(ProfileScreen);
