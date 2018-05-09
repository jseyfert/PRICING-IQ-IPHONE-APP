import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
const FBSDK = require('react-native-fbsdk');
const { LoginManager } = FBSDK;

import Loading from './Loading';
import FacebookButtonLogin from '../components/FacebookButtonLogin';
import GoogleButtonLogin from '../components/GoogleButtonLogin';
import LoginForm from '../components/LoginForm';
import * as actions from '../actions';

class AuthScreen extends Component {

  // componentWillMount() {
  //   this.props.isUserLoggedIn();
  // }

  componentWillReceiveProps(nextProps) {
    // console.log('in componentWillReceiveProps', nextProps);
    if (nextProps.userLoggedIn) {
      this.props.navigation.navigate('profile')
    }
  }

  render(props) {
    // console.log('this.props.loading', this.props.loading);
    if (this.props.screenLoading) {
      return <Loading />;
    }
    return (
      <View style={styles.containerLocalLogin}>

        <View style={styles.containerLocalLogin}>
          <LoginForm />
        </View>

        <View style={styles.containerOauth}>
          <View style={styles.containerOauthButtons}>
            <FacebookButtonLogin />
          </View>
          <View style={styles.containerOauthButtons}>
            <GoogleButtonLogin />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLocalLogin: {
    flex: 1,
  },
  containerLocalLogin: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerOauth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOauthButtons: {
    marginBottom: 10,
  },
});

const mapStateToProps = ({ auth }) => {
  console.log('mapStateToProps authScreen', auth);
  const { userLoggedIn, screenLoading } = auth;
  return { userLoggedIn, screenLoading };
};

export default connect(mapStateToProps, actions)(AuthScreen);
