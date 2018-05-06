import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
const FBSDK = require('react-native-fbsdk');
const { AccessToken, LoginManager } = FBSDK;

import Slides from '../components/Slides';
import Loading from './Loading';
import * as actions from '../actions';

const SLIDE_DATA = [
  // { text: 'Welcome Friggin Yeah', color: '#03A9F4'},
  // { text: 'We do cool shit', color: '#009688'},
  { text: 'information slides for first time users', color: '#03A9F4'},
]

class WelcomeScreen extends Component {

  componentWillMount() {
    this.props.isUserLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('in componentWillReceiveProps111', nextProps);
    if (nextProps.userLoggedIn) {
      this.props.navigation.navigate('profile')
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  }

  render() {
    let { userLoggedIn } = this.props

    if (_.isNull(userLoggedIn)) {
      return <Loading />;
    }

    return (
      <Slides data={SLIDE_DATA} onSlidesComplete={this.onSlidesComplete} />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  console.log('here is the current state=====>', auth);
  const { userLoggedIn } = auth;
  return { userLoggedIn };
};

export default connect(mapStateToProps, actions)(WelcomeScreen);
