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
  // { text: 'Hi', color: '#03A9F4'},
  // { text: 'Here are details about how to use the app', color: '#009688'},
  { text: 'Friggin yeah!', color: '#03A9F4'},
]

class WelcomeScreen extends Component {

  componentWillMount() {
    this.props.isUserLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('in componentWillReceiveProps111', nextProps);
    if (nextProps.userLoggedIn) {
      this.props.navigation.navigate('setting')
      // this.props.navigation.navigate('profile')
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

const mapStateToProps = ({ auth, app }) => {
  console.log('v=====state=====v\n', {auth, app} );
  const { userLoggedIn } = auth;
  return { userLoggedIn };
};

export default connect(mapStateToProps, actions)(WelcomeScreen);
