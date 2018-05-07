import React, { Component } from 'react';
import { View, Text, StyleSheet, Button  } from 'react-native';
// import { Button } from "react-native-elements";
import { connect } from 'react-redux';

import * as actions from '../actions';
import FacebookButtonLogout from '../components/FacebookButtonLogout'
import LocalButtonLogout from '../components/LocalButtonLogout'
import LocalButtonDeleteAccount from '../components/LocalButtonDeleteAccount'
import GoogleButtonLogout from '../components/GoogleButtonLogout'
import Loading from './Loading';

class ProfileScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Profile",
    headerLeft: <Button onPress={() => navigation.navigate('DrawerOpen')} title="=" />,
  });

    render() {
      // let { screenLoading } = this.props
      // console.log('screenLoading', screenLoading);
      // if (screenLoading) {
      //   return <Loading />;
      // }
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>

            <View style={styles.containerOauthButtons}>
              <LocalButtonLogout props={this.props}/>
            </View>
            <View style={styles.containerOauthButtons}>
              <LocalButtonDeleteAccount props={this.props}/>
            </View>

          </View>
      );
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
  const { userLoggedIn, userFacebook, userGoogle, userLocal, screenLoading, error } = auth;
  return { userLoggedIn, userFacebook, userGoogle, userLocal, screenLoading, error };
};

export default connect(mapStateToProps, actions)(ProfileScreen);
