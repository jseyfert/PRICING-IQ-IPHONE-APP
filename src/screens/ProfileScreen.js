import React, { Component } from 'react';
import { View, Text, StyleSheet, Image   } from 'react-native';
import { PricingCard, Button, Card , Divider} from "react-native-elements";
import { connect } from 'react-redux';

import * as actions from '../actions';
import FacebookButtonLogout from '../components/FacebookButtonLogout'
import LocalButtonLogout from '../components/LocalButtonLogout'
import LocalButtonDeleteAccount from '../components/LocalButtonDeleteAccount'
import GoogleButtonLogout from '../components/GoogleButtonLogout'
import MainHeader from '../components/MainHeader'
import Loading from './Loading';

class ProfileScreen extends Component {

  static navigationOptions = { drawerLabel: 'Profile'};

  render() {
    let { displayName, email } = this.props.userLocal
    console.log('userLocal', displayName, email);
    if (true) {
      return (
        <View>

          <MainHeader title='Profile' props={this.props} />

          <Card
            title={displayName + '\n\nEmail: ' + email} >
            <View style={styles.containerOauthButtons}>
              <LocalButtonLogout props={this.props}/>
            </View>
            <View style={styles.containerOauthButtons}>
              <LocalButtonDeleteAccount props={this.props}/>
            </View>
          </Card>

          <Text style={styles.errorTextStyle}>
            {this.props.error} test
          </Text>

      </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  containerOauthButtons: {
    marginBottom: 10,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
});

const mapStateToProps = ({ auth }) => {
  const { userLocal } = auth;
  return { userLocal };
};

export default connect(mapStateToProps, actions)(ProfileScreen);
