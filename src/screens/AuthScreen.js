// git add-commit -m 'zzz'
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
const FBSDK = require('react-native-fbsdk');
const { LoginManager } = FBSDK;
import { Card, FormLabel } from 'react-native-elements'

import Loading from './Loading';
import FacebookButtonLogin from '../components/FacebookButtonLogin';
import GoogleButtonLogin from '../components/GoogleButtonLogin';
import LoginForm from '../components/LoginForm';
import * as actions from '../actions';

class AuthScreen extends Component {

  componentWillMount() {
    this.props.isUserLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.navigation.navigate('setting')
    }
  }

  render(props) {
    if (this.props.screenLoading) {
      return <Loading />;
    }
    return (
      <View>
        <Card containerStyle={{ marginTop: 50 }}>
          <LoginForm />
          <FormLabel labelStyle={{ textAlign: 'center', marginBottom: 25 }}>
            OR
          </FormLabel>
          <View style={styles.marginBottom}>
          <FacebookButtonLogin />
        </View>
          <GoogleButtonLogin />
        </Card>
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
  marginBottom: {
    marginBottom: 10,
  },
});

const mapStateToProps = ({ auth }) => {
  const { user, screenLoading } = auth;
  return { user, screenLoading };
};

export default connect(mapStateToProps, actions)(AuthScreen);
